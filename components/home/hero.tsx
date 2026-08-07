import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Hero() {
	const { hero, brandName } = siteConfig;

	return (
		<section id="hero" className="relative overflow-hidden bg-[var(--color-bg)]">
			<div className="absolute top-0 left-0 right-0 h-px bg-[var(--color-copper)]/60" />

			<div className="relative mx-auto max-w-[1500px] px-6 pt-28 pb-16 lg:px-10 lg:pt-36 lg:pb-24">
				<div className="flex items-center justify-between border-b border-[var(--color-line)] pb-6 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-cream-dim)]">
					<span>{hero.metaLeft}</span>
					<span className="hidden sm:inline">{hero.metaCenter}</span>
					<span>{new Date().getFullYear()}</span>
				</div>

				<div className="mt-10 grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
					<div className="relative lg:col-span-5">
						<div
							className="image-placeholder relative h-[60vh] w-full overflow-hidden lg:h-[78vh]"
							style={{
								backgroundImage: `url('/images/hero/hero-portrait.jpg')`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						>
							<div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-[var(--color-bg-deep)]/90 to-transparent p-5">
								<div className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-[var(--color-cream-muted)]">
									{brandName}
									<br />
									<span className="text-[var(--color-cream)]">{hero.imageCaption}</span>
								</div>
								<div className="rounded-full border border-[var(--color-copper)]/60 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-copper)]">
									KTS
								</div>
							</div>
						</div>
					</div>

					<div className="relative flex flex-col justify-between lg:col-span-7">
						<div>
							<p
								className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)] animate-fade-up"
								style={{ animationDelay: '0.1s' }}
							>
								{hero.subtitle}
							</p>

							<h1
								className="heading-display mt-8 text-[3.5rem] leading-[0.92] text-[var(--color-cream)] animate-fade-up sm:text-7xl lg:text-[7rem]"
								style={{ animationDelay: '0.2s' }}
							>
								<span className="block">{hero.heading[0]}</span>
								<span className="block pl-[8%]">{hero.heading[1]}</span>
								<span className="heading-display-italic block pl-[4%] text-[var(--color-copper)]">
									{hero.headingAccent}
								</span>
							</h1>

							<p
								className="mt-10 max-w-md text-base leading-relaxed text-[var(--color-cream-muted)] animate-fade-up"
								style={{ animationDelay: '0.35s' }}
							>
								{hero.body}
							</p>

							<div
								className="mt-10 flex flex-wrap items-center gap-6 animate-fade-up"
								style={{ animationDelay: '0.5s' }}
							>
								<Link
									href={hero.cta.href}
									className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-copper)] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg-deep)] transition-all hover:bg-[var(--color-copper-bright)]"
								>
									{hero.cta.label}
									<svg
										className="h-4 w-4 transition-transform group-hover:translate-x-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</Link>
								<Link
									href={hero.secondaryCta.href}
									className="link-underline text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]"
								>
									{hero.secondaryCta.label}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="pointer-events-none absolute -bottom-8 left-0 right-0 select-none overflow-hidden">
				<span className="block whitespace-nowrap font-display text-[12rem] font-black leading-none tracking-tighter text-[var(--color-cream)] opacity-[0.025] lg:text-[20rem]">
					{hero.backgroundText}
				</span>
			</div>
		</section>
	);
}
