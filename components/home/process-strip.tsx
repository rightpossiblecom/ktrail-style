import { siteConfig } from '@/config/site';

export function ProcessStrip() {
	const { howItWorks } = siteConfig;

	return (
		<section className="relative bg-[var(--color-bg)] py-20 lg:py-24">
			<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
				<div className="border-b border-[var(--color-line)] pb-8">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						How it works
					</p>
				</div>

				<div className="mt-12 grid overflow-visible rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg)] sm:grid-cols-2 lg:grid-cols-3">
					{howItWorks.map((step, i) => (
						<div
							key={step.step}
							className={`relative p-8 lg:p-10 ${
								i < howItWorks.length - 1
									? 'border-b border-[var(--color-line)] sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r'
									: ''
							}`}
						>
							<div className="flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[var(--color-cream-dim)]">
								<span className="heading-display text-3xl text-[var(--color-copper)] lg:text-4xl">
									{step.step}
								</span>
							</div>
							<h3 className="heading-display mt-6 text-xl text-[var(--color-cream)] lg:text-2xl">
								{step.title}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{step.body}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
