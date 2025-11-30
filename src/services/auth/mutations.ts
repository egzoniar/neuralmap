import { useMutation } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import type { LoginOptions } from "@/types/auth";
import { authApiService } from "./auth-api";

/**
 * Mutation hook for login
 * Automatically redirects to Google authentication
 */
export function useLogin() {
	const { loginWithRedirect } = useAuth0();

	return useMutation({
		mutationFn: (options?: LoginOptions) =>
			authApiService.login({
				loginWithRedirect,
				options,
			}),
	});
}

/**
 * Mutation hook for logout
 */
export function useLogout() {
	const { logout } = useAuth0();

	return useMutation({
		mutationFn: () =>
			authApiService.logout({
				logout,
			}),
	});
}

/**
 * Mutation hook for user onboarding
 * Call this after successful Auth0 authentication to sync user with backend
 */
export function useOnboardUser() {
	const { getAccessTokenSilently } = useAuth0();

	return useMutation({
		mutationFn: async () => {
			const token = await getAccessTokenSilently();
			return authApiService.onboardUser(token);
		},
		onSuccess: (data) => {
			if (data.is_new_user) {
				console.log("New user onboarded:", data.user.email);
			} else {
				console.log("Existing user synced:", data.user.email);
			}
		},
		onError: (error) => {
			console.error("Onboarding error:", error);
		},
	});
}
