"use client";

interface MindmapErrorStateProps {
	error: Error;
}

/**
 * Presentational component for displaying mindmap loading errors.
 *
 * Architecture:
 * - Pure presentational component (no side effects)
 * - Side effects (redirects) are handled by use-query-auth-error hook
 * - Displays user-friendly error messages based on error type
 *
 * Pattern:
 * - Used in MindmapViewer when data fetching fails
 * - Shows different messages for different error types
 * - Auth errors trigger auto-redirect (handled by hook)
 */
export function MindmapErrorState({ error }: MindmapErrorStateProps) {
	// Determine user-friendly error message
	const isAuthError =
		error.message?.includes("Missing Refresh Token") ||
		error.message?.includes("Login required");

	const title = isAuthError ? "Session Expired" : "Failed to load mindmap";

	const message = isAuthError
		? "Your session has expired. Redirecting to login..."
		: error.message || "An unexpected error occurred. Please try again.";

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="text-center space-y-2 max-w-md px-4">
				<h2 className="text-2xl font-semibold text-destructive">{title}</h2>
				<p className="text-muted-foreground">{message}</p>
			</div>
		</div>
	);
}
