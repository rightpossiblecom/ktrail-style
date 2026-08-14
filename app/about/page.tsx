import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function AboutPage() {
	const { about, mission, legalName, cacNumber, address, brandName } = siteConfig;

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-20 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					{about.heroSubtitle}
				</p>
				<h1 className="heading-display mt-6 text-5xl leading-[0.95] lg:text-7xl">
					<span className="block">{about.heroHeading[0]}</span>
					<span className="block">
						{about.heroHeading[1]}{' '}
						<span className="heading-display-italic text-[var(--color-copper)]">
							{about.heroHeadingAccent}
						</span>
					</span>
				</h1>
				<p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					{about.heroBody}
				</p>
			</section>

			<section className="border-t border-[var(--color-line)] bg-[var(--color-bg-deep)] py-20">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Story
					</p>
					<div className="mt-10 grid gap-10 lg:grid-cols-2">
						{about.storyParagraphs.map((paragraph) => (
							<p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-[var(--color-cream-muted)]">
								{paragraph}
							</p>
						))}
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Mission
					</p>
					<p className="heading-display mt-6 max-w-3xl text-2xl text-[var(--color-cream)] lg:text-4xl">
						{mission}
					</p>
					<div className="mt-12 border border-[var(--color-line)] p-8 text-sm text-[var(--color-cream-muted)]">
						<p className="font-medium text-[var(--color-cream)]">{legalName}</p>
						<p className="mt-2">CAC {cacNumber} · {siteConfig.natureOfBusiness}</p>
						<p className="mt-2">{address}</p>
						<p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--color-cream-dim)]">
							Product brand: {brandName} · Proof on{' '}
							<Link href="/product" className="text-[var(--color-copper)] hover:underline">
								/product
							</Link>
						</p>
					</div>
					<div className="mt-10 flex flex-wrap gap-4">
						<Link
							href="/login"
							className="rounded-full bg-[var(--color-copper)] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg-deep)]"
						>
							Log in
						</Link>
						<Link
							href="/signup"
							className="link-underline text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]"
						>
							Create account
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
