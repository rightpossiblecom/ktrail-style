import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function PricingPage() {
	const { pricingTiers, brandName } = siteConfig;

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-12 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Pricing
				</p>
				<h1 className="heading-display mt-6 text-5xl lg:text-7xl">{brandName} access</h1>
				<p className="mt-6 max-w-2xl text-base text-[var(--color-cream-muted)]">
					Early-stage paths into the product — waitlist, demo, and early access. Not live self-serve billing.
				</p>
			</section>

			<section className="pb-24">
				<div className="mx-auto grid max-w-[1500px] gap-6 px-6 lg:grid-cols-3 lg:px-10">
					{pricingTiers.map((tier) => (
						<div
							key={tier.name}
							className="flex flex-col border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-8"
						>
							<h2 className="heading-display text-2xl text-[var(--color-cream)]">{tier.name}</h2>
							<p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-copper)]">
								{tier.price}
							</p>
							<p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{tier.description}
							</p>
							<ul className="mt-6 space-y-2">
								{tier.highlights.map((item) => (
									<li key={item} className="text-xs uppercase tracking-[0.14em] text-[var(--color-cream-dim)]">
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
			</section>
		</main>
	);
}
