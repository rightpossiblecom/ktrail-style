'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';

export function FaqAccordion() {
	const { faq } = siteConfig;
	const [open, setOpen] = useState<number | null>(0);

	return (
		<section className="bg-[var(--color-bg)] py-20 lg:py-28">
			<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
				<div className="border-b border-[var(--color-line)] pb-8">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						FAQ
					</p>
					<h2 className="heading-display mt-4 text-3xl text-[var(--color-cream)] lg:text-5xl">
						Straight answers
					</h2>
				</div>
				<ul className="mt-10 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
					{faq.map((item, i) => {
						const isOpen = open === i;
						return (
							<li key={item.q}>
								<button
									type="button"
									onClick={() => setOpen(isOpen ? null : i)}
									className="flex w-full items-start justify-between gap-6 py-6 text-left"
								>
									<span className="heading-display text-lg text-[var(--color-cream)] lg:text-xl">
										{item.q}
									</span>
									<span className="mt-1 text-[var(--color-copper)]">{isOpen ? '−' : '+'}</span>
								</button>
								{isOpen && (
									<p className="pb-6 pr-10 text-sm leading-relaxed text-[var(--color-cream-muted)]">
										{item.a}
									</p>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
