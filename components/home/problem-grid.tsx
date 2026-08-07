import { siteConfig } from '@/config/site';

export function ProblemGrid() {
	const { problems } = siteConfig;

	return (
		<section className="bg-[var(--color-bg)] py-20 lg:py-28">
			<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
				<div className="border-b border-[var(--color-line)] pb-8">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						The problem
					</p>
					<h2 className="heading-display mt-4 text-3xl text-[var(--color-cream)] lg:text-5xl">
						Why chairs stay empty
					</h2>
				</div>
				<div className="mt-12 grid gap-0 border border-[var(--color-line)] lg:grid-cols-3">
					{problems.map((problem, i) => (
						<div
							key={problem.title}
							className={`p-8 lg:p-10 ${
								i < problems.length - 1 ? 'border-b border-[var(--color-line)] lg:border-b-0 lg:border-r' : ''
							}`}
						>
							<span className="heading-display text-2xl text-[var(--color-copper)]">
								{String(i + 1).padStart(2, '0')}
							</span>
							<h3 className="heading-display mt-6 text-xl text-[var(--color-cream)]">
								{problem.title}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-[var(--color-cream-muted)]">
								{problem.body}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
