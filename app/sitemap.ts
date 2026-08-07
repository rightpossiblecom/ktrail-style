import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const base = siteConfig.url;
	const paths = [
		'',
		'/product',
		'/team',
		'/pricing',
		'/about',
		'/waitlist',
		'/demo',
		'/early-access',
		'/privacy',
		'/terms',
	];

	return paths.map((path, i) => ({
		url: `${base}${path}`,
		lastModified: new Date(),
		changeFrequency: path === '' ? 'weekly' : 'monthly',
		priority: path === '' ? 1 : i < 5 ? 0.8 : 0.6,
	}));
}
