import { Firestore } from '@google-cloud/firestore';

const projectId = process.env.KTRAIL_GCP_PROJECT || 'ktrail-os';

function credentials() {
	const raw = process.env.KTRAIL_SERVICE_ACCOUNT;
	if (!raw) {
		throw new Error('KTRAIL_SERVICE_ACCOUNT is missing.');
	}
	return JSON.parse(raw) as {
		client_email: string;
		private_key: string;
	};
}

let db: Firestore | null = null;

export function getProjectId() {
	return projectId;
}

export function getWebApiKey() {
	const key = process.env.KTRAIL_WEB_API_KEY;
	if (!key) {
		throw new Error('KTRAIL_WEB_API_KEY is missing.');
	}
	return key;
}

export function getFirestore() {
	if (db) return db;
	const creds = credentials();
	db = new Firestore({
		projectId,
		credentials: {
			client_email: creds.client_email,
			private_key: creds.private_key,
		},
	});
	return db;
}
