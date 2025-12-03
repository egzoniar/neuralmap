"use client";

import { useLayoutEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Hook to handle React Query errors related to Auth0 authentication.
 *
 * Architecture:
 * - Detects "Missing Refresh Token" errors from Auth0
 * - Clears Auth0 localStorage cache and redirects to login
 * - Side effects are isolated in this hook (not in UI components)
 *
 * Pattern:
 * - Call this hook in components that fetch authenticated data
 * - Pass the React Query error object
 * - Hook handles cache clearing + redirect side effect automatically
 *
 * Why useLayoutEffect:
 * - Synchronous (runs before browser paint)
 * - Prevents flash of error state before redirect
 * - Consistent with other redirect hooks (use-route-guard.tsx)
 *
 * Why clear localStorage manually:
 * - Auth0 with cacheLocation: "localstorage" stores tokens in localStorage
 * - logout() is async and might not clear everything before redirect
 * - Manually clearing ensures clean state before redirect
 *
 * Why track error instance:
 * - Prevents handling the same error twice
 * - Allows handling of different errors that occur sequentially
 * - Ref stores the actual error instance, not just a boolean
 *
 * Why this exists:
 * - Auth0 refresh tokens can expire or be missing from localStorage
 * - When getAccessTokenSilently() fails, user needs to re-authenticate
 * - Better UX than showing cryptic error messages
 *
 * @param error - The error object from React Query (useQuery/useMutation)
 * @param redirectTo - Optional path to redirect after login (default: current page)
 */
export function useQueryAuthError(
	error: Error | null | undefined,
	redirectTo?: string,
) {
	const { logout } = useAuth0();
	// Track the specific error instance that was handled
	// This allows handling different errors sequentially
	const handledErrorRef = useRef<Error | null>(null);

	useLayoutEffect(() => {
		// Skip if no error or we've already handled this exact error instance
		if (!error || handledErrorRef.current === error) return;

		// Check if this is an Auth0 refresh token error
		const isRefreshTokenError =
			error.message?.includes("Missing Refresh Token") ||
			error.message?.includes("Login required");

		if (isRefreshTokenError) {
			// Mark this specific error instance as handled
			handledErrorRef.current = error;

			console.warn(
				"Auth0 session expired or invalid - clearing cache and logging out",
				error.message,
			);

			// Clear Auth0 cache from localStorage
			// Auth0 SDK stores tokens with keys starting with "@@auth0spajs@@"
			const auth0Keys = Object.keys(localStorage).filter((key) =>
				key.startsWith("@@auth0spajs@@"),
			);
			auth0Keys.forEach((key) => localStorage.removeItem(key));

			// Build the return URL to come back here after login
			const returnUrl = redirectTo || window.location.pathname;
			const loginUrl = `/login?returnTo=${encodeURIComponent(returnUrl)}`;

			// Logout to clear Auth0 session and redirect
			logout({
				logoutParams: {
					returnTo: window.location.origin + loginUrl,
				},
			});
		}
	}, [error, logout, redirectTo]);
}
