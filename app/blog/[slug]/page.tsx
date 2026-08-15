import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';

type BlogParams = { slug: string };

export function generateStaticParams() {
	return siteConfig.blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<BlogParams>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = siteConfig.blogPosts.find((item) => item.slug === slug);
	if (!post) return { title: 'Blog' };
	return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<BlogParams> }) {
	const { slug } = await params;
	const post = siteConfig.blogPosts.find((item) => item.slug === slug);
	if (!post) notFound();

	const others = siteConfig.blogPosts.filter((item) => item.slug !== post.slug);

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<article className="mx-auto max-w-[1500px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					{siteConfig.blogPage.eyebrow}
				</p>
				<p className="mt-4 text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
					{post.date}
				</p>
				<h1 className="heading-display mt-6 max-w-4xl text-4xl leading-[0.95] lg:text-6xl">
					{post.title}
				</h1>
				<p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					{post.excerpt}
				</p>
				<div className="mt-14 max-w-2xl space-y-6 border-t border-[var(--color-line)] pt-12">
					{post.paragraphs.map((paragraph) => (
						<p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-[var(--color-cream-muted)]">
							{paragraph}
						</p>
					))}
				</div>
			</article>

			<section className="border-t border-[var(--color-line)] bg-[var(--color-bg-deep)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						More from the chair
					</p>
					<ul className="mt-8 grid gap-6 lg:grid-cols-2">
						{others.map((item) => (
							<li key={item.slug} className="border border-[var(--color-line)] p-6">
								<Link href={`/blog/${item.slug}`} className="group block">
									<p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
										{item.date}
									</p>
									<h2 className="heading-display mt-3 text-xl text-[var(--color-cream)] group-hover:text-[var(--color-copper)]">
										{item.title}
									</h2>
								</Link>
							</li>
						))}
					</ul>
					<Link
						href="/blog"
						className="link-underline mt-10 inline-block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]"
					>
						All posts
					</Link>
				</div>
			</section>
		</main>
	);
}
