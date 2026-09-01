'use client';

import { formatNaira } from '@/lib/workspace/operations';
import { useWorkspace } from '@/components/workspace/WorkspaceProvider';

export default function BookingsPage() {
	const { workspace } = useWorkspace();

	return (
		<div className="space-y-8">
			<div>
				<p className="kicker">Calendar</p>
				<h1 className="heading-display mt-2 text-3xl">Chairs and slots</h1>
				<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
					Bookings created from Smart Inbox land here.
				</p>
			</div>
			<div className="card overflow-x-auto">
				<table className="w-full min-w-[720px] text-left text-sm">
					<thead className="bg-[var(--color-surface)] text-xs uppercase tracking-[0.08em] text-[var(--color-cream-dim)]">
						<tr>
							<th className="px-4 py-3">Client</th>
							<th className="px-4 py-3">Barber</th>
							<th className="px-4 py-3">Service</th>
							<th className="px-4 py-3">When</th>
							<th className="px-4 py-3">Price</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-[var(--color-line)]">
						{workspace.bookings.length === 0 ? (
							<tr>
								<td colSpan={5} className="px-4 py-8 text-[var(--color-cream-muted)]">
									No bookings until a pack is approved.
								</td>
							</tr>
						) : (
							workspace.bookings.map((booking) => (
								<tr key={booking.id}>
									<td className="px-4 py-3">{booking.clientName}</td>
									<td className="px-4 py-3 text-[var(--color-cream-muted)]">{booking.barberName}</td>
									<td className="px-4 py-3 text-[var(--color-cream-muted)]">
										{booking.serviceDescription}
									</td>
									<td className="px-4 py-3 text-[var(--color-cream-muted)]">{booking.slot}</td>
									<td className="px-4 py-3">{formatNaira(booking.price)}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
