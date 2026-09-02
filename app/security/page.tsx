import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
	title: 'Security',
	description: siteConfig.securityPage.body,
};

export default function SecurityPage() {
	const { securityPage, legalName, cacNumber } = siteConfig;

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					{securityPage.eyebrow}
				</p>
				<h1 className="heading-display mt-6 text-5xl leading-[0.95] lg:text-7xl">
					<span className="block">{securityPage.heading[0]}</span>
					<span className="block">
						{securityPage.heading[1]}{' '}
						<span className="heading-display-italic text-[var(--color-copper)]">
							{securityPage.headingAccent}
						</span>
					</span>
				</h1>
				<p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					{securityPage.body}
				</p>
				<p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-cream-muted)]">
					{securityPage.intro}
				</p>
			</section>

			<section className="border-t border-[var(--color-line)] bg-[var(--color-bg-deep)] py-16">
				<div className="mx-auto grid max-w-[1500px] gap-8 px-6 lg:grid-cols-2 lg:px-10">
					{securityPage.columns.map((column) => (
						<div key={column.title} className="border-t border-[var(--color-copper)]/50 pt-6">
							<h2 className="heading-display text-2xl text-[var(--color-cream)]">{column.title}</h2>
							<p className="mt-4 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{column.body}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className="py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<ol className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
						{securityPage.sections.map((section, i) => (
							<li key={section.title} className="grid gap-4 py-10 lg:grid-cols-12">
								<span className="heading-display text-xl text-[var(--color-copper)] lg:col-span-2">
									{String(i + 1).padStart(2, '0')}
								</span>
								<h2 className="heading-display text-xl text-[var(--color-cream)] lg:col-span-3">
									{section.title}
								</h2>
								<p className="text-sm leading-relaxed text-[var(--color-cream-muted)] lg:col-span-7">
									{section.body}
								</p>
							</li>
						))}
					</ol>
					<div className="mt-12 border border-[var(--color-line)] p-8 text-sm text-[var(--color-cream-muted)]">
						<p className="font-medium text-[var(--color-cream)]">{legalName}</p>
						<p className="mt-2">CAC {cacNumber}</p>
						<p className="mt-2">
							<Link href="/team" className="text-[var(--color-copper)] hover:underline">
								/team
							</Link>
						</p>
						<div className="mt-6 flex flex-wrap gap-6">
							<Link
								href="/privacy"
								className="link-underline text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]"
							>
								Privacy
							</Link>
							<Link
								href="/terms"
								className="link-underline text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]"
							>
								Terms
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
