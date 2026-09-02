'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type AuthSession = {
	uid: string;
	email: string;
};

type AuthContextValue = {
	session: AuthSession | null;
	ready: boolean;
	refresh(): Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthSessionProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<AuthSession | null>(null);
	const [ready, setReady] = useState(false);

	async function refresh() {
		const response = await fetch('/api/auth/session', { cache: 'no-store' });
		const data = (await response.json()) as AuthSession | null;
		setSession(data?.uid ? data : null);
		setReady(true);
	}

	useEffect(() => {
		void refresh();
	}, []);

	const value = useMemo(() => ({ session, ready, refresh }), [session, ready]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthSession() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthSession must be used within AuthSessionProvider');
	}
	return context;
}
