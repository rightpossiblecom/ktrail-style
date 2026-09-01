import { formatNaira } from '@/lib/workspace/operations';

export function CommandPreview() {
	return (
		<div className="card overflow-hidden p-4 sm:p-5">
			<div className="flex items-center justify-between gap-3">
				<div>
					<p className="kicker">Command</p>
					<p className="mt-1 text-sm text-[var(--color-cream-muted)]">Fade District · Lekki</p>
				</div>
				<span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-success)]">
					Live
				</span>
			</div>
			<div className="mt-5 grid grid-cols-2 gap-3">
				<div className="rounded-2xl bg-[var(--color-surface)] p-4">
					<p className="text-xs text-[var(--color-cream-dim)]">Utilization</p>
					<p className="heading-display mt-1 text-3xl">75%</p>
				</div>
				<div className="rounded-2xl bg-[var(--color-surface)] p-4">
					<p className="text-xs text-[var(--color-cream-dim)]">Projected</p>
					<p className="heading-display mt-1 text-3xl">{formatNaira(8500)}</p>
				</div>
			</div>
			<div className="mt-4 rounded-2xl border border-[var(--color-line)] p-4">
				<p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-cobalt)]">
					Smart Inbox
				</p>
				<p className="mt-2 text-sm font-medium">Tunde Adebayo · low taper</p>
				<p className="mt-1 text-sm text-[var(--color-cream-muted)]">
					Chinedu · Thursday 4:30 PM · {formatNaira(8500)} · deposit {formatNaira(3000)}
				</p>
			</div>
		</div>
	);
}
