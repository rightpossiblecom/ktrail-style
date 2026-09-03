import { mkdirSync, writeFileSync } from 'node:fs';
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
		json = { raw: text.slice(0, 1200) };
	}
	return { status: res.status, json };
}

async function poll(url, label) {
	for (let i = 0; i < 20; i++) {
		const result = await call('GET', url);
		const done = result.json.done === true || result.json.state === 'ACTIVE' || result.status === 200 && result.json.keyString;
		console.log(label, result.status, result.json.done, result.json.error?.message || result.json.state || '');
		if (result.json.done === true) return result;
		if (result.status === 200 && !result.json.name?.includes('operations/')) return result;
		await new Promise((resolve) => setTimeout(resolve, 4000));
	}
	throw new Error(`${label} timed out`);
}

const firestoreOp =
	'projects/ktrail-os/databases/(default)/operations/VYTD0q6dE44ISxVUunAfKhAqM3J1ZQQiBRAY4_foEAbU4P3ECAsKJxo';
await poll(`https://firestore.googleapis.com/v1/${firestoreOp}`, 'firestore op');

const db = await call('GET', `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)`);
console.log('firestore db', db.status, db.json.type, db.json.locationId);

const keys = await call('GET', `https://apikeys.googleapis.com/v2/projects/${projectId}/locations/global/keys`);
console.log('keys', keys.status, (keys.json.keys || []).map((key) => key.displayName));
let apiKey = (keys.json.keys || []).find((key) => key.displayName === 'KTrail Web') || keys.json.keys?.[0];
if (apiKey?.name) {
	const got = await call('GET', `https://apikeys.googleapis.com/v2/${apiKey.name}/keyString`);
	apiKey = { ...apiKey, keyString: got.json.keyString };
	console.log('api key string', Boolean(got.json.keyString));
}

const identityPuts = [
	await call('PUT', `https://identitytoolkit.googleapis.com/admin/v2/projects/${projectId}/config`, {
		signIn: { email: { enabled: true, passwordRequired: true } },
		authorizedDomains: ['localhost', 'ktrail-style.vercel.app'],
	}),
	await call('POST', `https://identitytoolkit.googleapis.com/admin/v2/projects/${projectId}:initializeIdentityPlatform`, {}),
	await call('POST', `https://idp.googleapis.com/v1/projects/${projectId}:initializeIdentityPlatform`, {}),
	await call(
		'POST',
		`https://identitytoolkit.googleapis.com/v2/projects/${projectId}/defaultSupportedIdpConfigs?idpId=email`,
		{ enabled: true, clientId: 'email', clientSecret: 'unused' },
	),
];
for (const [index, result] of identityPuts.entries()) {
	console.log(`identity try ${index}`, result.status, result.json.error?.message || 'ok');
}

const identityGet = await call(
	'GET',
	`https://identitytoolkit.googleapis.com/admin/v2/projects/${projectId}/config`,
);
console.log('identity get', identityGet.status, identityGet.json.error?.message || 'ok');

if (!apiKey?.keyString) {
	console.log('missing api key');
	process.exit(1);
}

mkdirSync('lib/firebase', { recursive: true });
writeFileSync(
	'lib/firebase/public-config.ts',
	`export const firebasePublicConfig = {
	apiKey: ${JSON.stringify(apiKey.keyString)},
	authDomain: '${projectId}.firebaseapp.com',
	projectId: '${projectId}',
	storageBucket: '${projectId}.firebasestorage.app',
} as const;
`,
	'utf8',
);

const saEmail = `ktrail-app@${projectId}.iam.gserviceaccount.com`;
const keyCreate = await call(
	'POST',
	`https://iam.googleapis.com/v1/projects/${projectId}/serviceAccounts/${saEmail}/keys`,
	{ keyAlgorithm: 'KEY_ALG_RSA_2048', privateKeyType: 'TYPE_GOOGLE_CREDENTIALS_FILE' },
);
if (!keyCreate.json.privateKeyData) {
	console.log('sa key failed', keyCreate.status, keyCreate.json.error?.message);
	process.exit(1);
}
const credentials = JSON.parse(Buffer.from(keyCreate.json.privateKeyData, 'base64').toString('utf8'));
writeFileSync(
	'.env.local',
	[
		`KTRAIL_GCP_PROJECT=${projectId}`,
		`KTRAIL_GCP_PROJECT_NUMBER=${projectNumber}`,
		`KTRAIL_WEB_API_KEY=${apiKey.keyString}`,
		`KTRAIL_SERVICE_ACCOUNT=${JSON.stringify(credentials)}`,
		'',
	].join('\n'),
	'utf8',
);
console.log('env written');
