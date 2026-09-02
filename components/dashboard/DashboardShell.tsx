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

const mobileTabs = nav.slice(0, 4);

function isActive(pathname: string, href: string) {
	return href === '/dashboard'
		? pathname === '/dashboard'
		: pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardShell({ children }: { children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname() || '/dashboard';
	const [session, setSessionState] = useState<Session | null>(() =>
		typeof window === 'undefined' ? null : getSession(),
	);
	const [ready, setReady] = useState(() => typeof window !== 'undefined' && Boolean(getSession()));
	const [menuOpen, setMenuOpen] = useState(false);
	const { resetWorkspace } = useWorkspace();
	const current = nav.find((item) => isActive(pathname, item.href)) ?? nav[0];

	useEffect(() => {
		const s = getSession();
		if (!s) {
			router.replace('/login');
			return;
		}
		setSessionState(s);
		setReady(true);
	}, [router]);

	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	if (!ready || !session) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-cream-dim)]">
				Opening Command…
			</div>
		);
	}

	return (
		<div className="flex min-h-dvh bg-[var(--color-bg)] text-[var(--color-ink)]">
			<aside className="hidden w-64 shrink-0 flex-col border-r border-[var(--color-line)] bg-[var(--color-bg-deep)] lg:flex">
				<div className="border-b border-[var(--color-line)] px-5 py-6">
					<p className="heading-display text-xl">
						{siteConfig.logo.text}
						<span className="text-[var(--color-cobalt)]">{siteConfig.logo.accent}</span>
					</p>
					<p className="mt-1 truncate text-xs text-[var(--color-cream-dim)]">{session.email}</p>
				</div>
				<nav className="flex flex-1 flex-col gap-1 p-3">
					{nav.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
								isActive(pathname, item.href)
									? 'bg-[var(--color-surface)] text-[var(--color-cobalt)]'
									: 'text-[var(--color-cream-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]'
							}`}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</aside>

			<div className="flex min-w-0 flex-1 flex-col">
				<header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-bg-deep)] px-3 py-3 sm:px-4 lg:px-8">
					<div className="flex items-center gap-2 sm:gap-3">
						<button
							type="button"
							className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-line)] lg:hidden"
							aria-expanded={menuOpen}
							aria-label="Open menu"
							onClick={() => setMenuOpen((open) => !open)}
						>
							<span className="flex flex-col gap-1.5">
								<span className="block h-0.5 w-4 bg-[var(--color-ink)]" />
								<span className="block h-0.5 w-4 bg-[var(--color-ink)]" />
								<span className="block h-0.5 w-4 bg-[var(--color-ink)]" />
							</span>
						</button>
						<div className="min-w-0 flex-1">
							<p className="heading-display truncate text-base sm:text-lg">
								{siteConfig.logo.text}
								<span className="text-[var(--color-cobalt)]">{siteConfig.logo.accent}</span>
							</p>
							<p className="truncate text-xs text-[var(--color-cream-dim)]">
								{current?.label} · Fade District
							</p>
						</div>
						<button
							type="button"
							onClick={() => {
								resetWorkspace();
								setMenuOpen(false);
								router.push('/new');
							}}
							className="inline-flex min-h-11 shrink-0 items-center rounded-xl px-2 text-sm font-medium text-[var(--color-cream-muted)] sm:px-3"
						>
							Reset
						</button>
						<div className="hidden lg:block">
							<Link href="/new" className="btn-primary px-4 py-2 text-sm">
								Open Inbox
							</Link>
						</div>
					</div>
				</header>

				{menuOpen && (
					<div className="fixed inset-0 z-40 lg:hidden">
						<button
							type="button"
							aria-label="Close menu"
							className="absolute inset-0 bg-[var(--color-ink)]/30"
							onClick={() => setMenuOpen(false)}
						/>
						<div className="absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col bg-[var(--color-bg-deep)] shadow-xl">
							<div className="border-b border-[var(--color-line)] px-5 py-5">
								<p className="heading-display text-lg">
									{siteConfig.logo.text}
									<span className="text-[var(--color-cobalt)]">{siteConfig.logo.accent}</span>
								</p>
								<p className="mt-1 truncate text-xs text-[var(--color-cream-dim)]">{session.email}</p>
							</div>
							<nav className="flex-1 overflow-y-auto p-3">
								{nav.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className={`block rounded-xl px-3 py-3 text-base font-medium ${
											isActive(pathname, item.href)
												? 'bg-[var(--color-surface)] text-[var(--color-cobalt)]'
												: 'text-[var(--color-ink)]'
										}`}
									>
										{item.label}
									</Link>
								))}
							</nav>
						</div>
					</div>
				)}

				<div className="flex-1 px-4 py-6 pb-28 sm:px-5 lg:px-8 lg:py-8 lg:pb-8">{children}</div>

				<nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-[var(--color-line)] bg-[var(--color-bg-deep)] px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 lg:hidden">
					{mobileTabs.map((item) => {
						const active = isActive(pathname, item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`flex min-h-12 flex-col items-center justify-center rounded-xl text-[11px] font-semibold sm:text-xs ${
									active
										? 'bg-[var(--color-surface)] text-[var(--color-cobalt)]'
										: 'text-[var(--color-cream-dim)]'
								}`}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>
			</div>
		</div>
	);
}
