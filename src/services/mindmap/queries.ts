import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { mindmapApiService } from "@/services/mindmap/mindmap-api";
import { queryKeys } from "@/services/queryKeys";
import { DEMO_MINDMAP_ID } from "@/constants/demo-data";

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
 * Hook to fetch recently viewed mindmaps
 * Returns mindmaps ordered by last viewed timestamp (most recent first)
 * Only includes mindmaps that have been viewed at least once
 */
export function useListRecentMindmaps(limit: number = 3) {
	const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

	return useQuery({
		queryKey: queryKeys.mindmaps.recent(limit),
		queryFn: async () => {
			const token = await getAccessTokenSilently();
			return mindmapApiService.listRecentMindmaps(token, limit);
		},
		enabled: isAuthenticated && !isLoading,
		staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
		refetchOnWindowFocus: true, // Refetch when user returns to tab
	});
}

/**
 * Hook to fetch a specific mindmap by ID with full content
 * Returns complete mindmap including nodes and edges
 */
export function useGetMindmap(id: string) {
	const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

	// Disable query for demo mindmap (it only exists in local state)
	const isDemo = id === DEMO_MINDMAP_ID;

	return useQuery({
		queryKey: queryKeys.mindmaps.detail(id),
		queryFn: async () => {
			const token = await getAccessTokenSilently();
			return mindmapApiService.getMindmap(token, id);
		},
		enabled: !isDemo && isAuthenticated && !isLoading && !!id,
		staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
	});
}
