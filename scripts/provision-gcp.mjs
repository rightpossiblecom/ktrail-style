import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const Configstore = require('C:/Users/mr_right/AppData/Roaming/npm/node_modules/firebase-tools/node_modules/configstore');
const store = new Configstore('firebase-tools');

const CLIENT_ID = '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com';
const CLIENT_SECRET = 'j9iVZfS8kkCEFUPaAeJV0sAi';
const projectId = 'ktrail-os';
const projectNumber = '595172347820';

function accountTokens() {
	const user = store.get('user');
	const tokens = store.get('tokens');
	const extras = store.get('additionalAccounts') || [];
	if (user?.email === 'rightpossible.com@gmail.com' && tokens?.refresh_token) return tokens;
	const extra = extras.find((item) => item.user?.email === 'rightpossible.com@gmail.com');
	if (extra?.tokens?.refresh_token) return extra.tokens;
	if (tokens?.refresh_token) return tokens;
	throw new Error('No Firebase refresh token');
}

async function accessToken() {
	const tokens = accountTokens();
	if (tokens.access_token && tokens.expires_at && tokens.expires_at > Date.now() + 60_000) {
		return tokens.access_token;
	}
	const body = new URLSearchParams({
		refresh_token: tokens.refresh_token,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: 'refresh_token',
	});
	const res = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body,
	});
	const json = await res.json();
	if (!json.access_token) throw new Error(`Token refresh failed: ${res.status}`);
	return json.access_token;
}

async function call(method, url, body) {
	const res = await fetch(url, {
		method,
		headers: {
			Authorization: `Bearer ${await accessToken()}`,
			'Content-Type': 'application/json',
		},
		body: body === undefined ? undefined : JSON.stringify(body),
	});
	const text = await res.text();
	let json = {};
	try {
		json = text ? JSON.parse(text) : {};
	} catch {
		json = { raw: text.slice(0, 1000) };
	}
	return { status: res.status, json };
}

function log(label, result) {
	const detail = result.json.error?.message || result.json.name || result.json.state || 'ok';
	console.log(label, result.status, detail);
	return result;
}

const apis = [
	'iam.googleapis.com',
	'apikeys.googleapis.com',
	'datastore.googleapis.com',
	'firestore.googleapis.com',
	'identitytoolkit.googleapis.com',
	'securetoken.googleapis.com',
	'cloudresourcemanager.googleapis.com',
];

for (const api of apis) {
	log(
		`enable ${api}`,
		await call('POST', `https://serviceusage.googleapis.com/v1/projects/${projectId}/services/${api}:enable`, {}),
	);
}

await new Promise((resolve) => setTimeout(resolve, 8000));

const dbCreate = await call(
	'POST',
	`https://firestore.googleapis.com/v1/projects/${projectId}/databases?databaseId=(default)`,
	{
		type: 'FIRESTORE_NATIVE',
		locationId: 'eur3',
	},
);
log('firestore create', dbCreate);
if (dbCreate.status === 409 || dbCreate.json.error?.status === 'ALREADY_EXISTS') {
	console.log('firestore already exists');
}

const existingKey = await call(
	'GET',
	`https://apikeys.googleapis.com/v2/projects/${projectId}/locations/global/keys`,
);
let apiKey = existingKey.json.keys?.find((key) => key.displayName === 'KTrail Web');
if (!apiKey) {
	const created = await call(
		'POST',
		`https://apikeys.googleapis.com/v2/projects/${projectId}/locations/global/keys`,
		{
			displayName: 'KTrail Web',
			restrictions: {
				apiTargets: [
					{ service: 'identitytoolkit.googleapis.com' },
					{ service: 'securetoken.googleapis.com' },
					{ service: 'firestore.googleapis.com' },
				],
			},
		},
	);
	log('api key create', created);
	apiKey = created.json;
} else {
	console.log('api key exists');
}

if (apiKey?.name && !apiKey.keyString) {
	const got = await call('GET', `https://apikeys.googleapis.com/v2/${apiKey.name}/keyString`);
	apiKey = { ...apiKey, keyString: got.json.keyString };
	log('api key string', { status: got.status, json: { ok: Boolean(got.json.keyString) } });
}

const identityGet = await call(
	'GET',
	`https://identitytoolkit.googleapis.com/admin/v2/projects/${projectId}/config`,
);
log('identity get', identityGet);

const identityPatch = await call(
	'PATCH',
	`https://identitytoolkit.googleapis.com/admin/v2/projects/${projectId}/config?updateMask=signIn.email,authorizedDomains`,
	{
		signIn: {
			email: {
				enabled: true,
				passwordRequired: true,
			},
		},
		authorizedDomains: [
			'localhost',
			'ktrail-os.firebaseapp.com',
			'ktrail-style.vercel.app',
		],
	},
);
log('identity patch', identityPatch);

const saEmail = `ktrail-app@${projectId}.iam.gserviceaccount.com`;
const saGet = await call('GET', `https://iam.googleapis.com/v1/projects/${projectId}/serviceAccounts/${saEmail}`);
if (saGet.status === 404) {
	log(
		'service account',
		await call('POST', `https://iam.googleapis.com/v1/projects/${projectId}/serviceAccounts`, {
			accountId: 'ktrail-app',
			serviceAccount: { displayName: 'KTrail App' },
		}),
	);
} else {
	console.log('service account exists');
}

const policy = await call(
	'POST',
	`https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}:getIamPolicy`,
	{},
);
const bindings = policy.json.bindings || [];
const needed = [
	{ role: 'roles/datastore.user', member: `serviceAccount:${saEmail}` },
	{ role: 'roles/iam.serviceAccountTokenCreator', member: `serviceAccount:${saEmail}` },
];
for (const { role, member } of needed) {
	const binding = bindings.find((item) => item.role === role);
	if (binding) {
		if (!binding.members.includes(member)) binding.members.push(member);
	} else {
		bindings.push({ role, members: [member] });
	}
}
log(
	'iam set',
	await call('POST', `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}:setIamPolicy`, {
		policy: { ...policy.json, bindings },
	}),
);

const keyCreate = await call(
	'POST',
	`https://iam.googleapis.com/v1/projects/${projectId}/serviceAccounts/${saEmail}/keys`,
	{ keyAlgorithm: 'KEY_ALG_RSA_2048', privateKeyType: 'TYPE_GOOGLE_CREDENTIALS_FILE' },
);
if (!keyCreate.json.privateKeyData) {
	console.log('service account key failed', keyCreate.status, keyCreate.json.error?.message);
	process.exit(1);
}
const credentials = JSON.parse(Buffer.from(keyCreate.json.privateKeyData, 'base64').toString('utf8'));

const env = [
	`KTRAIL_GCP_PROJECT=${projectId}`,
	`KTRAIL_GCP_PROJECT_NUMBER=${projectNumber}`,
	`KTRAIL_WEB_API_KEY=${apiKey.keyString || ''}`,
	`KTRAIL_SERVICE_ACCOUNT=${JSON.stringify(credentials)}`,
].join('\n');

writeFileSync('.env.local', `${env}\n`, 'utf8');
writeFileSync(
	'lib/firebase/public-config.ts',
	`export const firebasePublicConfig = {
	apiKey: ${JSON.stringify(apiKey.keyString || '')},
	authDomain: '${projectId}.firebaseapp.com',
	projectId: '${projectId}',
	storageBucket: '${projectId}.firebasestorage.app',
} as const;
`,
	'utf8',
);

console.log('wrote .env.local and public-config (secrets stay in .env.local)');
