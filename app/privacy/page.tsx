import { siteConfig } from '@/config/site';

export default function PrivacyPage() {
	const { legalName, brandName, supportEmail, address } = siteConfig;

	return (
		<main className="bg-[var(--color-bg)] px-6 pt-32 pb-24 text-[var(--color-cream)] lg:px-10 lg:pt-40">
			<div className="mx-auto max-w-3xl">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Privacy
				</p>
				<h1 className="heading-display mt-4 text-4xl lg:text-5xl">Privacy policy</h1>
				<p className="mt-4 text-sm leading-relaxed text-[var(--color-cream-muted)]">
					How {legalName} handles information when you use {brandName}.
				</p>

				<div className="mt-12 space-y-10 text-sm leading-relaxed text-[var(--color-cream-muted)]">
					<section>
						<h2 className="heading-display text-xl text-[var(--color-cream)]">Who we are</h2>
						<p className="mt-3">
							{legalName} ({address}) operates {brandName}, a multi-barber booking and style-preview
							product. Contact:{' '}
							<a href={`mailto:${supportEmail}`} className="text-[var(--color-copper)] hover:underline">
								{supportEmail}
							</a>
							.
						</p>
					</section>

					<section>
						<h2 className="heading-display text-xl text-[var(--color-cream)]">Accounts and product use</h2>
						<p className="mt-3">
							When you create an account or sign in, we collect the email and password you submit so
							you can open your shop dashboard. Walkthrough and sales forms may also collect your
							name, phone, city, shop name, and a short note about what you need.
						</p>
					</section>

					<section>
						<h2 className="heading-display text-xl text-[var(--color-cream)]">What we store</h2>
						<p className="mt-3">
							Account email and a password hash are stored in Google Cloud Firestore on project
							ktrail-os. Your shop workspace — requests, bookings, clients, and deposits — is stored
							in the same database under your account. Session cookies stay on this device. We do
							not sell personal information.
						</p>
					</section>

					<section>
						<h2 className="heading-display text-xl text-[var(--color-cream)]">Your choices</h2>
						<p className="mt-3">
							You can sign out from Account in the dashboard. Clearing site data in your browser
							removes the local session and stored product activity. Email {supportEmail} if you
							want help with an account request.
						</p>
					</section>
				</div>
			</div>
		</main>
	);
}
