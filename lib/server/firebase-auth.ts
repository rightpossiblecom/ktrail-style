import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { col } from '@/lib/house';
import type { SessionUser } from '@/lib/server/session';

function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

function webApiKey(): string {
	const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? process.env.CLOUDGRANT_WEB_API_KEY;
	if (!key) {
		throw new Error('Firebase web API key is missing.');
	}
	return key;
}

function authMessage(code: string | undefined, fallback: string): string {
	if (code === 'auth/email-already-exists' || code === 'EMAIL_EXISTS') {
		return 'An account with that email already exists.';
	}
	if (
		code === 'EMAIL_NOT_FOUND' ||
		code === 'INVALID_PASSWORD' ||
		code === 'INVALID_LOGIN_CREDENTIALS' ||
		code === 'INVALID_EMAIL' ||
		code === 'USER_DISABLED'
	) {
		return 'Email or password is wrong.';
	}
	if (code === 'WEAK_PASSWORD' || code === 'auth/weak-password') {
		return 'Password must be at least 8 characters.';
	}
	return fallback;
}

async function writeUserDoc(user: SessionUser): Promise<void> {
	const ref = adminDb().collection(col('users')).doc(user.uid);
	const existing = await ref.get();
	if (!existing.exists) {
		await ref.set({
			uid: user.uid,
			email: user.email,
			createdAt: new Date().toISOString(),
		});
	}
}

export async function createFirebaseUser(email: string, password: string): Promise<SessionUser> {
	const normalized = normalizeEmail(email);
	if (!normalized.includes('@')) {
		throw new Error('Enter a valid email.');
	}
	if (password.length < 8) {
		throw new Error('Password must be at least 8 characters.');
	}
	try {
		const record = await adminAuth().createUser({ email: normalized, password });
		const user = { uid: record.uid, email: normalized };
		await writeUserDoc(user);
		return user;
	} catch (error) {
		const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : undefined;
		throw new Error(authMessage(code, error instanceof Error ? error.message : 'Could not create the account.'));
	}
}

export async function verifyFirebaseUser(email: string, password: string): Promise<SessionUser> {
	const normalized = normalizeEmail(email);
	const res = await fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webApiKey()}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: normalized, password, returnSecureToken: true }),
		},
	);
	const json = (await res.json()) as {
		localId?: string;
		email?: string;
		error?: { message?: string };
	};
	if (!res.ok || !json.localId) {
		throw new Error(authMessage(json.error?.message, 'Email or password is wrong.'));
	}
	const user = { uid: json.localId, email: json.email ?? normalized };
	await writeUserDoc(user);
	return user;
}
