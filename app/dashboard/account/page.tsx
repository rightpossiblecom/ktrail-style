'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearSession, getSession } from '@/lib/session';
import { siteConfig } from '@/config/site';

export default function DashboardAccountPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');

	useEffect(() => {
		setEmail(getSession()?.email ?? '');
	}, []);

	function signOut() {
		clearSession();
		router.replace('/login');
	}

	return (
		<div className="mx-auto max-w-xl space-y-8">
			<div>
				<p className="text-[0.65rem] uppercase tracking-[0.28em] text-[var(--color-copper)]">Account</p>
				<h1 className="heading-display mt-2 text-3xl">Profile</h1>
			</div>

			<div className="space-y-4 border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-6 text-sm">
				<div>
					<p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">Email</p>
					<p className="mt-1 text-[var(--color-cream)]">{email || '—'}</p>
				</div>
				<div>
					<p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">
						Organization
					</p>
					<p className="mt-1 text-[var(--color-cream)]">{siteConfig.brandName}</p>
				</div>
				<div>
					<p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">Plan</p>
					<p className="mt-1 text-[var(--color-cream)]">Shop</p>
				</div>
				<div>
					<p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">
						Legal entity
					</p>
					<p className="mt-1 text-[var(--color-cream-muted)]">{siteConfig.legalName}</p>
				</div>
			</div>

			<button
				type="button"
				onClick={signOut}
				className="btn-secondary"
			>
				Sign out
			</button>
		</div>
	);
}
