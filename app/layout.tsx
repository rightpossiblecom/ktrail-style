import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { AppShell } from '@/components/layout/AppShell';
import { Providers } from '@/components/providers';
import { siteConfig } from '@/config/site';
import './globals.css';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

const manrope = Manrope({
	subsets: ['latin'],
	variable: '--font-manrope',
	display: 'swap',
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
};

const title = `${siteConfig.brandName} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: title,
		template: `%s | ${siteConfig.brandName}`,
	},
	description: siteConfig.description,
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title,
		description: siteConfig.description,
		siteName: siteConfig.brandName,
		locale: 'en_NG',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title,
		description: siteConfig.description,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${inter.variable} ${manrope.variable}`}>
			<body>
				<script
					dangerouslySetInnerHTML={{
						__html: `window.addEventListener("message",function(e){if(e.data&&e.data.type==="scrollTo"&&e.data.id){var el=document.getElementById(e.data.id);if(el){var top=el.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:top,behavior:"smooth"})}}if(e.data&&e.data.type==="scrollTop"){window.scrollTo({top:0,behavior:"smooth"})}});`,
					}}
				/>
				<Providers>
					<AppShell>{children}</AppShell>
				</Providers>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Organization',
							name: siteConfig.legalName,
							alternateName: siteConfig.brandName,
							description: siteConfig.description,
							url: siteConfig.url,
							email: siteConfig.supportEmail,
							address: {
								'@type': 'PostalAddress',
								streetAddress: siteConfig.address,
								addressCountry: 'NG',
							},
						}),
					}}
				/>
			</body>
		</html>
	);
}
