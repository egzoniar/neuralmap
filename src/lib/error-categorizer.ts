import { FetchError } from "@/types/errors";

/**
 * Error categories for consistent handling
 */
export enum ErrorCategory {
	AUTH = "auth",
	VALIDATION = "validation",
	NOT_FOUND = "not_found",
	PERMISSION = "permission",
	RATE_LIMIT = "rate_limit",
	SERVER = "server",
	NETWORK = "network",
	UNKNOWN = "unknown",
}

/**
 * Categorizes errors for appropriate handling
 *
 * Architecture:
 * - Pure utility function (no side effects)
 * - Uses error type and status code to determine category
 * - Returns enum for type-safe handling
 *
 * Pattern:
 * - Used by ErrorHandler to determine how to handle errors
 * - Maps technical errors to user-facing categories
 * - Extensible for new error types
 */
export function categorizeError(error: Error): ErrorCategory {
	// Auth errors (from Auth0 or 401 responses)
	if (
		error.message?.includes("Missing Refresh Token") ||
		error.message?.includes("Login required") ||
		error.message?.includes("Unauthorized")
	) {
		return ErrorCategory.AUTH;
	}

	// Handle FetchError by status code
	if (error instanceof FetchError) {
		switch (error.status) {
			case 401:
				return ErrorCategory.AUTH;
			case 403:
				return ErrorCategory.PERMISSION;
			case 404:
				return ErrorCategory.NOT_FOUND;
			case 422:
			case 400:
				return ErrorCategory.VALIDATION;
			case 429:
				return ErrorCategory.RATE_LIMIT;
			case 500:
			case 502:
			case 503:
			case 504:
				return ErrorCategory.SERVER;
			default:
				return ErrorCategory.UNKNOWN;
		}
	}

	// Network errors
	if (
		error.message?.includes("fetch") ||
		error.message?.includes("network") ||
		error.message?.includes("Failed to fetch") ||
		error.message?.includes("NetworkError")
	) {
		return ErrorCategory.NETWORK;
	}

	// Default to unknown
	return ErrorCategory.UNKNOWN;
}

/**
 * Determines if an error should show a retry action
 */
export function shouldShowRetry(category: ErrorCategory): boolean {
	return (
		category === ErrorCategory.NETWORK ||
		category === ErrorCategory.SERVER ||
		category === ErrorCategory.RATE_LIMIT
	);
}

/**
 * Determines toast duration based on error category
 */
export function getToastDuration(category: ErrorCategory): number {
	switch (category) {
		case ErrorCategory.AUTH:
			return 3000; // Auth errors redirect, short duration
		case ErrorCategory.VALIDATION:
			return 5000; // User needs time to read validation errors
		case ErrorCategory.RATE_LIMIT:
			return 7000; // Longer for rate limits (includes wait time)
		case ErrorCategory.SERVER:
			return 5000; // Server errors need action
		case ErrorCategory.NETWORK:
			return 8000; // Network errors may need troubleshooting
		default:
			return 4000; // Standard duration
	}
}
