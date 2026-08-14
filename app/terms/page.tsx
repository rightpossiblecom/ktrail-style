import { siteConfig } from '@/config/site';

export default function TermsPage() {
	const { legalName, brandName, supportEmail } = siteConfig;

	return (
		<main className="bg-[var(--color-bg)] px-6 pt-32 pb-24 text-[var(--color-cream)] lg:px-10 lg:pt-40">
			<div className="mx-auto max-w-3xl">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Terms
				</p>
				<h1 className="heading-display mt-4 text-4xl lg:text-5xl">Terms of use</h1>
				<p className="mt-4 text-sm leading-relaxed text-[var(--color-cream-muted)]">
					Rules for using {brandName}, operated by {legalName}.
				</p>

				<div className="mt-12 space-y-10 text-sm leading-relaxed text-[var(--color-cream-muted)]">
					<section>
						<h2 className="heading-display text-xl text-[var(--color-cream)]">The product</h2>
						<p className="mt-3">
							{brandName} is a web app for multi-barber booking and AI hairstyle previews. By creating
							an account or signing in, you agree to use the product for your shop and clients in a
							lawful way.
						</p>
					</section>

					<section>
						<h2 className="heading-display text-xl text-[var(--color-cream)]">Accounts</h2>
						<p className="mt-3">
							You are responsible for the email and password you use to sign in, and for activity
							under your account. Keep your credentials private. We may suspend access if an account
							is used to abuse the service or other shops.
						</p>
					</section>

					<section>
						<h2 className="heading-display text-xl text-[var(--color-cream)]">Content you submit</h2>
						<p className="mt-3">
							Photos, booking details, and messages you enter stay under your control for product
							use. Style previews are recommendations for discussion with a barber — they are not a
							guarantee of the finished cut.
						</p>
					</section>

					<section>
						<h2 className="heading-display text-xl text-[var(--color-cream)]">Contact</h2>
						<p className="mt-3">
							Questions about these terms:{' '}
							<a href={`mailto:${supportEmail}`} className="text-[var(--color-copper)] hover:underline">
								{supportEmail}
							</a>
							.
						</p>
					</section>
				</div>
			</div>
		</main>
	);
}
