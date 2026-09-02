'use client';

import { formatNaira } from '@/lib/workspace/operations';
import { useWorkspace } from '@/components/workspace/WorkspaceProvider';

export default function ServicesPage() {
	const { workspace } = useWorkspace();

	return (
		<div className="space-y-8">
			<div>
				<p className="kicker">Services</p>
				<h1 className="heading-display mt-2 text-[1.75rem] leading-tight sm:text-3xl">Price, time, deposit</h1>
			</div>
			<div className="grid gap-4 sm:grid-cols-2">
				{workspace.services.length === 0 ? (
					<div className="card p-8 text-sm text-[var(--color-cream-muted)]">
						Run the Fade District sample to load the low taper service.
					</div>
				) : (
					workspace.services.map((service) => (
						<article key={service.id} className="card p-6">
							<h2 className="text-lg font-semibold">{service.name}</h2>
							<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
								{service.durationMinutes} minutes · {formatNaira(service.price)} · deposit{' '}
								{formatNaira(service.depositAmount)}
							</p>
						</article>
					))
				)}
			</div>
		</div>
	);
}
