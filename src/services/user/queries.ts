import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { userApiService } from "@/services/user/user-api";
import { queryKeys } from "@/services/queryKeys";

export function useGetUser() {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

	return useQuery({
		queryKey: queryKeys.user.all,
		queryFn: async () => {
			const token = await getAccessTokenSilently();
			return userApiService.getUser(token);
		},
		enabled: isAuthenticated,
	});
}

export function useGetUserProfile() {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

	return useQuery({
		queryKey: queryKeys.user.profile,
		queryFn: async () => {
			const token = await getAccessTokenSilently();
			return userApiService.getUserProfile(token);
		},
		enabled: isAuthenticated,
	});
}
