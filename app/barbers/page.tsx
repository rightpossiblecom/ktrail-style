import { siteConfig } from '@/config/site';

export default function BarbersPage() {
	const { barbers } = siteConfig.dashboard;

	return (
		<div className="space-y-8">
			<div>
				<p className="text-[0.65rem] uppercase tracking-[0.28em] text-[var(--color-copper)]">Network</p>
				<h1 className="heading-display mt-2 text-3xl">Barbers</h1>
				<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
					Demo roster — Nigerian cities, multi-chair shops.
				</p>
			</div>
			<div className="overflow-x-auto border border-[var(--color-line)]">
				<table className="w-full min-w-[640px] text-left text-sm">
					<thead className="bg-[var(--color-bg-deep)] text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-cream-dim)]">
						<tr>
							<th className="px-4 py-3">Name</th>
							<th className="px-4 py-3">City</th>
							<th className="px-4 py-3">Specialty</th>
							<th className="px-4 py-3">Chairs</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-[var(--color-line)]">
						{barbers.map((b) => (
							<tr key={b.name} className="bg-[var(--color-bg)]">
								<td className="px-4 py-3 text-[var(--color-cream)]">{b.name}</td>
								<td className="px-4 py-3 text-[var(--color-cream-muted)]">{b.city}</td>
								<td className="px-4 py-3 text-[var(--color-cream-muted)]">{b.specialty}</td>
								<td className="px-4 py-3 text-[var(--color-copper)]">{b.chairs}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
