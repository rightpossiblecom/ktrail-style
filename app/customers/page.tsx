import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
	title: 'Customers',
	description: siteConfig.customersPage.body,
};

export default function CustomersPage() {
	const { customersPage, testimonials, hero } = siteConfig;
	const [featured, ...rest] = testimonials;

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					{customersPage.eyebrow}
				</p>
				<h1 className="heading-display mt-6 text-5xl leading-[0.95] lg:text-7xl">
					<span className="block">{customersPage.heading[0]}</span>
					<span className="block">
						{customersPage.heading[1]}{' '}
						<span className="heading-display-italic text-[var(--color-copper)]">
							{customersPage.headingAccent}
						</span>
					</span>
				</h1>
				<p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					{customersPage.body}
				</p>
			</section>

			{featured && (
				<section className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-20">
					<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
						<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
							01 / {String(testimonials.length).padStart(2, '0')}
						</p>
						<blockquote className="mt-10 max-w-4xl">
							<p className="heading-display-italic text-3xl leading-[1.15] text-[var(--color-cream)] lg:text-5xl">
								&ldquo;{featured.quote}&rdquo;
							</p>
							<footer className="mt-10 border-t border-[var(--color-line-strong)] pt-6">
								<cite className="not-italic text-base font-medium text-[var(--color-cream)]">
									{featured.author}
								</cite>
								<p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[var(--color-cream-muted)]">
									{featured.role}
								</p>
							</footer>
						</blockquote>
					</div>
				</section>
			)}

			<section className="py-20">
				<div className="mx-auto grid max-w-[1500px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-2 lg:px-10">
					{rest.map((item) => (
						<figure
							key={item.author}
							className="flex flex-col border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-8"
						>
							<blockquote className="flex-1 text-lg leading-relaxed text-[var(--color-cream)]">
								&ldquo;{item.quote}&rdquo;
							</blockquote>
							<figcaption className="mt-8 border-t border-[var(--color-line)] pt-5">
								<p className="text-sm font-medium text-[var(--color-cream)]">{item.author}</p>
								<p className="mt-1 text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-copper)]">
									{item.role}
								</p>
							</figcaption>
						</figure>
					))}
				</div>
			</section>

			<section className="border-t border-[var(--color-line)] py-16">
				<div className="mx-auto flex max-w-[1500px] flex-wrap gap-4 px-6 lg:px-10">
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
				</div>
			</section>
		</main>
	);
}
