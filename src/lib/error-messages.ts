import { FetchError } from "@/types/errors";
import { ErrorCategory } from "./error-categorizer";

/**
 * User-friendly error messages mapped by category
 *
 * Architecture:
 * - Centralized message definitions
 * - Consistent tone and language
 * - Context-aware messages
 *
 * Pattern:
 * - Used by ErrorHandler to get display messages
 * - Maps technical errors to user-friendly text
 * - Avoids technical jargon
 */
export const ERROR_MESSAGES: Record<ErrorCategory, string> = {
	[ErrorCategory.AUTH]: "Your session has expired. Please log in again.",
	[ErrorCategory.VALIDATION]: "Please check your input and try again.",
	[ErrorCategory.NOT_FOUND]: "The item you're looking for doesn't exist.",
	[ErrorCategory.PERMISSION]:
		"You don't have permission to perform this action.",
	[ErrorCategory.RATE_LIMIT]:
		"Too many requests. Please wait a moment and try again.",
	[ErrorCategory.SERVER]: "Something went wrong on our end. Please try again.",
	[ErrorCategory.NETWORK]:
		"Connection lost. Please check your internet and try again.",
	[ErrorCategory.UNKNOWN]: "Something went wrong. Please try again.",
};

/**
 * Context-specific error messages for operations
 * Provides more specific messages based on what the user was trying to do
 */
export const OPERATION_ERROR_MESSAGES = {
	// Mindmap operations
	CREATE_MINDMAP: "Failed to create mindmap. Please try again.",
	UPDATE_MINDMAP: "Failed to save changes. Please try again.",
	DELETE_MINDMAP: "Failed to delete mindmap. Please try again.",
	LOAD_MINDMAP: "Failed to load mindmap. Please try again.",

	// Node operations
	CREATE_NODE: "Failed to create node. Please try again.",
	UPDATE_NODE: "Failed to update node. Please try again.",
	DELETE_NODE: "Failed to delete node. Please try again.",

	// Edge operations
	CREATE_EDGE: "Failed to create connection. Please try again.",
	DELETE_EDGE: "Failed to delete connection. Please try again.",

	// Billing operations
	CREATE_CHECKOUT: "Failed to start checkout. Please try again.",
	CANCEL_SUBSCRIPTION: "Failed to cancel subscription. Please try again.",
	RESUME_SUBSCRIPTION: "Failed to resume subscription. Please try again.",
	GET_PAYMENT_PORTAL: "Failed to open payment portal. Please try again.",

	// Auth operations
	LOGIN: "Failed to log in. Please try again.",
	LOGOUT: "Failed to log out. Please try again.",
	ONBOARDING: "Failed to complete setup. Redirecting anyway...",

	// Generic
	FETCH: "Failed to load data. Please try again.",
	SAVE: "Failed to save. Please try again.",
} as const;

/**
 * Gets a user-friendly error message for a FetchError
 * Provides specific messages for common HTTP status codes
 */
export function getMessageForFetchError(error: FetchError): string {
	switch (error.status) {
		case 401:
			return "Your session has expired. Please log in again.";
		case 403:
			return "You don't have permission to do that.";
		case 404:
			return "The item you're looking for doesn't exist.";
		case 422:
		case 400:
			return "Invalid request. Please check your input.";
		case 429:
			return "Too many requests. Please slow down and try again.";
		case 500:
			return "Server error. We're working on it!";
		case 502:
		case 503:
			return "Service temporarily unavailable. Please try again in a moment.";
		case 504:
			return "Request timed out. Please try again.";
		default:
			if (error.status >= 500) {
				return "Server error. Please try again.";
			}
			return "Something went wrong. Please try again.";
	}
}

/**
 * Gets a user-friendly message for any error
 * Falls back to generic messages if specific handling not available
 */
export function getUserFriendlyMessage(
	error: Error,
	category: ErrorCategory,
	operationContext?: string,
): string {
	// Use operation-specific message if provided
	if (operationContext && operationContext in OPERATION_ERROR_MESSAGES) {
		return OPERATION_ERROR_MESSAGES[
			operationContext as keyof typeof OPERATION_ERROR_MESSAGES
		];
	}

	// Use FetchError-specific message if available
	if (error instanceof FetchError) {
		return getMessageForFetchError(error);
	}

	// Fall back to category message
	return ERROR_MESSAGES[category];
}
