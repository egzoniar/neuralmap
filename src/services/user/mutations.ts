import { userApiService } from "@/services/user/user-api";
import { queryKeys } from "@/services/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUserProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: userApiService.updateUserProfile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.userProfile] });
		},
	});
}
