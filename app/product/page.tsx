import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
	title: 'Product',
	description: siteConfig.oneLiner,
};

const screenshots = [
	{ src: '/product/shot-dashboard.png', label: 'Overview dashboard', caption: 'Chairs, barbers, and active bookings in one view' },
	{ src: '/product/shot-preview.png', label: 'Style preview result', caption: 'Match hair types and styles to barber specialties' },
	{ src: '/product/shot-barbers.png', label: 'Barber network', caption: 'Track performance, commissions, and chair utilization' },
	{ src: '/product/shot-booking.png', label: 'Booking activity', caption: 'Live schedule and deposit status' },
];

export default function ProductPage() {
	const { oneLiner, howItWorks, features, legalName, cacNumber, natureOfBusiness, address } =
		siteConfig;

	return (
		<main className="bg-[var(--color-bg)] text-[var(--color-cream)]">
			{/* Hero Section */}
			<section className="mx-auto max-w-[1500px] px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Product
				</p>
				<h1 className="heading-display mt-6 text-4xl leading-tight lg:text-6xl font-bold">
					Barbering shouldn't be a WhatsApp puzzle.
				</h1>
				<p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)]">
					KTrail helps 3–10 chair barber shops in Lagos manage bookings, track chairs, and secure deposits. 
					No double-bookings, no untracked cash, and no chaotic chat threads. 
					Build a business that compounds for the next generation.
				</p>
			</section>

			{/* The Problem Section */}
			<section className="border-t border-[var(--color-line)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						The Problem
					</p>
					<h2 className="heading-display mt-4 text-3xl font-bold">
						What is broken about shop management right now
					</h2>
					<div className="mt-10 grid gap-8 md:grid-cols-3">
						<div className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-6 rounded-lg">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-950/50 text-red-400 border border-red-900">
								<span className="font-bold">!</span>
							</div>
							<h3 className="heading-display text-xl font-semibold mt-4">WhatsApp Chaos</h3>
							<p className="mt-2 text-sm text-[var(--color-cream-muted)] leading-relaxed">
								Bookings and schedules are scattered across endless WhatsApp threads. Double-bookings are common, and clients get frustrated waiting.
							</p>
						</div>

						<div className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-6 rounded-lg">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-950/50 text-red-400 border border-red-900">
								<span className="font-bold">!</span>
							</div>
							<h3 className="heading-display text-xl font-semibold mt-4">Untracked Cash</h3>
							<p className="mt-2 text-sm text-[var(--color-cream-muted)] leading-relaxed">
								Cash and bank transfers are unrecorded or mixed with personal accounts. Shop owners can't tell true profitability or track chair performance.
							</p>
						</div>

						<div className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-6 rounded-lg">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-950/50 text-red-400 border border-red-900">
								<span className="font-bold">!</span>
							</div>
							<h3 className="heading-display text-xl font-semibold mt-4">No-Show Losses</h3>
							<p className="mt-2 text-sm text-[var(--color-cream-muted)] leading-relaxed">
								Clients book peak hours but fail to show up. Without a deposit system, chairs sit empty and barbers lose out on earned income.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* The Solution Section */}
			<section className="border-t border-[var(--color-line)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						The Solution
					</p>
					<h2 className="heading-display mt-4 text-3xl font-bold">
						A central shop desk and secure deposits
					</h2>
					<div className="mt-10 grid gap-8 md:grid-cols-2">
						<div className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-8 rounded-lg">
							<h3 className="heading-display text-2xl font-semibold text-[var(--color-copper)]">For Owners: The Shop Desk</h3>
							<p className="mt-3 text-base text-[var(--color-cream-muted)] leading-relaxed">
								A central command center to manage chairs, track barber performance, monitor cash flow, and secure deposits. Keep your books clean and your chairs full.
							</p>
							<ul className="mt-6 space-y-3 text-sm text-[var(--color-cream-muted)]">
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-[var(--color-copper)]" />
									Real-time chair utilization and barber tracking
								</li>
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-[var(--color-copper)]" />
									Automated commission splits and cash flow logs
								</li>
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-[var(--color-copper)]" />
									Secure deposit handling to eliminate no-shows
								</li>
							</ul>
						</div>

						<div className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-8 rounded-lg">
							<h3 className="heading-display text-2xl font-semibold text-[var(--color-copper)]">For Clients: Instant Booking</h3>
							<p className="mt-3 text-base text-[var(--color-cream-muted)] leading-relaxed">
								A clean, public booking page where clients can choose their favorite barber, view available chairs, select styles, and pay deposits instantly.
							</p>
							<ul className="mt-6 space-y-3 text-sm text-[var(--color-cream-muted)]">
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-[var(--color-copper)]" />
									Public booking page with live barber schedules
								</li>
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-[var(--color-copper)]" />
									Style previews and hair-type matching
								</li>
								<li className="flex items-center gap-2">
									<span className="h-1.5 w-1.5 rounded-full bg-[var(--color-copper)]" />
									Instant deposit payment via secure channels
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* How We Achieve It Section */}
			<section className="border-t border-[var(--color-line)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						How We Achieve It
					</p>
					<h2 className="heading-display mt-4 text-3xl font-bold">
						The product in action
					</h2>
					<p className="mt-3 max-w-2xl text-sm text-[var(--color-cream-muted)] leading-relaxed">
						A seamless flow from booking requests to chair assignments, live schedules, and deposit tracking.
					</p>
					<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{screenshots.map((shot) => (
							<figure
								key={shot.src}
								className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-4 rounded-lg shadow-sm"
							>
								<div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg)] rounded">
									<Image
										src={shot.src}
										alt={shot.label}
										fill
										className="object-cover object-top"
										sizes="(max-width: 1024px) 50vw, 25vw"
									/>
								</div>
								<figcaption className="mt-4">
									<p className="text-xs uppercase tracking-[0.18em] text-[var(--color-copper)] font-semibold">
										{shot.label}
									</p>
									<p className="mt-1 text-xs text-[var(--color-cream-muted)] leading-relaxed">
										{shot.caption}
									</p>
								</figcaption>
							</figure>
						))}
					</div>
				</div>
			</section>

			{/* Demo Video Section */}
			<section className="border-t border-[var(--color-line)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Demo video
					</p>
					<h2 className="heading-display mt-4 text-2xl font-bold">Walkthrough</h2>
					<video
						className="mt-6 aspect-video w-full border border-[var(--color-line)] bg-[var(--color-bg-deep)] rounded-lg shadow-lg"
						controls
						playsInline
						preload="metadata"
						poster="/product/shot-dashboard.png"
					>
						<source src="/product/demo.mp4" type="video/mp4" />
					</video>
				</div>
			</section>

			{/* How It Works List */}
			<section className="border-t border-[var(--color-line)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						How it works
					</p>
					<div className="mt-10 grid gap-8 lg:grid-cols-3">
						{howItWorks.map((step) => (
							<div key={step.step} className="border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-6 rounded-lg">
								<span className="heading-display text-2xl text-[var(--color-copper)] font-bold">{step.step}</span>
								<h2 className="heading-display mt-4 text-xl text-[var(--color-cream)] font-semibold">{step.title}</h2>
								<p className="mt-3 text-sm text-[var(--color-cream-muted)] leading-relaxed">{step.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Capabilities Section */}
			<section className="border-t border-[var(--color-line)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
						Capabilities
					</p>
					<ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((feature) => (
							<li key={feature.title} className="border border-[var(--color-line)] p-6 rounded-lg bg-[var(--color-bg-deep)]">
								<h3 className="heading-display text-lg text-[var(--color-cream)] font-semibold">{feature.title}</h3>
								<p className="mt-2 text-sm text-[var(--color-cream-muted)] leading-relaxed">{feature.body}</p>
							</li>
						))}
					</ul>
					<div className="mt-12 flex flex-wrap gap-4">
						<Link
							href="/login"
							className="rounded-full bg-[var(--color-copper)] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg-deep)] hover:bg-[var(--color-copper-light)] transition-colors"
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

			{/* Legal Entity Section */}
			<section className="border-t border-[var(--color-line)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="kicker text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">Legal entity</p>
					<p className="mt-3 max-w-2xl text-sm text-[var(--color-cream-muted)] leading-relaxed">
						The product is KTrail OS. The registered operator is listed below for compliance, not as the
						homepage story.
					</p>
					<div className="mt-6 grid gap-8 lg:grid-cols-2">
						<div className="relative aspect-[3/4] max-w-md overflow-hidden border border-[var(--color-line)] bg-[var(--color-bg)] rounded-lg shadow-md">
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
								target="_blank"
								rel="noopener noreferrer"
								className="mt-6 inline-flex text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-copper)] hover:underline font-semibold"
							>
								Download certificate PDF
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="border-t border-[var(--color-line)] py-16">
				<div className="mx-auto max-w-[1500px] px-6 lg:px-10">
					<p className="kicker text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">Team</p>
					<h2 className="heading-display mt-4 text-3xl font-bold">Named founders, public profiles</h2>
					<p className="mt-3 max-w-2xl text-sm text-[var(--color-cream-muted)] leading-relaxed">
						Taiye Babatunde and Babatunde Olaleye operate KTrail under {legalName}. Full bios and
						LinkedIn are on{' '}
						<Link href="/team" className="text-[var(--color-copper)] hover:underline font-semibold">
							/team
						</Link>
						.
					</p>
				</div>
			</section>
		</main>
	);
}
