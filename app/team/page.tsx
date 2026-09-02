import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
	title: 'Team',
	description: `The people behind ${siteConfig.brandName}: ${siteConfig.team
		.map((member) => `${member.name}, ${member.role}, ${member.linkedin}`)
		.join('; ')}. ${siteConfig.legalName}, CAC ${siteConfig.cacNumber}.`,
};

function splitName(name: string) {
	const parts = name.split(' ');
	return { first: parts[0] ?? name, rest: parts.slice(1).join(' ') };
}

export default function TeamPage() {
	const { team, legalName, brandName, cacNumber, address, natureOfBusiness } = siteConfig;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: brandName,
		legalName,
		foundingDate: String(siteConfig.foundedYear),
		identifier: [{ '@type': 'PropertyValue', name: 'CAC', value: cacNumber }],
		sameAs: team.map((member) => member.linkedin),
		founder: team.map((member) => ({
			'@type': 'Person',
			name: member.name,
			jobTitle: member.role,
			description: member.bio,
			image: member.photo,
			sameAs: member.linkedin,
			worksFor: {
				'@type': 'Organization',
				name: brandName,
				legalName,
			},
		})),
	};

	const facts = [
		{ label: 'Legal name', value: legalName },
		{ label: 'Product', value: brandName },
		{ label: 'CAC', value: cacNumber },
		{ label: 'Trade', value: natureOfBusiness },
		{ label: 'Founded', value: String(siteConfig.foundedYear) },
		{ label: 'Office', value: address },
	];

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<main className="bg-[var(--color-bg)] text-[var(--color-ink)]">
				<section className="relative overflow-hidden px-6 pt-28 pb-16 sm:pt-32 lg:px-10 lg:pt-40 lg:pb-24">
					<p className="kicker">The desk · two chairs</p>
					<h1 className="heading-display relative z-10 mt-5 max-w-[14ch] text-[clamp(3rem,9vw,8rem)] leading-[0.86]">
						The shop
						<br />
						door has
						<br />
						<span className="text-[var(--color-cobalt)]">two names.</span>
					</h1>
					<p className="relative z-10 mt-8 max-w-md text-base leading-relaxed text-[var(--color-cream-muted)] sm:text-lg">
						KTrail turns a WhatsApp request into a booked, paid chair. Taiye and Babatunde run that
						desk from Ikole-Ekiti and Lagos.
					</p>
					<p
						aria-hidden
						className="pointer-events-none absolute -right-6 top-20 heading-display text-[42vw] leading-none text-[var(--color-cobalt)]/10 select-none lg:top-16 lg:text-[28vw]"
					>
						02
					</p>
					<div className="relative z-10 mt-12 flex items-center gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
						<span>01 Taiye</span>
						<span className="h-px flex-1 max-w-24 bg-[var(--color-line-strong)]" />
						<span>02 Babatunde</span>
					</div>
				</section>

				{team.map((member, index) => {
					const { first, rest } = splitName(member.name);
					const ink = index % 2 === 0;
					return (
						<article
							key={member.name}
							itemScope
							itemType="https://schema.org/Person"
							className={`grid min-h-[92svh] lg:grid-cols-12 ${
								ink ? 'bg-[#111318] text-[#f4efe6]' : 'bg-[var(--color-bg)] text-[var(--color-ink)]'
							}`}
						>
							<figure
								className={`relative min-h-[72vh] overflow-hidden lg:col-span-7 lg:min-h-[92svh] ${
									ink ? '' : 'lg:order-2'
								}`}
							>
								<img
									src={member.photo}
									alt={member.name}
									itemProp="image"
									className="absolute inset-0 h-full w-full object-cover object-top"
								/>
								<div
									aria-hidden
									className={`absolute inset-0 ${
										ink
											? 'bg-gradient-to-t from-[#111318]/70 via-transparent to-transparent'
											: 'bg-gradient-to-t from-[var(--color-bg)]/50 via-transparent to-transparent lg:bg-gradient-to-l lg:from-[#111318]/25 lg:via-transparent'
									}`}
								/>
								<span
									aria-hidden
									className="absolute left-5 top-6 heading-display text-[clamp(4.5rem,12vw,9rem)] leading-none text-white/25 mix-blend-overlay"
								>
									0{index + 1}
								</span>
								<p className="writing-vertical absolute right-5 top-8 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/80">
									{member.role}
								</p>
							</figure>

							<div
								className={`flex flex-col justify-between gap-10 px-6 py-12 sm:px-10 lg:col-span-5 lg:px-12 lg:py-16 xl:px-16 ${
									ink ? '' : 'bg-[#111318] text-[#f4efe6]'
								}`}
							>
								<div>
									<p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-cobalt-bright)]">
										Chair {String(index + 1).padStart(2, '0')} · {member.role}
									</p>
									<h2 className="heading-display mt-5 leading-[0.88]" itemProp="name">
										<span className="block text-[clamp(3rem,6vw,5.4rem)]">{first}</span>
										{rest ? (
											<span className="mt-1 block text-[clamp(2.2rem,4.4vw,3.6rem)] text-[var(--color-cobalt-bright)]">
												{rest}
											</span>
										) : null}
									</h2>
									<p className="sr-only" itemProp="jobTitle">
										{member.role}
									</p>
									<p className="mt-8">
										<a
											href={member.linkedin}
											itemProp="sameAs"
											className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-cobalt)] px-7 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-[var(--ease-out)] hover:bg-[var(--color-cobalt-bright)] active:scale-[0.97]"
										>
											click to view linkedin profile
										</a>
										<a
											href={member.linkedin}
											className="mt-3 block truncate text-sm text-[var(--color-cobalt-bright)] underline decoration-white/20 underline-offset-4"
										>
											{member.linkedin}
										</a>
									</p>
								</div>

								<p
									className="max-w-sm text-[0.95rem] leading-relaxed text-white/70"
									itemProp="description"
								>
									{member.bio}
								</p>
							</div>
						</article>
					);
				})}

				<section className="border-y border-[var(--color-line)] bg-[var(--color-bg-deep)]">
					<div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
						<div className="flex items-end justify-between gap-6">
							<div>
								<p className="kicker">Shop papers</p>
								<h2 className="heading-display mt-3 text-3xl sm:text-4xl">The legal desk</h2>
							</div>
							<p className="hidden max-w-xs text-right text-sm text-[var(--color-cream-muted)] sm:block">
								Registered in Ekiti. Built for chairs in Lagos first.
							</p>
						</div>
						<dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
							{facts.map((fact) => (
								<div key={fact.label} className="bg-[var(--color-bg-deep)] px-5 py-5">
									<dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">
										{fact.label}
									</dt>
									<dd className="mt-2 text-sm font-medium leading-relaxed">{fact.value}</dd>
								</div>
							))}
						</dl>
					</div>
				</section>

				<section className="bg-[var(--color-cobalt)] px-6 py-16 text-white lg:px-10">
					<div className="mx-auto flex max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
						<div>
							<h2 className="heading-display text-4xl sm:text-6xl">Sit at the desk.</h2>
							<p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
								Create a shop account, or log in if you already run chairs.
							</p>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row">
							<Link
								href="/signup"
								className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-[var(--color-cobalt)] transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97]"
							>
								Create account
							</Link>
							<Link
								href="/login"
								className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 text-sm font-semibold text-white transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97]"
							>
								Log in
							</Link>
							<Link
								href="/product"
								className="inline-flex min-h-12 items-center text-sm font-semibold text-white/90"
							>
								See the product
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
