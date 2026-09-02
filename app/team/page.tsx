import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const liveUrl = 'https://ktrail-style.vercel.app';

export const metadata: Metadata = {
	title: 'Team',
	description:
		'The founding team behind KTrail OS — Taiye Babatunde and Babatunde Olaleye at K-TRAIL HAIRCUT SERVICES (CAC 9200929).',
	alternates: { canonical: '/team' },
	openGraph: {
		title: 'Team — KTrail',
		description:
			'Meet the people shipping KTrail OS for multi-chair Nigerian barbershops. LinkedIn profiles and company registration are public.',
		url: `${liveUrl}/team`,
	},
};

export default function TeamPage() {
	const { team, legalName, brandName, cacNumber, address, natureOfBusiness } = siteConfig;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${liveUrl}/#org`,
				name: legalName,
				alternateName: brandName,
				url: liveUrl,
				identifier: cacNumber,
				foundingDate: String(siteConfig.foundedYear),
				address: {
					'@type': 'PostalAddress',
					streetAddress: address,
					addressCountry: 'NG',
				},
				founder: team.map((member) => ({
					'@type': 'Person',
					name: member.name,
					jobTitle: member.role,
					sameAs: member.linkedin,
					url: `${liveUrl}/team#${member.name.toLowerCase().replace(/\s+/g, '-')}`,
				})),
			},
			...team.map((member) => ({
				'@type': 'Person',
				'@id': `${liveUrl}/team#${member.name.toLowerCase().replace(/\s+/g, '-')}`,
				name: member.name,
				jobTitle: member.role,
				description: member.bio,
				sameAs: [member.linkedin],
				worksFor: { '@id': `${liveUrl}/#org` },
				url: `${liveUrl}/team`,
			})),
		],
	};

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<section className="mx-auto max-w-[1100px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Team
				</p>
				<h1 className="heading-display mt-6 text-[2.2rem] leading-tight sm:text-5xl lg:text-7xl">
					The people behind {brandName}
				</h1>
				<p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					KTrail OS is built by a named founding team at {legalName}. This page is public so reviewers,
					shops, and Google can see who operates the product.
				</p>
			</section>

			<section className="border-y border-[var(--color-line)] bg-[var(--color-bg-deep)]">
				<div className="mx-auto grid max-w-[1100px] gap-8 px-6 py-12 sm:grid-cols-2 lg:px-10">
					<div>
						<p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
							Legal entity
						</p>
						<p className="mt-2 text-lg font-semibold">{legalName}</p>
						<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
							CAC {cacNumber} · {natureOfBusiness}
						</p>
					</div>
					<div>
						<p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
							Registered office
						</p>
						<p className="mt-2 text-sm leading-relaxed text-[var(--color-cream-muted)]">{address}</p>
						<p className="mt-2 text-sm text-[var(--color-cream-muted)]">Founded {siteConfig.foundedYear}</p>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-[1100px] px-6 py-16 lg:px-10">
				<ul className="grid gap-8 lg:grid-cols-2">
					{team.map((member) => {
						const initials = member.name
							.split(' ')
							.map((part) => part[0])
							.join('')
							.slice(0, 2);
						const anchor = member.name.toLowerCase().replace(/\s+/g, '-');
						return (
							<li
								id={anchor}
								key={member.name}
								className="card p-8"
							>
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-cobalt)] text-xl font-semibold text-white">
									{initials}
								</div>
								<h2 className="heading-display mt-6 text-2xl">{member.name}</h2>
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
									className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-cobalt)]"
								>
									LinkedIn profile
								</a>
							</li>
						);
					})}
				</ul>

				<div className="mt-12 flex flex-col gap-3 sm:flex-row">
					<Link href="/login" className="btn-primary">
						Log in
					</Link>
					<Link href="/signup" className="btn-secondary">
						Create account
					</Link>
					<Link href="/product" className="inline-flex min-h-11 items-center text-sm font-semibold">
						See the product
					</Link>
				</div>
			</section>
		</main>
	);
}
