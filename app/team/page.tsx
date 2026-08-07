import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function TeamPage() {
	const { team, legalName, brandName } = siteConfig;

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-20 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Team
				</p>
				<h1 className="heading-display mt-6 text-5xl lg:text-7xl">The people behind {brandName}</h1>
				<p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					Operated by {legalName}. The founding team shipping multi-barber booking and AI style
					previews for Nigerian shops.
				</p>

				<ul className="mt-16 grid gap-8 lg:grid-cols-2">
					{team.map((member) => (
						<li key={member.name} className="border border-[var(--color-line)] p-8">
							<h2 className="heading-display text-2xl text-[var(--color-cream)]">{member.name}</h2>
							<p className="mt-2 text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-copper)]">
								{member.role}
							</p>
							<p className="mt-4 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{member.bio}
							</p>
							<a
								href={member.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="link-underline mt-6 inline-block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]"
							>
								LinkedIn
							</a>
						</li>
					))}
				</ul>

				<div className="mt-12">
					<Link
						href="/demo"
						className="inline-flex rounded-full bg-[var(--color-copper)] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg-deep)]"
					>
						Request demo
					</Link>
				</div>
			</section>
		</main>
	);
}
