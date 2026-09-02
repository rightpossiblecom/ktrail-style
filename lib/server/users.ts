import { randomUUID } from 'node:crypto';
import { getFirestore } from '@/lib/server/gcp';
import { hashPassword, verifyPassword } from '@/lib/server/passwords';

export type ShopUser = {
	uid: string;
	email: string;
};

function users() {
	return getFirestore().collection('users');
}

export async function createUser(email: string, password: string): Promise<ShopUser> {
	const normalized = email.trim().toLowerCase();
	const existing = await users().where('email', '==', normalized).limit(1).get();
	if (!existing.empty) {
		throw new Error('An account with that email already exists.');
	}
	const uid = randomUUID();
	const { hash, salt } = await hashPassword(password);
	await users().doc(uid).set({
		email: normalized,
		passwordHash: hash,
		passwordSalt: salt,
		createdAt: new Date().toISOString(),
	});
	return { uid, email: normalized };
}

export async function authenticateUser(email: string, password: string): Promise<ShopUser> {
	const normalized = email.trim().toLowerCase();
	const snap = await users().where('email', '==', normalized).limit(1).get();
	if (snap.empty) {
		throw new Error('Wrong email or password.');
	}
	const doc = snap.docs[0];
	if (!doc) {
		throw new Error('Wrong email or password.');
	}
	const data = doc.data();
	const ok = await verifyPassword(password, String(data.passwordSalt), String(data.passwordHash));
	if (!ok) {
		throw new Error('Wrong email or password.');
	}
	return { uid: doc.id, email: normalized };
}
