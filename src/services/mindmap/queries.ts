import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { mindmapApiService } from "@/services/mindmap/mindmap-api";
import { queryKeys } from "@/services/queryKeys";

/**
 * Hook to fetch all user's mindmaps
 * Returns lightweight list without heavy content field
 * Ordered by most recently updated first from backend
 */
export function useListMindmaps() {
	const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

	return useQuery({
		queryKey: queryKeys.mindmaps.list,
		queryFn: async () => {
			const token = await getAccessTokenSilently();
			return mindmapApiService.listMindmaps(token);
		},
		enabled: isAuthenticated && !isLoading,
		staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
		refetchOnWindowFocus: true, // Refetch when user returns to tab
	});
}

/**
 * Hook to fetch a specific mindmap by ID
 * @todo Implement when backend endpoint is ready
 */
export function useGetMindmap(id: string) {
	const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

	return useQuery({
		queryKey: queryKeys.mindmaps.detail(id),
		queryFn: async () => {
			const token = await getAccessTokenSilently();
			return mindmapApiService.getMindmap(token, id);
		},
		enabled: isAuthenticated && !isLoading && !!id,
	});
}
