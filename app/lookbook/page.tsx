import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Lookbook' };

const cuts = [
	{ name: 'Low skin fade', note: 'Clean temple, soft blend. The weekday cut that still photographs.' },
	{ name: 'Taper with a hard part', note: 'Line work that holds through a humid Ikole afternoon.' },
	{ name: 'Afro shape-up', note: 'Outline first. The chair talks before the clippers eat the crown.' },
	{ name: 'Waves + sponge', note: 'For clients who already have the pattern — we do not invent waves in one sit.' },
	{ name: 'Beard sculpt', note: 'Cheek line and neck. Same barber who did the fade, not a second stall.' },
	{ name: 'Kids first cut', note: 'Short, even, no surprise designs unless the parent said so out loud.' },
];

export default function LookbookPage() {
	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Lookbook
				</p>
				<h1 className="heading-display mt-6 text-5xl leading-[0.95] lg:text-7xl">
					Cuts the chair already knows
				</h1>
				<p className="mt-8 max-w-xl text-base text-[var(--color-cream-muted)]">
					Names we use in the shop. Not a gallery of the app.
				</p>
			</section>
			<section className="border-t border-[var(--color-line)] py-20">
				<div className="mx-auto grid max-w-[1500px] gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
					{cuts.map((cut) => (
						<article key={cut.name} className="border border-[var(--color-line)] p-8">
							<h2 className="font-display text-2xl">{cut.name}</h2>
							<p className="mt-3 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{cut.note}
							</p>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}
