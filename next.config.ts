import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	experimental: {
		esmExternals: true,
	},
};

/**
 * Sentry configuration options
 * Only runs in production to avoid noise in development
 */
const sentryOptions = {
	// Suppress Sentry logs in non-production
	silent: process.env.NODE_ENV !== "production",

	// Organization and project (optional, from env)
	org: process.env.SENTRY_ORG,
	project: process.env.SENTRY_PROJECT,

	// Disable automatic instrumentation in development
	autoInstrumentServerFunctions: false,
	autoInstrumentMiddleware: false,

	// Only upload source maps in production
	widenClientFileUpload: false,
	disableServerWebpackPlugin: process.env.NODE_ENV !== "production",
	disableClientWebpackPlugin: process.env.NODE_ENV !== "production",

	// Hide source maps from public
	hideSourceMaps: true,

	// Use tunnel route to avoid ad blockers
	tunnelRoute: "/api/monitoring/sentry",
};

export default withSentryConfig(nextConfig, sentryOptions);
