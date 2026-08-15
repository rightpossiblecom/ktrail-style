import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'How it works' };

const steps = [
	{
		n: '01',
		title: 'Pick the chair',
		body: 'Choose the barber and the hour. No more “I dey come” in a group chat that already has twelve unread cuts.',
	},
	{
		n: '02',
		title: 'Show the cut',
		body: 'A photo or a name the shop already knows. The chair sees it before you sit. That is the whole point of a preview.',
	},
	{
		n: '03',
		title: 'Sit down',
		body: 'You arrive. The cape goes on. The cut matches what you booked — or you talk before the first clip, not after.',
	},
];

export default function HowItWorksPage() {
	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					How it works
				</p>
				<h1 className="heading-display mt-6 text-5xl leading-[0.95] lg:text-7xl">
					Book. Preview. Sit.
				</h1>
			</section>
			<section className="border-t border-[var(--color-line)] py-20">
				<div className="mx-auto grid max-w-[1500px] gap-12 px-6 lg:grid-cols-3 lg:px-10">
					{steps.map((step) => (
						<article key={step.n}>
							<p className="text-[0.65rem] uppercase tracking-[0.32em] text-[var(--color-copper)]">
								{step.n}
							</p>
							<h2 className="mt-4 font-display text-3xl">{step.title}</h2>
							<p className="mt-4 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{step.body}
							</p>
						</article>
					))}
				</div>
				<div className="mx-auto max-w-[1500px] px-6 pt-12 lg:px-10">
					<Link
						href="/login"
						className="inline-flex rounded-full bg-[var(--color-gold)] px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg)]"
					>
						Log in
					</Link>
				</div>
			</section>
		</main>
	);
}
