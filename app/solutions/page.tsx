import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
	title: 'Solutions',
	description: siteConfig.solutionsPage.body,
};

export default function SolutionsPage() {
	const { solutionsPage, hero } = siteConfig;

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					{solutionsPage.eyebrow}
				</p>
				<h1 className="heading-display mt-6 text-5xl leading-[0.95] lg:text-7xl">
					<span className="block">{solutionsPage.heading[0]}</span>
					<span className="block">
						{solutionsPage.heading[1]}{' '}
						<span className="heading-display-italic text-[var(--color-copper)]">
							{solutionsPage.headingAccent}
						</span>
					</span>
				</h1>
				<p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					{solutionsPage.body}
				</p>
			</section>

			{solutionsPage.lanes.map((lane, i) => (
				<section
					key={lane.id}
					id={lane.id}
					className={
						i % 2 === 0
							? 'border-t border-[var(--color-line)] bg-[var(--color-bg-deep)] py-20'
							: 'border-t border-[var(--color-line)] py-20'
					}
				>
					<div className="mx-auto grid max-w-[1500px] gap-12 px-6 lg:grid-cols-12 lg:px-10">
						<div className="lg:col-span-5">
							<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
								{lane.kicker}
							</p>
							<h2 className="heading-display mt-4 text-3xl text-[var(--color-cream)] lg:text-4xl">
								{lane.title}
							</h2>
							<p className="mt-5 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{lane.body}
							</p>
						</div>
						<ul className="space-y-4 lg:col-span-6 lg:col-start-7">
							{lane.points.map((point) => (
								<li
									key={point}
									className="border-t border-[var(--color-copper)]/40 pt-4 text-sm leading-relaxed text-[var(--color-cream)]"
								>
									{point}
								</li>
							))}
						</ul>
					</div>
				</section>
			))}

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
