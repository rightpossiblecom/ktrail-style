import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

const paths = [
	'/',
	'/product',
	'/team',
	'/about',
	'/pricing',
	'/login',
	'/signup',
	'/dashboard',
	'/new',
	'/bookings',
	'/clients',
	'/barbers',
	'/help',
	'/security',
	'/privacy',
	'/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
	return paths.map((path) => ({
		url: `${siteConfig.url}${path === '/' ? '' : path}`,
		changeFrequency: path === '/team' || path === '/product' ? 'weekly' : 'monthly',
		priority: path === '/' || path === '/team' || path === '/product' ? 1 : 0.6,
	}));
}
