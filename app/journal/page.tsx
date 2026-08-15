import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Journal' };

const posts = [
	{
		title: 'Saturday rush in Ikole',
		body: 'The chair does not need another reminder ping. It needs the 11am client to show, and the 11:30 to wait outside instead of standing over the fade in progress.',
	},
	{
		title: 'What “low cut” means in three different mouths',
		body: 'One man wants skin. One wants a #2. One wants what his cousin posted. Ask before the motor starts. The argument after the cape is always more expensive.',
	},
	{
		title: 'Why shops still write names in a book',
		body: 'Paper does not drop signal. A book that the apprentice can read at 7am still beats a chat that buried the booking under stickers.',
	},
];

export default function JournalPage() {
	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[720px] px-6 pt-32 pb-20 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Journal
				</p>
				<h1 className="heading-display mt-6 text-5xl leading-[0.95]">
					Shop notes
				</h1>
				<ul className="mt-16 space-y-14">
					{posts.map((post) => (
						<li key={post.title} className="border-t border-[var(--color-line)] pt-8">
							<h2 className="font-display text-3xl">{post.title}</h2>
							<p className="mt-4 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{post.body}
							</p>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
