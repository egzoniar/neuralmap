import { userApiService } from "@/services/user/user-api";
import { queryKeys } from "@/services/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import type { UserProfile } from "@/types/user";

export function useUpdateUserProfile() {
	const queryClient = useQueryClient();
	const { getAccessTokenSilently } = useAuth0();

	return useMutation({
		mutationFn: async (profile: UserProfile) => {
			const token = await getAccessTokenSilently();
			return userApiService.updateUserProfile(token, profile);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
		},
	});
}
