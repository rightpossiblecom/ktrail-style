'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSession, type Session } from '@/lib/session';
import { useWorkspace } from '@/components/workspace/WorkspaceProvider';
import { siteConfig } from '@/config/site';

const nav = [
	{ href: '/dashboard', label: 'Command' },
	{ href: '/new', label: 'Inbox' },
	{ href: '/bookings', label: 'Calendar' },
	{ href: '/clients', label: 'Clients' },
	{ href: '/barbers', label: 'Team' },
	{ href: '/services', label: 'Services' },
	{ href: '/insights', label: 'Insights' },
	{ href: '/style-library', label: 'Studio' },
	{ href: '/dashboard/account', label: 'Account' },
];

export function DashboardShell({ children }: { children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname() || '/dashboard';
	const [session, setSessionState] = useState<Session | null>(() =>
		typeof window === 'undefined' ? null : getSession(),
	);
	const [ready, setReady] = useState(() => typeof window !== 'undefined' && Boolean(getSession()));
	const { resetWorkspace } = useWorkspace();

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
				Opening Command…
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
			<aside className="hidden w-64 shrink-0 flex-col border-r border-[var(--color-line)] bg-[var(--color-bg-deep)] lg:flex">
				<div className="border-b border-[var(--color-line)] px-5 py-6">
					<p className="heading-display text-xl">
						{siteConfig.logo.text}
						<span className="text-[var(--color-cobalt)]">{siteConfig.logo.accent}</span>
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
								className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
									active
										? 'bg-[var(--color-surface)] text-[var(--color-cobalt)]'
										: 'text-[var(--color-cream-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]'
								}`}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>
			</aside>

			<div className="flex min-w-0 flex-1 flex-col">
				<header className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] bg-[var(--color-bg-deep)] px-4 py-4 lg:px-8">
					<nav className="flex gap-3 overflow-x-auto lg:hidden">
						{nav.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="whitespace-nowrap text-xs font-medium text-[var(--color-cream-muted)]"
							>
								{item.label}
							</Link>
						))}
					</nav>
					<p className="hidden text-sm text-[var(--color-cream-dim)] lg:block">
						Fade District · Lekki
					</p>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => {
								resetWorkspace();
								router.push('/new');
							}}
							className="btn-secondary px-4 py-2 text-xs"
						>
							Reset house
						</button>
						<Link href="/new" className="btn-primary px-4 py-2 text-xs">
							Open Inbox
						</Link>
					</div>
				</header>
				<div className="flex-1 px-4 py-8 lg:px-8">{children}</div>
			</div>
		</div>
	);
}
