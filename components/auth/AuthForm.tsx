'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setSession } from '@/lib/session';
import { siteConfig } from '@/config/site';

const fieldClass =
	'mt-2 w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-bg)] px-4 py-3 text-sm outline-none focus:border-[var(--color-cobalt)]';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
	const router = useRouter();
	const [error, setError] = useState('');
	const [verify, setVerify] = useState(false);

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const email = String(fd.get('email') || '').trim();
		const password = String(fd.get('password') || '').trim();
		if (!email || !password) {
			setError('Enter your email and password.');
			return;
		}
		if (mode === 'signup') {
			setVerify(true);
			return;
		}
		setSession(email);
		router.push('/dashboard');
	}

	if (verify) {
		return (
			<main className="flex min-h-dvh items-center justify-center bg-[var(--color-bg)] px-4 py-10 sm:px-6 sm:py-16">
				<div className="card w-full max-w-md p-6 sm:p-8">
					<p className="kicker">{siteConfig.brandName}</p>
					<h1 className="heading-display mt-4 text-[1.75rem] sm:text-3xl">Check your email</h1>
					<p className="mt-3 text-sm text-[var(--color-cream-muted)]">
						We sent a verification link. After you confirm, log in with any email and password to open Command.
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
						? 'Any email and password opens the empty desk.'
						: 'Sign up stays on this page until you verify.'}
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
						<input id="password" name="password" type="password" required className={fieldClass} />
					</div>
					{error && <p className="text-sm text-[var(--color-cobalt)]">{error}</p>}
					<button type="submit" className="btn-primary w-full">
						{mode === 'login' ? 'Log in' : 'Create account'}
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
