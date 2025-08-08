import { useQuery } from "@tanstack/react-query";
import { userApiService } from "@/services/user/user-api";
import { queryKeys } from "@/services/queryKeys";

export function useGetUser() {
	return useQuery({
		queryKey: [queryKeys.user],
		queryFn: userApiService.getUser,
	});
}

export function useGetUserProfile() {
	return useQuery({
		queryKey: [queryKeys.userProfile],
		queryFn: userApiService.getUserProfile,
	});
}
