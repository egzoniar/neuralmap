import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { queryKeys } from "@/services/queryKeys";

/**
 * Query hook for getting the access token
 * Useful for components that need direct token access
 */
export function useGetAccessToken() {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

	return useQuery({
		queryKey: [queryKeys.auth.accessToken],
		queryFn: async () => {
			if (!isAuthenticated) return null;
			return await getAccessTokenSilently();
		},
		enabled: isAuthenticated,
		staleTime: 10 * 60 * 1000, // 10 minutes
		gcTime: 15 * 60 * 1000, // 15 minutes (previously cacheTime)
	});
}

/**
 * Query hook for getting user info from Auth0
 */
export function useGetAuthUser() {
	const { user, isAuthenticated } = useAuth0();

	return useQuery({
		queryKey: [queryKeys.auth.user],
		queryFn: () => user,
		enabled: isAuthenticated && !!user,
		staleTime: Infinity, // User data rarely changes
	});
}
