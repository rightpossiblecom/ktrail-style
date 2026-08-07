import { siteConfig } from '@/config/site';

export type Session = {
	email: string;
	createdAt: string;
};

function storageKey() {
	return siteConfig.storageKeys.session;
}

export function getSession(): Session | null {
	if (typeof window === 'undefined') return null;
	try {
		const raw = localStorage.getItem(storageKey());
		if (!raw) return null;
		return JSON.parse(raw) as Session;
	} catch {
		return null;
	}
}

export function setSession(email: string): Session {
	const session: Session = { email, createdAt: new Date().toISOString() };
	localStorage.setItem(storageKey(), JSON.stringify(session));
	return session;
}

export function clearSession(): void {
	if (typeof window === 'undefined') return;
	localStorage.removeItem(storageKey());
}
