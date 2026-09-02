import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Founders() {
	const { team, legalName, cacNumber } = siteConfig;

	return (
		<section id="team" className="bg-[var(--color-bg)] py-20 lg:py-28">
			<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
				<div className="border-b border-[var(--color-line)] pb-8">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Founders
					</p>
					<h2 className="heading-display mt-4 text-3xl text-[var(--color-cream)] lg:text-5xl">
						Who is shipping this
					</h2>
					<p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-cream-muted)]">
						{legalName}, CAC {cacNumber}. Named operators, public LinkedIn, full bios on{' '}
						<Link href="/team" className="text-[var(--color-cobalt)]">
							/team
						</Link>
						.
					</p>
				</div>
				<div className="mt-12 grid gap-8 lg:grid-cols-2">
					{team.map((member) => (
						<article key={member.name} className="border-t border-[var(--color-copper)]/50 pt-6">
							<h3 className="heading-display text-xl">{member.name}</h3>
							<p className="mt-2 text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-copper)]">
								{member.role}
							</p>
							<p className="mt-3 text-sm leading-relaxed text-[var(--color-cream-muted)]">{member.bio}</p>
							<a
								href={member.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-cobalt)]"
							>
								LinkedIn
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
