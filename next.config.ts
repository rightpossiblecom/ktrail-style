import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	serverExternalPackages: ['@google-cloud/firestore'],
	eslint: { ignoreDuringBuilds: true },
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.opencals.com',
			},
		],
	},
};

export default nextConfig;
