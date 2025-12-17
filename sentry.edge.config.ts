import * as Sentry from "@sentry/nextjs";

/**
 * Sentry edge runtime configuration
 *
 * Captures errors that occur in edge functions (middleware, edge API routes)
 * Only enabled in production to avoid noise in development
 */
Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

	// Only enable in production
	enabled: process.env.NODE_ENV === "production",

	// Set sample rate
	tracesSampleRate: 0.1,
	sampleRate: 1.0,

	// Set environment
	environment: process.env.NODE_ENV,
});
