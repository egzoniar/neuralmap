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
