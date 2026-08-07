'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import { listActivity, type ActivityItem } from '@/lib/activity';
import { getSession } from '@/lib/session';

export default function DashboardOverviewPage() {
	const [email, setEmail] = useState('');
	const [activity, setActivity] = useState<ActivityItem[]>([]);
	const { dashboard, demoResults, brandName } = siteConfig;
	const maxBookings = Math.max(...dashboard.bookingsByDay.map((d) => d.value), 1);
	const maxPreviews = Math.max(...dashboard.previewsByStyle.map((d) => d.value), 1);

	useEffect(() => {
		setEmail(getSession()?.email ?? '');
		setActivity(listActivity());
	}, []);

	return (
		<div className="space-y-10">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="text-[0.65rem] uppercase tracking-[0.28em] text-[var(--color-copper)]">
						Overview
					</p>
					<h1 className="heading-display mt-2 text-3xl lg:text-4xl">
						Welcome{email ? `, ${email.split('@')[0]}` : ''}
					</h1>
					<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
						{brandName} · multi-barber network demo
					</p>
				</div>
				<Link
					href="/new"
					className="rounded-full bg-[var(--color-copper)] px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-bg-deep)]"
				>
					Start style preview
				</Link>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{dashboard.kpis.map((kpi) => (
					<div key={kpi.label} className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-5">
						<p className="text-[0.6rem] uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
							{kpi.label}
						</p>
						<p className="heading-display mt-3 text-3xl text-[var(--color-cream)]">{kpi.value}</p>
						<p className="mt-2 text-xs text-[var(--color-cream-muted)]">{kpi.hint}</p>
					</div>
				))}
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-6">
					<p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-copper)]">
						Bookings this week
					</p>
					<div className="mt-8 flex h-40 items-end gap-2">
						{dashboard.bookingsByDay.map((d) => (
							<div key={d.day} className="flex flex-1 flex-col items-center gap-2">
								<div
									className="w-full rounded-t bg-[var(--color-copper)]/80"
									style={{ height: `${(d.value / maxBookings) * 100}%`, minHeight: 4 }}
								/>
								<span className="text-[0.55rem] uppercase tracking-[0.14em] text-[var(--color-cream-dim)]">
									{d.day}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-6">
					<p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-copper)]">
						AI previews by style
					</p>
					<ul className="mt-8 space-y-4">
						{dashboard.previewsByStyle.map((row) => (
							<li key={row.label}>
								<div className="mb-1 flex justify-between text-xs text-[var(--color-cream-muted)]">
									<span>{row.label}</span>
									<span>{row.value}</span>
								</div>
								<div className="h-2 w-full bg-[var(--color-surface)]">
									<div
										className="h-full bg-[var(--color-copper)]"
										style={{ width: `${(row.value / maxPreviews) * 100}%` }}
									/>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="border border-[var(--color-line)] bg-[var(--color-bg-deep)]">
				<div className="border-b border-[var(--color-line)] px-6 py-4">
					<p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-copper)]">
						Recent activity
					</p>
				</div>
				{activity.length === 0 ? (
					<p className="p-6 text-sm text-[var(--color-cream-muted)]">
						No conversion activity yet — request a chair or send a preview from a result.
					</p>
				) : (
					<ul className="divide-y divide-[var(--color-line)]">
						{activity.map((a) => (
							<li key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
								<div>
									<p className="text-sm text-[var(--color-cream)]">{a.label}</p>
									<p className="mt-1 text-xs text-[var(--color-cream-dim)]">
										{new Date(a.createdAt).toLocaleString()}
									</p>
								</div>
								<Link
									href={`/projects/${a.previewId}`}
									className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-copper)] hover:underline"
								>
									Open
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>

			<div className="border border-[var(--color-line)] bg-[var(--color-bg-deep)]">
				<div className="border-b border-[var(--color-line)] px-6 py-4">
					<p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-copper)]">
						Recent style previews
					</p>
				</div>
				{demoResults.length === 0 ? (
					<p className="p-6 text-sm text-[var(--color-cream-muted)]">No activity yet.</p>
				) : (
					<ul className="divide-y divide-[var(--color-line)]">
						{demoResults.map((r) => (
							<li key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
								<div>
									<p className="text-sm text-[var(--color-cream)]">
										{r.clientName} · {r.city}
									</p>
									<p className="mt-1 text-xs text-[var(--color-cream-dim)]">
										{r.requestedStyle} · {r.confidence}% confidence
									</p>
								</div>
								<Link
									href={`/projects/${r.id}`}
									className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-copper)] hover:underline"
								>
									Open
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
