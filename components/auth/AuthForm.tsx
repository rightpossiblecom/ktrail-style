'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setSession } from '@/lib/session';
import { siteConfig } from '@/config/site';

const fieldClass =
	'mt-2 w-full border border-[var(--color-line-strong)] bg-[var(--color-bg-deep)] px-4 py-3 text-sm text-[var(--color-cream)] outline-none placeholder:text-[var(--color-cream-dim)] focus:border-[var(--color-copper)]';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
	const router = useRouter();
	const [error, setError] = useState('');

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const email = String(fd.get('email') || '').trim();
		const password = String(fd.get('password') || '').trim();
		if (!email || !password) {
			setError('Enter your email and password.');
			return;
		}
		setSession(email);
		router.push('/dashboard');
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-6 py-16 text-[var(--color-cream)]">
			<div className="w-full max-w-md border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-8">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					{siteConfig.brandName}
				</p>
				<h1 className="heading-display mt-4 text-3xl">
					{mode === 'login' ? 'Sign in to your account' : 'Create your account'}
				</h1>
				<p className="mt-3 text-sm text-[var(--color-cream-muted)]">
					{mode === 'login'
						? 'Use your email and password to open your shop dashboard.'
						: 'Create an account to manage bookings, barbers, and style previews.'}
				</p>
				<form onSubmit={onSubmit} className="mt-8 space-y-5">
					<div>
						<label
							htmlFor="email"
							className="block text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[var(--color-cream-dim)]"
						>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							className={fieldClass}
							placeholder="you@ktrail.ai"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[var(--color-cream-dim)]"
						>
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							className={fieldClass}
							placeholder="••••••••"
						/>
					</div>
					{error && <p className="text-sm text-[var(--color-copper-bright)]">{error}</p>}
					<button
						type="submit"
						className="w-full rounded-full bg-[var(--color-copper)] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg-deep)] hover:bg-[var(--color-copper-bright)]"
					>
						{mode === 'login' ? 'Sign in' : 'Create account'}
					</button>
				</form>
				<p className="mt-6 text-center text-sm text-[var(--color-cream-dim)]">
					{mode === 'login' ? (
						<>
							Need an account?{' '}
							<Link href="/signup" className="text-[var(--color-copper)] hover:underline">
								Sign up
							</Link>
						</>
					) : (
						<>
							Already in?{' '}
							<Link href="/login" className="text-[var(--color-copper)] hover:underline">
								Sign in
							</Link>
						</>
					)}
				</p>
			</div>
		</main>
	);
}
