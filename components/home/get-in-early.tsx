import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function GetInEarly() {
	const { getInEarly } = siteConfig;

	return (
		<section className="bg-[var(--color-bg-deep)] py-20 lg:py-24">
			<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
				<div className="border-b border-[var(--color-line)] pb-8">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						{getInEarly.eyebrow}
					</p>
					<h2 className="heading-display mt-4 text-3xl text-[var(--color-cream)] lg:text-4xl">
						{getInEarly.heading}
					</h2>
				</div>
				<div className="mt-12 grid gap-6 lg:grid-cols-3">
					{getInEarly.cards.map((card, i) => (
						<div key={card.title} className="border border-[var(--color-line)] p-8">
							<span className="heading-display text-2xl text-[var(--color-copper)]">
								{String(i + 1).padStart(2, '0')}
							</span>
							<h3 className="heading-display mt-4 text-xl text-[var(--color-cream)]">
								{card.title}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{card.body}
							</p>
							<Link
								href={card.cta.href}
								className="link-underline mt-6 inline-block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]"
							>
								{card.cta.label}
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
