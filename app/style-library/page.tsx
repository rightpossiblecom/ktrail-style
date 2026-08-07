import { siteConfig } from '@/config/site';

export default function StyleLibraryPage() {
	const { styleLibrary } = siteConfig.dashboard;

	return (
		<div className="space-y-8">
			<div>
				<p className="text-[0.65rem] uppercase tracking-[0.28em] text-[var(--color-copper)]">Catalog</p>
				<h1 className="heading-display mt-2 text-3xl">Style library</h1>
				<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
					Curated cuts and colors for AI preview matching.
				</p>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{styleLibrary.map((style) => (
					<article
						key={style.name}
						className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-5"
					>
						<p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">
							{style.category} · {style.difficulty}
						</p>
						<h2 className="heading-display mt-3 text-xl text-[var(--color-cream)]">{style.name}</h2>
					</article>
				))}
			</div>
		</div>
	);
}
