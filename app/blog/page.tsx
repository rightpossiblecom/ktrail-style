import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
	title: 'Blog',
	description: siteConfig.blogPage.body,
};

export default function BlogPage() {
	const { blogPage, blogPosts } = siteConfig;

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					{blogPage.eyebrow}
				</p>
				<h1 className="heading-display mt-6 text-5xl leading-[0.95] lg:text-7xl">
					<span className="block">{blogPage.heading[0]}</span>
					<span className="block">
						{blogPage.heading[1]}{' '}
						<span className="heading-display-italic text-[var(--color-copper)]">
							{blogPage.headingAccent}
						</span>
					</span>
				</h1>
				<p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					{blogPage.body}
				</p>
			</section>

			<section className="border-t border-[var(--color-line)] pb-24">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<ul className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
						{blogPosts.map((post) => (
							<li key={post.slug}>
								<Link
									href={`/blog/${post.slug}`}
									className="group grid gap-4 py-10 lg:grid-cols-12 lg:items-baseline"
								>
									<p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-cream-dim)] lg:col-span-3">
										{post.date}
									</p>
									<div className="lg:col-span-9">
										<h2 className="heading-display text-2xl text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-copper)] lg:text-3xl">
											{post.title}
										</h2>
										<p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-cream-muted)]">
											{post.excerpt}
										</p>
										<span className="link-underline mt-5 inline-block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]">
											Read
										</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
}
