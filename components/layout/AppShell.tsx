'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const APP_PREFIXES = [
	'/login',
	'/signup',
	'/dashboard',
	'/new',
	'/projects',
	'/barbers',
	'/bookings',
	'/style-library',
];

function isAppRoute(pathname: string) {
	return APP_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname() || '/';
	const hideChrome = isAppRoute(pathname);

	if (hideChrome) {
		return <>{children}</>;
	}

	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
