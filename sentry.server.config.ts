import * as Sentry from "@sentry/nextjs";

/**
 * Sentry server-side configuration
 *
 * Captures errors that occur on the server (API routes, SSR, etc.)
 * Only enabled in production to avoid noise in development
 */
Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

	// Only enable in production
	enabled: process.env.NODE_ENV === "production",

	// Set sample rate (percentage of events to send)
	tracesSampleRate: 0.1,

	// Capture all errors on server (lower volume than client)
	sampleRate: 1.0,

	// Set environment
	environment: process.env.NODE_ENV,

	// Ignore known errors
	ignoreErrors: [
		// Auth0 refresh token errors (handled by useQueryAuthError)
		"Missing Refresh Token",
		"Login required",
	],
});
