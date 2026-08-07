import { siteConfig } from '@/config/site';

export function Audiences() {
	const { audiences } = siteConfig;

	return (
		<section className="bg-[var(--color-bg)] py-20 lg:py-28">
			<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
				<div className="border-b border-[var(--color-line)] pb-8">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Who it&apos;s for
					</p>
				</div>
				<div className="mt-12 grid gap-8 lg:grid-cols-3">
					{audiences.map((audience) => (
						<div key={audience.title} className="border-t border-[var(--color-copper)]/50 pt-6">
							<h3 className="heading-display text-xl text-[var(--color-cream)]">
								{audience.title}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{audience.body}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
