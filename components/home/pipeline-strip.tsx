import { siteConfig } from '@/config/site';

export function PipelineStrip() {
	const { pipeline } = siteConfig;

	return (
		<section className="bg-[var(--color-surface)] py-20 lg:py-24">
			<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
				<div className="border-b border-[var(--color-line-strong)] pb-8">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						AI + book pipeline
					</p>
					<h2 className="heading-display mt-4 text-3xl text-[var(--color-cream)] lg:text-4xl">
						From photo to chair request
					</h2>
				</div>
				<ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{pipeline.map((stage, i) => (
						<li
							key={stage.id}
							className="border border-[var(--color-line-strong)] bg-[var(--color-bg)] p-6"
						>
							<span className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-[var(--color-cream-dim)]">
								Stage {String(i + 1).padStart(2, '0')}
							</span>
							<p className="heading-display mt-4 text-lg text-[var(--color-cream)]">
								{stage.label}
							</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
