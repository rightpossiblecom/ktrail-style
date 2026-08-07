/**
 * Minimal Cloud Grant route placeholder.
 * Uses existing Frisor CSS variables only — no new theme.
 */
export function StubPage({
	title,
	note = 'Stub — filled in a later phase.',
}: {
	title: string;
	note?: string;
}) {
	return (
		<main className="bg-[var(--color-bg)] px-6 py-24 text-[var(--color-cream)] lg:px-10">
			<div className="mx-auto max-w-[1400px]">
				<p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">
					KTrail Style
				</p>
				<h1 className="mt-4 text-3xl font-semibold tracking-tight lg:text-4xl">{title}</h1>
				<p className="mt-4 max-w-xl text-sm opacity-70">{note}</p>
			</div>
		</main>
	);
}
