import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { queryKeys } from "@/services/queryKeys";
import { authApiService } from "./auth-api";

/**
 * Query hook for getting the access token
 * Useful for components that need direct token access
 */
export function useGetAccessToken() {
	const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

	return useQuery({
		queryKey: queryKeys.auth.accessToken,
		queryFn: () =>
			authApiService.getAccessToken({
				getAccessTokenSilently,
				isAuthenticated,
			}),
		enabled: isAuthenticated && !isLoading,
		staleTime: 10 * 60 * 1000, // 10 minutes
		gcTime: 15 * 60 * 1000, // 15 minutes (previously cacheTime)
	});
}

/**
 * Query hook for getting user info from Auth0
 */
export function useGetAuthUser() {
	const { user, isAuthenticated, isLoading } = useAuth0();

	return useQuery({
		queryKey: queryKeys.auth.user,
		queryFn: () =>
			authApiService.getAuthUser({
				user,
				isAuthenticated,
			}),
		enabled: isAuthenticated && !isLoading && !!user,
		staleTime: Infinity, // User data rarely changes
	});
}
