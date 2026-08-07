'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSession, type Session } from '@/lib/session';
import { siteConfig } from '@/config/site';

const nav = [
	{ href: '/dashboard', label: 'Overview' },
	{ href: '/new', label: 'New preview' },
	{ href: '/barbers', label: 'Barbers' },
	{ href: '/bookings', label: 'Bookings' },
	{ href: '/style-library', label: 'Style library' },
	{ href: '/dashboard/account', label: 'Account' },
];

export function DashboardShell({ children }: { children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname() || '/dashboard';
	const [session, setSessionState] = useState<Session | null>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const s = getSession();
		if (!s) {
			router.replace('/login');
			return;
		}
		setSessionState(s);
		setReady(true);
	}, [router]);

	if (!ready || !session) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-cream-dim)]">
				Loading…
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-cream)]">
			<aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--color-line)] bg-[var(--color-bg-deep)] lg:flex">
				<div className="border-b border-[var(--color-line)] px-5 py-6">
					<p className="font-display text-lg tracking-tight">
						{siteConfig.logo.text}
						<span className="text-[var(--color-copper)]">{siteConfig.logo.accent}</span>
					</p>
					<p className="mt-1 truncate text-xs text-[var(--color-cream-dim)]">{session.email}</p>
				</div>
				<nav className="flex flex-1 flex-col gap-1 p-3">
					{nav.map((item) => {
						const active =
							item.href === '/dashboard'
								? pathname === '/dashboard'
								: pathname === item.href || pathname.startsWith(`${item.href}/`);
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`rounded-lg px-3 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors ${
									active
										? 'bg-[var(--color-surface)] text-[var(--color-copper)]'
										: 'text-[var(--color-cream-muted)] hover:bg-[var(--color-surface)]/60 hover:text-[var(--color-cream)]'
								}`}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>
			</aside>

			<div className="flex min-w-0 flex-1 flex-col">
				<header className="flex items-center justify-between border-b border-[var(--color-line)] px-4 py-4 lg:px-8">
					<nav className="flex gap-3 overflow-x-auto lg:hidden">
						{nav.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="whitespace-nowrap text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-cream-muted)]"
							>
								{item.label}
							</Link>
						))}
					</nav>
					<p className="hidden text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-cream-dim)] lg:block">
						Demo dashboard · not linked from marketing
					</p>
					<Link
						href="/new"
						className="rounded-full bg-[var(--color-copper)] px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-bg-deep)]"
					>
						New preview
					</Link>
				</header>
				<div className="flex-1 px-4 py-8 lg:px-8">{children}</div>
			</div>
		</div>
	);
}
