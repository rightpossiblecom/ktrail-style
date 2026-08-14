import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const screenshots = [
	{ src: '/product/shot-dashboard.png', label: 'Overview dashboard' },
	{ src: '/product/shot-preview.png', label: 'Style preview result' },
	{ src: '/product/shot-barbers.png', label: 'Barber network' },
	{ src: '/product/shot-booking.png', label: 'Booking activity' },
];

export default function ProductPage() {
	const { brandName, oneLiner, howItWorks, features, legalName, cacNumber, natureOfBusiness, address } =
		siteConfig;

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Product
				</p>
				<h1 className="heading-display mt-6 text-5xl lg:text-7xl">{brandName}</h1>
				<p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					{oneLiner}
				</p>
			</section>

			{/* Media order lock: video → screenshots → CAC */}
			<section className="border-t border-[var(--color-line)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Demo video
					</p>
					<video
						className="mt-6 aspect-video w-full border border-[var(--color-line)] bg-[var(--color-bg-deep)]"
						controls
						playsInline
						preload="metadata"
						poster="/product/shot-dashboard.png"
					>
						<source src="/product/demo.mp4" type="video/mp4" />
					</video>
				</div>
			</section>

			<section className="py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Screenshots
					</p>
					<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{screenshots.map((shot) => (
							<figure
								key={shot.src}
								className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-4"
							>
								<div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg)]">
									<Image
										src={shot.src}
										alt={shot.label}
										fill
										className="object-cover object-top"
										sizes="(max-width: 1024px) 50vw, 25vw"
									/>
								</div>
								<figcaption className="mt-3 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-cream-muted)]">
									{shot.label}
								</figcaption>
							</figure>
						))}
					</div>
				</div>
			</section>

			<section className="border-y border-[var(--color-line)] bg-[var(--color-bg-deep)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Registration / CAC
					</p>
					<div className="mt-6 grid gap-8 lg:grid-cols-2">
						<div className="relative aspect-[3/4] max-w-md overflow-hidden border border-[var(--color-line)] bg-[var(--color-bg)]">
							<Image
								src="/product/cac-certificate.jpg"
								alt={`${legalName} CAC registration certificate`}
								fill
								className="object-contain object-top p-2"
								sizes="(max-width: 1024px) 100vw, 28rem"
								priority
							/>
						</div>
						<div className="text-sm leading-relaxed text-[var(--color-cream-muted)]">
							<p className="text-base font-medium text-[var(--color-cream)]">{legalName}</p>
							<p className="mt-3">Registration / CAC no.: {cacNumber}</p>
							<p className="mt-2">Nature of business: {natureOfBusiness}</p>
							<p className="mt-2">Principal address: {address}</p>
							<a
								href="/product/cac-certificate.pdf"
								className="mt-6 inline-flex text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-copper)] hover:underline"
							>
								Download certificate PDF
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						How it works
					</p>
					<div className="mt-10 grid gap-8 lg:grid-cols-3">
						{howItWorks.map((step) => (
							<div key={step.step}>
								<span className="heading-display text-2xl text-[var(--color-copper)]">{step.step}</span>
								<h2 className="heading-display mt-4 text-xl text-[var(--color-cream)]">{step.title}</h2>
								<p className="mt-3 text-sm text-[var(--color-cream-muted)]">{step.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="border-t border-[var(--color-line)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Capabilities
					</p>
					<ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((feature) => (
							<li key={feature.title} className="border border-[var(--color-line)] p-6">
								<h3 className="heading-display text-lg text-[var(--color-cream)]">{feature.title}</h3>
								<p className="mt-2 text-sm text-[var(--color-cream-muted)]">{feature.body}</p>
							</li>
						))}
					</ul>
					<div className="mt-12 flex flex-wrap gap-4">
						<Link
							href="/login"
							className="rounded-full bg-[var(--color-copper)] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg-deep)]"
						>
							Log in
						</Link>
						<Link
							href="/signup"
							className="link-underline text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cream)]"
						>
							Create account
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
