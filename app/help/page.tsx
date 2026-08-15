import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
	title: 'Help',
	description: siteConfig.helpPage.body,
};

export default function HelpPage() {
	const { helpPage, faq, supportEmail, hero } = siteConfig;

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					{helpPage.eyebrow}
				</p>
				<h1 className="heading-display mt-6 text-5xl leading-[0.95] lg:text-7xl">
					<span className="block">{helpPage.heading[0]}</span>
					<span className="block">
						{helpPage.heading[1]}{' '}
						<span className="heading-display-italic text-[var(--color-copper)]">
							{helpPage.headingAccent}
						</span>
					</span>
				</h1>
				<p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					{helpPage.body}
				</p>
			</section>

			<section className="border-t border-[var(--color-line)] pb-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<dl className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
						{faq.map((item) => (
							<div key={item.q} className="grid gap-4 py-8 lg:grid-cols-12">
								<dt className="heading-display text-xl text-[var(--color-cream)] lg:col-span-5">
									{item.q}
								</dt>
								<dd className="text-sm leading-relaxed text-[var(--color-cream-muted)] lg:col-span-7">
									{item.a}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			<section className="border-t border-[var(--color-line)] bg-[var(--color-bg-deep)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Still stuck
					</p>
					<p className="mt-4 max-w-xl text-sm text-[var(--color-cream-muted)]">
						Write{' '}
						<a href={`mailto:${supportEmail}`} className="text-[var(--color-copper)] hover:underline">
							{supportEmail}
						</a>{' '}
						or book a walkthrough if you want a guided look at the dashboard.
					</p>
					<div className="mt-8 flex flex-wrap gap-4">
						<Link
							href={hero.cta.href}
							className="rounded-full bg-[var(--color-copper)] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg-deep)]"
						>
							{hero.cta.label}
						</Link>
						<Link
							href={hero.secondaryCta.href}
							className="link-underline text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]"
						>
							{hero.secondaryCta.label}
						</Link>
						<Link
							href="/demo"
							className="link-underline text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]"
						>
							Book a walkthrough
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
