import Link from 'next/link';
import { CommandPreview } from '@/components/product/CommandPreview';
import { siteConfig } from '@/config/site';

export function Hero() {
	const { hero } = siteConfig;

	return (
		<section id="hero" className="relative overflow-hidden bg-[var(--color-bg)]">
			<div className="mx-auto max-w-[1200px] px-4 pt-24 pb-12 sm:px-6 lg:px-10 lg:pt-36 lg:pb-24">
				<div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
					<div>
						<p className="kicker">{hero.subtitle}</p>
						<h1 className="heading-display mt-4 text-[2.4rem] leading-[1.05] sm:text-6xl lg:text-7xl">
							{hero.heading[0]} {hero.heading[1]}{' '}
							<span className="text-[var(--color-cobalt)]">{hero.headingAccent}</span>
						</h1>
						<p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-cream-muted)] sm:text-lg">
							{hero.body}
						</p>
						<div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
							<Link href={hero.cta.href} className="btn-primary w-full sm:w-auto">
								{hero.cta.label}
							</Link>
							<Link href={hero.secondaryCta.href} className="btn-secondary w-full sm:w-auto">
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
