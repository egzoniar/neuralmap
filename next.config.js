/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: false,
	experimental: {
		esmExternals: true,
	},
};

module.exports = nextConfig;
