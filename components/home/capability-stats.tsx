import { siteConfig } from '@/config/site';

export function CapabilityStats() {
	const { stats } = siteConfig;

	return (
		<section className="bg-[var(--color-bg-deep)] py-14 lg:py-16">
			<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
				<div className="grid grid-cols-2 gap-8 border-t border-[var(--color-line)] pt-10 lg:grid-cols-4">
					{stats.map((stat) => (
						<div key={stat.label} className="flex flex-col">
							<span className="heading-display text-2xl text-[var(--color-cream)] lg:text-4xl">
								{stat.value}
							</span>
							<span className="mt-2 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-[var(--color-cream-dim)]">
								{stat.label}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
