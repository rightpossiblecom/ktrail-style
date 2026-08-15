import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
	title: 'Resources',
	description: siteConfig.resourcesPage.body,
};

export default function ResourcesPage() {
	const { resourcesPage } = siteConfig;

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					{resourcesPage.eyebrow}
				</p>
				<h1 className="heading-display mt-6 text-5xl leading-[0.95] lg:text-7xl">
					<span className="block">{resourcesPage.heading[0]}</span>
					<span className="block">
						{resourcesPage.heading[1]}{' '}
						<span className="heading-display-italic text-[var(--color-copper)]">
							{resourcesPage.headingAccent}
						</span>
					</span>
				</h1>
				<p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					{resourcesPage.body}
				</p>
			</section>

			<section className="border-t border-[var(--color-line)] pb-24">
				<div className="mx-auto grid max-w-[1500px] gap-px bg-[var(--color-line)] px-0 sm:grid-cols-2 lg:grid-cols-3">
					{resourcesPage.hub.map((card) => (
						<Link
							key={card.href}
							href={card.href}
							className="group flex flex-col bg-[var(--color-bg)] p-8 transition-colors hover:bg-[var(--color-bg-deep)] lg:p-10"
						>
							<p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[var(--color-copper)]">
								{card.label}
							</p>
							<p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{card.blurb}
							</p>
							<span className="link-underline mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)] group-hover:text-[var(--color-copper)]">
								Open
							</span>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
