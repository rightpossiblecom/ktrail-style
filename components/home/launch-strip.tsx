import { siteConfig } from '@/config/site';

export function LaunchStrip() {
	const { launchStrip } = siteConfig;

	return (
		<section className="border-y border-[var(--color-line)] bg-[var(--color-bg)] py-10">
			<div className="mx-auto flex max-w-[1500px] flex-col items-start gap-4 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					{launchStrip.eyebrow}
				</p>
				<div className="flex flex-wrap gap-x-8 gap-y-2">
					{launchStrip.places.map((place) => (
						<span
							key={place}
							className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--color-cream)]/80"
						>
							{place}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
