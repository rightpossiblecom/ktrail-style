'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const fieldClass =
	'mt-2 w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-bg)] px-4 py-3 text-sm outline-none focus:border-[var(--color-cobalt)]';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
	const [error, setError] = useState('');
	const [busy, setBusy] = useState(false);
	const [verifyEmail, setVerifyEmail] = useState('');

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const email = String(fd.get('email') || '').trim();
		const password = String(fd.get('password') || '').trim();
		if (!email || !password) {
			setError('Enter your email and password.');
			return;
		}
		setBusy(true);
		setError('');
		const response = await fetch(mode === 'signup' ? '/api/auth/signup' : '/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		const data = (await response.json()) as { error?: string; verify?: boolean };
		setBusy(false);
		if (!response.ok) {
			setError(data.error || 'That did not work.');
			return;
		}
		if (mode === 'signup') {
			setVerifyEmail(email);
			return;
		}
		window.location.assign('/dashboard');
	}

	if (mode === 'signup' && verifyEmail) {
		return (
			<main className="flex min-h-dvh items-center justify-center bg-[var(--color-bg)] px-4 py-10 sm:px-6 sm:py-16">
				<div className="card w-full max-w-md p-6 sm:p-8">
					<p className="kicker">{siteConfig.brandName}</p>
					<h1 className="heading-display mt-4 text-[1.75rem] sm:text-3xl">Check your email</h1>
					<p className="mt-3 text-sm leading-relaxed text-[var(--color-cream-muted)]">
						We sent a verification note to <span className="text-[var(--color-ink)]">{verifyEmail}</span>.
						Open that mail, then log in to Command.
					</p>
					<Link href="/login" className="btn-primary mt-8 w-full">
						Go to log in
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className="flex min-h-dvh items-center justify-center bg-[var(--color-bg)] px-4 py-10 sm:px-6 sm:py-16">
			<div className="card w-full max-w-md p-6 sm:p-8">
				<p className="kicker">{siteConfig.brandName}</p>
				<h1 className="heading-display mt-4 text-[1.75rem] sm:text-3xl">
					{mode === 'login' ? 'Log in to Command' : 'Create your shop account'}
				</h1>
				<p className="mt-3 text-sm text-[var(--color-cream-muted)]">
					{mode === 'login'
						? 'Use the email and password you created for this shop.'
						: 'This creates a real shop account. Check the verify screen, then log in.'}
				</p>
				<form onSubmit={onSubmit} className="mt-8 space-y-5">
					<div>
						<label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.08em]">
							Email
						</label>
						<input id="email" name="email" type="email" required className={fieldClass} />
					</div>
					<div>
						<label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.08em]">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							minLength={mode === 'signup' ? 8 : undefined}
							className={fieldClass}
						/>
					</div>
					{error && <p className="text-sm text-[var(--color-cobalt)]">{error}</p>}
					<button type="submit" className="btn-primary w-full" disabled={busy}>
						{busy ? 'Working…' : mode === 'login' ? 'Log in' : 'Create account'}
					</button>
				</form>
				<p className="mt-6 text-center text-sm text-[var(--color-cream-dim)]">
					{mode === 'login' ? (
						<>
							Need an account?{' '}
							<Link href="/signup" className="text-[var(--color-cobalt)]">
								Sign up
							</Link>
						</>
					) : (
						<>
							Already in?{' '}
							<Link href="/login" className="text-[var(--color-cobalt)]">
								Log in
							</Link>
						</>
					)}
				</p>
			</div>
		</main>
	);
}
