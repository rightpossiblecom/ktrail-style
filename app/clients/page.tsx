'use client';

import { formatNaira } from '@/lib/workspace/operations';
import { useWorkspace } from '@/components/workspace/WorkspaceProvider';

export default function ClientsPage() {
	const { workspace } = useWorkspace();

	return (
		<div className="space-y-8">
			<div>
				<p className="kicker">Clients</p>
				<h1 className="heading-display mt-2 text-[1.75rem] leading-tight sm:text-3xl">
					Records that survive Saturday
				</h1>
			</div>
			<div className="grid gap-4">
				{workspace.clients.length === 0 ? (
					<div className="card p-8 text-sm text-[var(--color-cream-muted)]">
						No client records until a booking pack is approved.
					</div>
				) : (
					workspace.clients.map((client) => {
						const bookings = workspace.bookings.filter((booking) => booking.clientName === client.name);
						const spend = bookings.reduce((total, booking) => total + booking.price, 0);
						return (
							<article key={client.id} className="card p-6">
								<h2 className="text-lg font-semibold">{client.name}</h2>
								<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
									{bookings[0]?.serviceDescription ?? 'No service yet'} · lifetime {formatNaira(spend)}
								</p>
								<p className="mt-2 text-sm text-[var(--color-cream-dim)]">
									{bookings[0]?.slot ?? 'Follow-up not set'}
								</p>
							</article>
						);
					})
				)}
			</div>
		</div>
	);
}
