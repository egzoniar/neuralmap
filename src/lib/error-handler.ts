import { toast } from "sonner";
import * as Sentry from "@sentry/nextjs";
import { FetchError } from "@/types/errors";
import {
	categorizeError,
	ErrorCategory,
	shouldShowRetry,
	getToastDuration,
} from "./error-categorizer";
import { getUserFriendlyMessage } from "./error-messages";

/**
 * Options for error handling
 */
interface ErrorHandlerOptions {
	/** Context about what operation was being performed */
	context?: string;
	/** Whether to show toast notification (default: true) */
	showToast?: boolean;
	/** Whether to log to console (default: true in dev) */
	logToConsole?: boolean;
	/** Custom message to override default */
	customMessage?: string;
	/** Callback for retry action */
	onRetry?: () => void;
}

/**
 * Centralized error handler for the application
 *
 * Architecture:
 * - Single source of truth for error handling
 * - Categorizes errors and provides appropriate responses
 * - Shows user-friendly toast notifications
 * - Logs errors for debugging and monitoring
 *
 * Pattern:
 * - Static class methods (no instance needed)
 * - Used in React Query default handlers
 * - Can be called directly from try-catch blocks
 * - Integrates with Sonner toast library
 *
 * Usage:
 * ErrorHandler.handle(error, { context: 'CREATE_MINDMAP' });
 *
 * Phase 3 Integration:
 * - TODO comments mark where Sentry calls will be added
 * - Error categorization helps with Sentry tags
 * - Context helps with error grouping
 */
export class ErrorHandler {
	/**
	 * Main error handling method
	 * Categorizes error, logs it, and shows appropriate user feedback
	 */
	static handle(error: Error, options: ErrorHandlerOptions = {}): void {
		const {
			context,
			showToast = true,
			logToConsole = process.env.NODE_ENV === "development",
			customMessage,
			onRetry,
		} = options;

		// Categorize the error
		const category = categorizeError(error);

		// Log to console in development
		if (logToConsole) {
			const contextPrefix = context ? `[${context}]` : "[Error]";
			console.error(`${contextPrefix} Category: ${category}`, error);

			// Log additional details for FetchError
			if (error instanceof FetchError) {
				console.error("Status:", error.status);
				console.error("Details:", error.details);
			}
		}

		// Send to Sentry in production
		this.sendToMonitoring(error, category, context);

		// Show toast notification
		if (showToast) {
			this.showErrorToast(error, category, customMessage, context, onRetry);
		}
	}

	/**
	 * Shows appropriate toast notification based on error category
	 */
	private static showErrorToast(
		error: Error,
		category: ErrorCategory,
		customMessage: string | undefined,
		context: string | undefined,
		onRetry: (() => void) | undefined,
	): void {
		// Get user-friendly message
		const message =
			customMessage || getUserFriendlyMessage(error, category, context);

		// Get duration based on category
		const duration = getToastDuration(category);

		// Determine if we should show retry action
		const showRetryAction = shouldShowRetry(category) && onRetry;

		// Show toast with appropriate styling
		toast.error(message, {
			duration,
			action: showRetryAction
				? {
						label: "Retry",
						onClick: onRetry,
					}
				: undefined,
		});
	}

	/**
	 * Handle mutation errors (for React Query mutations)
	 * Provides context about what mutation failed
	 */
	static handleMutationError(
		error: Error,
		mutationContext: string,
		onRetry?: () => void,
	): void {
		this.handle(error, {
			context: mutationContext,
			showToast: true,
			onRetry,
		});
	}

	/**
	 * Handle query errors (for React Query queries)
	 * Query errors are typically shown in component-level error states (not toasts)
	 * We only log them for debugging purposes
	 */
	static handleQueryError(error: Error, queryContext: string): void {
		this.handle(error, {
			context: queryContext,
			showToast: false, // Query errors shown in UI, not toasts
			logToConsole: true,
		});
	}

	/**
	 * Shows success toast notification
	 * Convenience method for consistent success messaging
	 */
	static showSuccess(message: string, duration: number = 3000): void {
		toast.success(message, { duration });
	}

	/**
	 * Shows info toast notification
	 */
	static showInfo(message: string, duration: number = 4000): void {
		toast.info(message, { duration });
	}

	/**
	 * Shows warning toast notification
	 */
	static showWarning(message: string, duration: number = 5000): void {
		toast.warning(message, { duration });
	}

	/**
	 * Send error to Sentry monitoring service
	 * Only active in production (controlled by Sentry config)
	 */
	private static sendToMonitoring(
		error: Error,
		category: ErrorCategory,
		context?: string,
	): void {
		// Sentry.captureException only sends in production (see sentry configs)
		Sentry.captureException(error, {
			tags: {
				error_category: category,
				error_context: context || "unknown",
			},
			level: this.getSentryLevel(category),
			extra: {
				// Add FetchError details if available
				...(error instanceof FetchError && {
					status: error.status,
					details: error.details,
				}),
			},
		});
	}

	/**
	 * Map error category to Sentry severity level
	 */
	private static getSentryLevel(category: ErrorCategory): Sentry.SeverityLevel {
		switch (category) {
			case ErrorCategory.AUTH:
				return "info"; // Auth errors are expected (session expiry)
			case ErrorCategory.VALIDATION:
				return "warning"; // User input issues
			case ErrorCategory.NOT_FOUND:
				return "info"; // Expected 404s
			case ErrorCategory.PERMISSION:
				return "warning"; // Access denied
			case ErrorCategory.RATE_LIMIT:
				return "warning"; // Rate limiting
			case ErrorCategory.SERVER:
				return "error"; // Critical server errors
			case ErrorCategory.NETWORK:
				return "warning"; // Network issues (often client-side)
			case ErrorCategory.UNKNOWN:
			default:
				return "error"; // Unknown errors need investigation
		}
	}

	/**
	 * Set user context for Sentry
	 * Call this after user authentication to attach user info to errors
	 */
	static setUser(user: { id: string; email?: string; tier?: string }): void {
		Sentry.setUser({
			id: user.id,
			email: user.email,
			tier: user.tier,
		});
	}

	/**
	 * Clear user context (on logout)
	 */
	static clearUser(): void {
		Sentry.setUser(null);
	}
}
