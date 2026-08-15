import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = { title: 'Studio' };

export default function StudioPage() {
	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[720px] px-6 pt-32 pb-24 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Studio
				</p>
				<h1 className="heading-display mt-6 text-5xl leading-[0.95]">
					No 19, Secretariat Near NNPC, Ikole-Ekiti
				</h1>
				<p className="mt-8 text-base leading-relaxed text-[var(--color-cream-muted)]">
					K-TRAIL HAIRCUT SERVICES is a shop with chairs, clippers, and a floor
					that still gets swept twice on Saturday. The gold on the sign is paint.
					The work is hair.
				</p>
				<p className="mt-6 text-base leading-relaxed text-[var(--color-cream-muted)]">
					Come for a cut. The booking layer is how we keep the queue from
					turning into an argument. The studio is the room.
				</p>
				<p className="mt-10 text-xs uppercase tracking-[0.18em] text-[var(--color-cream-dim)]">
					{siteConfig.legalName} · CAC {siteConfig.cacNumber}
				</p>
			</section>
		</main>
	);
}
