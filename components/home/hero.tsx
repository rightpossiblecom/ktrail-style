import Link from 'next/link';
import { CommandPreview } from '@/components/product/CommandPreview';
import { siteConfig } from '@/config/site';

export function Hero() {
	const { hero } = siteConfig;

	return (
		<section id="hero" className="relative overflow-hidden bg-[var(--color-bg)]">
			<div className="mx-auto max-w-[1200px] px-6 pt-28 pb-16 lg:px-10 lg:pt-36 lg:pb-24">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div>
						<p className="kicker">{hero.subtitle}</p>
						<h1 className="heading-display mt-5 text-5xl sm:text-6xl lg:text-7xl">
							{hero.heading[0]} {hero.heading[1]}{' '}
							<span className="text-[var(--color-cobalt)]">{hero.headingAccent}</span>
						</h1>
						<p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-cream-muted)]">
							{hero.body}
						</p>
						<div className="mt-8 flex flex-wrap items-center gap-4">
							<Link href={hero.cta.href} className="btn-primary">
								{hero.cta.label}
							</Link>
							<Link href={hero.secondaryCta.href} className="btn-secondary">
								{hero.secondaryCta.label}
							</Link>
						</div>
					</div>
					<CommandPreview />
				</div>
			</div>
		</section>
	);
}
