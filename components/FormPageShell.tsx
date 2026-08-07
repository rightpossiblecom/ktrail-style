import type { ReactNode } from 'react';

export function FormPageShell({
	eyebrow,
	title,
	body,
	children,
}: {
	eyebrow: string;
	title: string;
	body: string;
	children: ReactNode;
}) {
	return (
		<main className="bg-[var(--color-bg)] px-6 pt-32 pb-24 text-[var(--color-cream)] lg:px-10 lg:pt-40">
			<div className="mx-auto max-w-xl">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					{eyebrow}
				</p>
				<h1 className="heading-display mt-4 text-4xl lg:text-5xl">{title}</h1>
				<p className="mt-4 text-sm leading-relaxed text-[var(--color-cream-muted)]">{body}</p>
				<div className="mt-10">{children}</div>
			</div>
		</main>
	);
}
