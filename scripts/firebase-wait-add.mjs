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
		body: body ? JSON.stringify(body) : undefined,
	});
	const json = await res.json().catch(() => ({}));
	return { status: res.status, json };
}

for (let i = 0; i < 12; i++) {
	const service = await call(
		'GET',
		`https://serviceusage.googleapis.com/v1/projects/${projectId}/services/firebase.googleapis.com`,
	);
	const state = service.json.state;
	console.log(`firebase api ${state || service.status}`);
	if (state === 'ENABLED') break;
	await new Promise((resolve) => setTimeout(resolve, 5000));
}

const add = await call('POST', `https://firebase.googleapis.com/v1beta1/projects/${projectId}:addFirebase`, {
	timeZone: 'Africa/Lagos',
	locationId: 'europe-west',
});
console.log('addFirebase', JSON.stringify(add));

if (add.status >= 400) {
	const retry = await call('POST', `https://firebase.googleapis.com/v1beta1/projects/${projectId}:addFirebase`, {});
	console.log('addFirebase empty', JSON.stringify(retry));
}
