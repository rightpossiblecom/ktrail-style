'use client';

import { formatNaira } from '@/lib/workspace/operations';
import { useWorkspace } from '@/components/workspace/WorkspaceProvider';

export default function InsightsPage() {
	const { workspace, metrics } = useWorkspace();

	return (
		<div className="space-y-8">
			<div>
				<p className="kicker">Insights</p>
				<h1 className="heading-display mt-2 text-[1.75rem] leading-tight sm:text-3xl">What the week is doing</h1>
			</div>
			<div className="grid gap-4 sm:grid-cols-2">
				<div className="card p-6">
					<p className="text-xs uppercase tracking-[0.08em] text-[var(--color-cream-dim)]">Utilization</p>
					<p className="heading-display mt-3 text-3xl sm:text-4xl">{metrics.utilizationPercent}%</p>
				</div>
				<div className="card p-6">
					<p className="text-xs uppercase tracking-[0.08em] text-[var(--color-cream-dim)]">Projected revenue</p>
					<p className="heading-display mt-3 text-3xl sm:text-4xl">{formatNaira(metrics.projectedRevenue)}</p>
				</div>
				<div className="card p-6">
					<p className="text-xs uppercase tracking-[0.08em] text-[var(--color-cream-dim)]">Returning clients</p>
					<p className="heading-display mt-3 text-3xl sm:text-4xl">{metrics.clientCount}</p>
				</div>
				<div className="card p-6">
					<p className="text-xs uppercase tracking-[0.08em] text-[var(--color-cream-dim)]">Deposits</p>
					<p className="heading-display mt-3 text-3xl sm:text-4xl">{formatNaira(metrics.depositTotal)}</p>
					<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
						{workspace.activity.length} confirmed handoffs
					</p>
				</div>
			</div>
		</div>
	);
}
