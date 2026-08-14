import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function PricingPreview() {
	const { pricingTiers } = siteConfig;

	return (
		<section className="bg-[var(--color-bg)] py-20 lg:py-28">
			<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
				<div className="border-b border-[var(--color-line)] pb-8">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Pricing
					</p>
					<h2 className="heading-display mt-4 text-3xl text-[var(--color-cream)] lg:text-5xl">
						Plans for shops
					</h2>
					<p className="mt-3 max-w-xl text-sm text-[var(--color-cream-muted)]">
						Log in, create an account, or book a walkthrough — pick the path that fits your shop.
					</p>
				</div>
				<div className="mt-12 grid gap-6 lg:grid-cols-3">
					{pricingTiers.map((tier) => (
						<div
							key={tier.name}
							className="flex flex-col border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-8"
						>
							<h3 className="heading-display text-xl text-[var(--color-cream)]">{tier.name}</h3>
							<p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-copper)]">
								{tier.price}
							</p>
							<p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{tier.description}
							</p>
							<ul className="mt-6 space-y-2">
								{tier.highlights.map((item) => (
									<li
										key={item}
										className="text-xs uppercase tracking-[0.14em] text-[var(--color-cream-dim)]"
									>
										· {item}
									</li>
								))}
							</ul>
							<Link
								href={tier.cta.href}
								className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-copper)] px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg-deep)] transition-colors hover:bg-[var(--color-copper-bright)]"
							>
								{tier.cta.label}
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
