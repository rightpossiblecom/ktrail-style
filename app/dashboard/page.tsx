'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSession } from '@/lib/session';
import { formatNaira } from '@/lib/workspace/operations';
import { useWorkspace } from '@/components/workspace/WorkspaceProvider';

export default function DashboardOverviewPage() {
	const [email, setEmail] = useState('');
	const { workspace, metrics, hydrated } = useWorkspace();
	const pending = workspace.requests.find((request) => request.status === 'pending');
	const empty = hydrated && workspace.requests.length === 0 && workspace.bookings.length === 0;

	useEffect(() => {
		setEmail(getSession()?.email ?? '');
	}, []);

	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
				<div>
					<p className="kicker">Command</p>
					<h1 className="heading-display mt-2 text-[1.85rem] leading-tight sm:text-4xl">
						{empty ? 'The desk is dark' : `Welcome${email ? `, ${email.split('@')[0]}` : ''}`}
					</h1>
					<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
						{empty
							? 'No figures until Smart Inbox finishes a request.'
							: `${workspace.shop.name} · ${workspace.shop.city}`}
					</p>
				</div>
				<Link href="/new" className="btn-primary w-full sm:w-auto">
					{empty ? 'Open Inbox' : 'New request'}
				</Link>
			</div>

			{empty ? (
				<div className="card p-8">
					<p className="text-sm text-[var(--color-cream-muted)]">
						Use the Fade District sample in Inbox. After analysis, Command fills with occupancy,
						deposits, and today&apos;s work.
					</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
						{[
							{ label: 'Utilization', value: `${metrics.utilizationPercent}%`, hint: 'Chairs booked this week' },
							{ label: 'Projected revenue', value: formatNaira(metrics.projectedRevenue), hint: 'From confirmed packs' },
							{ label: 'Deposits due', value: formatNaira(metrics.depositTotal), hint: 'Waiting on WhatsApp confirm' },
							{ label: 'Clients', value: String(metrics.clientCount), hint: `${metrics.bookingCount} bookings` },
						].map((kpi) => (
							<div key={kpi.label} className="card p-4 sm:p-5">
								<p className="text-xs uppercase tracking-[0.08em] text-[var(--color-cream-dim)]">
									{kpi.label}
								</p>
								<p className="heading-display mt-3 text-2xl sm:text-3xl">{kpi.value}</p>
								<p className="mt-2 text-xs text-[var(--color-cream-muted)]">{kpi.hint}</p>
							</div>
						))}
					</div>

					{pending && (
						<div className="card p-6">
							<p className="kicker">Needs a decision</p>
							<p className="mt-3 text-lg font-semibold">
								{pending.clientName} · {pending.serviceDescription}
							</p>
							<p className="mt-1 text-sm text-[var(--color-cream-muted)]">
								{pending.matchedBarberName} · {pending.slot} · {formatNaira(pending.price)}
							</p>
							<Link href={`/projects/${pending.id}`} className="btn-primary mt-5">
								Review pack
							</Link>
						</div>
					)}

					<div className="card">
						<div className="border-b border-[var(--color-line)] px-6 py-4">
							<p className="kicker">Recent activity</p>
						</div>
						{workspace.activity.length === 0 ? (
							<p className="p-6 text-sm text-[var(--color-cream-muted)]">
								Approve a booking pack to write the first activity row.
							</p>
						) : (
							<ul className="divide-y divide-[var(--color-line)]">
								{workspace.activity.map((event) => (
									<li key={event.id} className="px-6 py-4 text-sm">
										{event.message}
									</li>
								))}
							</ul>
						)}
					</div>
				</>
			)}
		</div>
	);
}
