import { siteConfig } from '@/config/site';

export default function BookingsPage() {
	const { bookings } = siteConfig.dashboard;

	return (
		<div className="space-y-8">
			<div>
				<p className="text-[0.65rem] uppercase tracking-[0.28em] text-[var(--color-copper)]">Schedule</p>
				<h1 className="heading-display mt-2 text-3xl">Bookings</h1>
				<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
					Demo appointments with ₦ pricing.
				</p>
			</div>
			<div className="overflow-x-auto border border-[var(--color-line)]">
				<table className="w-full min-w-[720px] text-left text-sm">
					<thead className="bg-[var(--color-bg-deep)] text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-cream-dim)]">
						<tr>
							<th className="px-4 py-3">Client</th>
							<th className="px-4 py-3">Barber</th>
							<th className="px-4 py-3">Service</th>
							<th className="px-4 py-3">When</th>
							<th className="px-4 py-3">Status</th>
							<th className="px-4 py-3">Price</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-[var(--color-line)]">
						{bookings.map((b) => (
							<tr key={`${b.client}-${b.when}`} className="bg-[var(--color-bg)]">
								<td className="px-4 py-3 text-[var(--color-cream)]">{b.client}</td>
								<td className="px-4 py-3 text-[var(--color-cream-muted)]">{b.barber}</td>
								<td className="px-4 py-3 text-[var(--color-cream-muted)]">{b.service}</td>
								<td className="px-4 py-3 text-[var(--color-cream-muted)]">{b.when}</td>
								<td className="px-4 py-3 text-[var(--color-copper)]">{b.status}</td>
								<td className="px-4 py-3 text-[var(--color-cream)]">{b.price}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
