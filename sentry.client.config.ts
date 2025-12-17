import * as Sentry from "@sentry/nextjs";

/**
 * Sentry client-side configuration
 * 
 * Captures errors that occur in the browser
 * Only enabled in production to avoid noise in development
 */
Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

	// Only enable in production
	enabled: process.env.NODE_ENV === "production",

	// Set sample rate (percentage of events to send)
	// 1.0 = 100%, 0.1 = 10%
	tracesSampleRate: 0.1,

	// Capture 10% of errors (adjust based on volume)
	sampleRate: 1.0,

	// Automatically capture console errors
	integrations: [
		Sentry.replayIntegration({
			maskAllText: true,
			blockAllMedia: true,
		}),
	],

	// Session Replay sampling
	// Replay 10% of error sessions
	replaysOnErrorSampleRate: 0.1,
	// Replay 0% of normal sessions (only errors)
	replaysSessionSampleRate: 0,

	// Set environment
	environment: process.env.NODE_ENV,

	// Ignore known errors
	ignoreErrors: [
		// Browser extensions
		"top.GLOBALS",
		// Random plugins/extensions
		"originalCreateNotification",
		"canvas.contentDocument",
		"MyApp_RemoveAllHighlights",
		// Network errors (handled by error handler)
		"Failed to fetch",
		"NetworkError",
		"Network request failed",
		// Auth0 refresh token errors (handled by useQueryAuthError)
		"Missing Refresh Token",
		"Login required",
	],
});

