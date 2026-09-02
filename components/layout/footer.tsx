import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
	return (
		<footer className="bg-[var(--color-bg-deep)] text-[var(--color-cream)]">
			<div className="mx-auto max-w-[1400px] px-6 lg:px-10">
				<div className="grid gap-12 border-b border-[var(--color-line)] py-20 md:grid-cols-2 lg:grid-cols-5">
					<div className="lg:col-span-2">
						<Link href="/" className="inline-block">
							<span className="font-display text-3xl font-semibold tracking-tight">
								{siteConfig.logo.text}
								<span className="text-[var(--color-gold)]">{siteConfig.logo.accent}</span>
							</span>
						</Link>
						<p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--color-cream-muted)]">
							{siteConfig.footer.description}
						</p>
						<p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--color-cream-dim)]">
							{siteConfig.legalName} · CAC {siteConfig.cacNumber}
						</p>
					</div>

					<div>
						<h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
							Product
						</h4>
						<ul className="mt-6 space-y-3">
							{siteConfig.footer.productLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-[var(--color-cream)]/75 transition-colors hover:text-[var(--color-gold)]"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
							Resources
						</h4>
						<ul className="mt-6 space-y-3">
							{siteConfig.footer.resourceLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-[var(--color-cream)]/75 transition-colors hover:text-[var(--color-gold)]"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
							Company
						</h4>
						<ul className="mt-6 space-y-3">
							{siteConfig.footer.companyLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-[var(--color-cream)]/75 transition-colors hover:text-[var(--color-gold)]"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
					<p className="text-xs text-[var(--color-cream-dim)]">
						A {siteConfig.legalName} product · {siteConfig.domain}
					</p>
					<p className="text-xs text-[var(--color-cream-dim)]">
						&copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
