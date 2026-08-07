'use client';

import { useState, type FormEvent } from 'react';
import { saveLead, type LeadFormType } from '@/lib/leads';

const fieldClass =
	'mt-2 w-full border border-[var(--color-line-strong)] bg-[var(--color-bg-deep)] px-4 py-3 text-sm text-[var(--color-cream)] outline-none placeholder:text-[var(--color-cream-dim)] focus:border-[var(--color-copper)]';

const labelClass = 'block text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[var(--color-cream-dim)]';

const CTA: Record<LeadFormType, string> = {
	waitlist: 'Join waitlist',
	demo: 'Request demo',
	'early-access': 'Apply for early access',
};

export function LeadForm({ type }: { type: LeadFormType }) {
	const [done, setDone] = useState(false);
	const [error, setError] = useState('');

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError('');
		const fd = new FormData(e.currentTarget);
		const name = String(fd.get('name') || '').trim();
		const email = String(fd.get('email') || '').trim();
		const phone = String(fd.get('phone') || '').trim();
		const city = String(fd.get('city') || '').trim();

		if (!name || !email || !phone || !city) {
			setError('Please fill in all required fields.');
			return;
		}

		saveLead({
			type,
			name,
			email,
			phone,
			city,
			role: String(fd.get('role') || '').trim() || undefined,
			company: String(fd.get('company') || '').trim() || undefined,
			need: String(fd.get('need') || '').trim() || undefined,
			reason: String(fd.get('reason') || '').trim() || undefined,
		});
		setDone(true);
	}

	if (done) {
		return (
			<div className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-8">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Received
				</p>
				<p className="heading-display mt-4 text-2xl text-[var(--color-cream)]">You&apos;re on the list</p>
				<p className="mt-3 text-sm text-[var(--color-cream-muted)]">
					We saved your details locally for this Wave 1 demo. No server backend yet.
				</p>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit} className="space-y-5">
			<div>
				<label className={labelClass} htmlFor="name">
					Name
				</label>
				<input id="name" name="name" required className={fieldClass} placeholder="Your name" />
			</div>
			<div>
				<label className={labelClass} htmlFor="email">
					Email
				</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					className={fieldClass}
					placeholder="you@shop.ng"
				/>
			</div>
			<div>
				<label className={labelClass} htmlFor="phone">
					Phone
				</label>
				<input id="phone" name="phone" required className={fieldClass} placeholder="+234…" />
			</div>
			<div>
				<label className={labelClass} htmlFor="city">
					City
				</label>
				<input id="city" name="city" required className={fieldClass} placeholder="Ado-Ekiti" />
			</div>

			{(type === 'demo' || type === 'early-access') && (
				<div>
					<label className={labelClass} htmlFor="role">
						Role
					</label>
					<input id="role" name="role" className={fieldClass} placeholder="Barber / Shop owner" />
				</div>
			)}

			{type === 'demo' && (
				<>
					<div>
						<label className={labelClass} htmlFor="company">
							Shop / company
						</label>
						<input id="company" name="company" className={fieldClass} placeholder="Shop name" />
					</div>
					<div>
						<label className={labelClass} htmlFor="need">
							What do you need?
						</label>
						<textarea
							id="need"
							name="need"
							rows={3}
							className={fieldClass}
							placeholder="Booking + AI preview walkthrough…"
						/>
					</div>
				</>
			)}

			{type === 'early-access' && (
				<div>
					<label className={labelClass} htmlFor="reason">
						Why early access?
					</label>
					<textarea
						id="reason"
						name="reason"
						rows={3}
						className={fieldClass}
						placeholder="Ready to pilot when seats open…"
					/>
				</div>
			)}

			{error && <p className="text-sm text-[var(--color-copper-bright)]">{error}</p>}

			<button
				type="submit"
				className="w-full rounded-full bg-[var(--color-copper)] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg-deep)] transition-colors hover:bg-[var(--color-copper-bright)]"
			>
				{CTA[type]}
			</button>
		</form>
	);
}
