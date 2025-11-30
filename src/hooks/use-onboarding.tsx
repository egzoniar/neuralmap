"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services/queryKeys";
import { authApiService } from "@/services/auth/auth-api";

/**
 * Hook for handling user onboarding after Auth0 authentication.
 *
 * This hook uses React Query's enabled pattern to automatically trigger onboarding
 * when the user is authenticated. No useEffect needed - React Query handles everything.
 *
 * The hook:
 * - Automatically calls onboarding endpoint when enabled and authenticated
 * - Logs onboarding status
 * - Redirects to specified path after completion (success or failure)
 * - Only runs once per session (staleTime: Infinity)
 *
 * @param enabled - Whether to enable automatic onboarding (e.g., true on callback page)
 * @param redirectTo - Where to redirect after onboarding (default: "/")
 * @returns Query state for rendering loading/error states
 */
export function useOnboarding(enabled: boolean, redirectTo: string = "/") {
	const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
	const router = useRouter();

	return useQuery({
		queryKey: queryKeys.auth.onboarding,
		queryFn: async () => {
			try {
				const token = await getAccessTokenSilently({
					cacheMode: "on",
				});
				const data = await authApiService.onboardUser(token);

				// Log for monitoring
				if (data.is_new_user) {
					console.log("New user onboarded:", data.user.email);
				} else {
					console.log("Existing user synced:", data.user.email);
				}

				// Redirect after successful onboarding
				router.push(redirectTo);

				return data;
			} catch (error) {
				console.error("Onboarding error:", error);
				throw error;
			}
		},
		// Wait for Auth0 to be fully initialized before calling getAccessTokenSilently
		enabled: enabled && isAuthenticated && !isLoading,
		retry: (failureCount, error) => {
			// Retry once, then give up
			if (failureCount >= 1) {
				// Log error and redirect even on failure
				console.error("Onboarding error after retry:", error);
				router.push(redirectTo);
				return false;
			}
			return true;
		},
		staleTime: Infinity, // Only run once per session
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
}
