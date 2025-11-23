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
		mutationFn: async (options?: LoginOptions) => {
			await authApiService.logAuthEvent("login_initiated");

			// Merge options with Google connection
			const loginOptions = {
				...options,
				authorizationParams: {
					...options?.authorizationParams,
					connection: "google-oauth2", // Skip Auth0 screen, go directly to Google
				},
			};

			await loginWithRedirect(loginOptions);
		},
	});
}

/**
 * Mutation hook for logout
 */
export function useLogout() {
	const { logout } = useAuth0();

	return useMutation({
		mutationFn: async () => {
			await authApiService.logAuthEvent("logout_initiated");
			logout({
				logoutParams: {
					returnTo: window.location.origin + "/login",
				},
			});
		},
	});
}
