'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const navLinks = siteConfig.nav;

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isMobileMenuOpen]);

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-200 ${
					isScrolled
						? 'bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-line)]'
						: 'bg-transparent'
				}`}
			>
				<div className="mx-auto max-w-[1400px] px-6 lg:px-10">
					<div className="flex h-20 items-center justify-between">
						<Link href="/" className="relative z-10">
							<span className="heading-display text-2xl">
								{siteConfig.logo.text}
								<span className="text-[var(--color-cobalt)]">{siteConfig.logo.accent}</span>
							</span>
						</Link>

						<nav className="hidden items-center gap-5 lg:flex xl:gap-8">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="text-sm font-medium text-[var(--color-cream-muted)] hover:text-[var(--color-ink)]"
								>
									{link.label}
								</Link>
							))}
						</nav>

						<div className="flex items-center gap-4">
							<div className="hidden items-center gap-5 lg:flex">
								<Link
									href={siteConfig.hero.secondaryCta.href}
									className="text-sm font-medium text-[var(--color-cream-muted)]"
								>
									{siteConfig.hero.secondaryCta.label}
								</Link>
								<Link
									href={siteConfig.hero.cta.href}
									className="btn-primary px-5 py-2.5 text-sm"
								>
									{siteConfig.hero.cta.label}
								</Link>
							</div>

							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
								aria-label="Toggle menu"
							>
								<motion.span
									animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
									className="block h-[2px] w-6 bg-[var(--color-cream)]"
								/>
								<motion.span
									animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
									className="block h-[2px] w-6 bg-[var(--color-cream)]"
								/>
								<motion.span
									animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
									className="block h-[2px] w-6 bg-[var(--color-cream)]"
								/>
							</button>
						</div>
					</div>
				</div>
			</header>

			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-40 bg-[var(--color-bg)]"
					>
						<div className="flex h-full flex-col items-center justify-center gap-8 px-6">
							{navLinks.map((link, i) => (
								<motion.div
									key={link.href}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.1 + 0.2 }}
								>
									<Link
										href={link.href}
										onClick={() => setIsMobileMenuOpen(false)}
										className="heading-display text-5xl text-[var(--color-cream)] transition-colors hover:text-[var(--color-gold)]"
									>
										{link.label}
									</Link>
								</motion.div>
							))}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: navLinks.length * 0.08 + 0.2 }}
								className="mt-4 flex flex-col items-center gap-4"
							>
								<Link
									href={siteConfig.hero.cta.href}
									onClick={() => setIsMobileMenuOpen(false)}
									className="rounded-full bg-[var(--color-gold)] px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-gold-bright)]"
								>
									{siteConfig.hero.cta.label}
								</Link>
								<Link
									href={siteConfig.hero.secondaryCta.href}
									onClick={() => setIsMobileMenuOpen(false)}
									className="text-sm font-medium text-[var(--color-cream-muted)] hover:text-[var(--color-gold)]"
								>
									{siteConfig.hero.secondaryCta.label}
								</Link>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
