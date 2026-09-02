import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'ktrail_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export type SessionUser = {
	uid: string;
	email: string;
};

function secret() {
	const value = process.env.KTRAIL_SESSION_SECRET;
	if (!value) {
		throw new Error('KTRAIL_SESSION_SECRET is missing.');
	}
	return value;
}

function sign(payload: string) {
	return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function createSessionToken(user: SessionUser) {
	const body = Buffer.from(
		JSON.stringify({ ...user, exp: Date.now() + MAX_AGE_SECONDS * 1000, n: randomBytes(8).toString('hex') }),
	).toString('base64url');
	return `${body}.${sign(body)}`;
}

export function readSessionToken(token: string): SessionUser | null {
	const [body, signature] = token.split('.');
	if (!body || !signature) return null;
	const expected = sign(body);
	const left = Buffer.from(signature);
	const right = Buffer.from(expected);
	if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
	try {
		const parsed = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionUser & {
			exp?: number;
		};
		if (!parsed.uid || !parsed.email || !parsed.exp || parsed.exp < Date.now()) return null;
		return { uid: parsed.uid, email: parsed.email };
	} catch {
		return null;
	}
}

export async function getRequestSession(): Promise<SessionUser | null> {
	const jar = await cookies();
	const token = jar.get(SESSION_COOKIE)?.value;
	if (!token) return null;
	return readSessionToken(token);
}

export async function writeSession(user: SessionUser) {
	const jar = await cookies();
	jar.set(SESSION_COOKIE, createSessionToken(user), {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: MAX_AGE_SECONDS,
	});
}

export async function clearSessionCookie() {
	const jar = await cookies();
	jar.delete(SESSION_COOKIE);
}
