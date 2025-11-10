import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	experimental: {
		esmExternals: true,
	},
};

export default nextConfig;
