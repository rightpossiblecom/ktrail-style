import { siteConfig } from '@/config/site';

export function ProductShowcase() {
	const { productShowcase } = siteConfig;

	return (
		<section className="bg-[var(--color-bg-deep)] py-20 lg:py-28">
			<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
				<div className="max-w-2xl border-b border-[var(--color-line)] pb-8">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						{productShowcase.eyebrow}
					</p>
					<h2 className="heading-display mt-4 text-3xl text-[var(--color-cream)] lg:text-5xl">
						{productShowcase.heading}
					</h2>
					<p className="mt-4 text-base leading-relaxed text-[var(--color-cream-muted)]">
						{productShowcase.body}
					</p>
				</div>
				<div className="mt-12 grid gap-8 lg:grid-cols-3">
					{productShowcase.moments.map((moment, i) => (
						<article key={moment.title} className="flex flex-col">
							<div
								className="image-placeholder aspect-[4/5] w-full overflow-hidden bg-cover bg-center"
								style={{ backgroundImage: `url('${moment.image}')` }}
							/>
							<span className="mt-6 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-[var(--color-cream-dim)]">
								{String(i + 1).padStart(2, '0')}
							</span>
							<h3 className="heading-display mt-2 text-xl text-[var(--color-cream)]">
								{moment.title}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{moment.body}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
