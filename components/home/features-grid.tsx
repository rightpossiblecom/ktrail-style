import { siteConfig } from '@/config/site';

export function FeaturesGrid() {
	const { features } = siteConfig;

	return (
		<section className="bg-[var(--color-bg-deep)] py-20 lg:py-28">
			<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
				<div className="border-b border-[var(--color-line)] pb-8">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Capabilities
					</p>
					<h2 className="heading-display mt-4 text-3xl text-[var(--color-cream)] lg:text-5xl">
						What the platform carries
					</h2>
				</div>
				<div className="mt-12 grid gap-px bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => (
						<div key={feature.title} className="bg-[var(--color-bg-deep)] p-8">
							<h3 className="heading-display text-lg text-[var(--color-cream)]">
								{feature.title}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{feature.body}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
