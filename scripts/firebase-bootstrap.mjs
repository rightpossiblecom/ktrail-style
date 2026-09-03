import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const Configstore = require('C:/Users/mr_right/AppData/Roaming/npm/node_modules/firebase-tools/node_modules/configstore');
const store = new Configstore('firebase-tools');

const CLIENT_ID = '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com';
const CLIENT_SECRET = 'j9iVZfS8kkCEFUPaAeJV0sAi';
const projectId = 'ktrail-os';

function accountTokens() {
	const user = store.get('user');
	const tokens = store.get('tokens');
	const extras = store.get('additionalAccounts') || [];
	if (user?.email === 'rightpossible.com@gmail.com' && tokens?.refresh_token) {
		return tokens;
	}
	const extra = extras.find((item) => item.user?.email === 'rightpossible.com@gmail.com');
	if (extra?.tokens?.refresh_token) return extra.tokens;
	if (tokens?.refresh_token) return tokens;
	throw new Error('No Firebase refresh token for rightpossible.com@gmail.com');
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
	if (!json.access_token) {
		throw new Error(`Token refresh failed: ${res.status}`);
	}
	return json.access_token;
}

async function call(method, url, body) {
	const res = await fetch(url, {
		method,
		headers: {
			Authorization: `Bearer ${await accessToken()}`,
			'Content-Type': 'application/json',
		},
		body: body ? JSON.stringify(body) : undefined,
	});
	const text = await res.text();
	let json;
	try {
		json = JSON.parse(text);
	} catch {
		json = { raw: text.slice(0, 800) };
	}
	if (json.bindings) {
		json.bindings = json.bindings.map((binding) => ({
			role: binding.role,
			members: binding.members,
		}));
	}
	return { status: res.status, json };
}

const apis = [
	'cloudresourcemanager.googleapis.com',
	'serviceusage.googleapis.com',
	'firebase.googleapis.com',
	'identitytoolkit.googleapis.com',
	'securetoken.googleapis.com',
	'firestore.googleapis.com',
];

console.log('project', JSON.stringify(await call('GET', `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}`)));
console.log('iam', JSON.stringify(await call('POST', `https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}:getIamPolicy`, {})));

for (const api of apis) {
	const result = await call(
		'POST',
		`https://serviceusage.googleapis.com/v1/projects/${projectId}/services/${api}:enable`,
		{},
	);
	console.log(`enable ${api}`, result.status, result.json.error?.message || result.json.name || 'ok');
}

console.log(
	'available',
	JSON.stringify(await call('GET', 'https://firebase.googleapis.com/v1beta1/availableProjects')),
);
console.log(
	'addFirebase',
	JSON.stringify(await call('POST', `https://firebase.googleapis.com/v1beta1/projects/${projectId}:addFirebase`, {})),
);
