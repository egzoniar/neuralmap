import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { mindmapApiService } from "@/services/mindmap/mindmap-api";
import { queryKeys } from "@/services/queryKeys";
import type {
	MindmapCreate,
	MindmapUpdate,
	MindmapResponse,
} from "@/types/mindmap";

/**
 * Hook to increment view count for a mindmap
 * Call this when user opens/views a mindmap
 * Invalidates recent mindmaps query on success to refresh the sidebar list
 */
export function useIncrementViewCount() {
	const queryClient = useQueryClient();
	const { getAccessTokenSilently } = useAuth0();

	return useMutation({
		mutationFn: async (mindmapId: string) => {
			const token = await getAccessTokenSilently();
			return mindmapApiService.incrementViewCount(token, mindmapId);
		},
		onSuccess: () => {
			// Invalidate only recent mindmaps to refresh the sidebar list
			queryClient.invalidateQueries({ queryKey: ["mindmaps", "recent"] });
		},
	});
}

/**
 * Hook to create a new mindmap
 * Invalidates mindmap list queries on success to refresh sidebar
 * Returns the created mindmap with full content
 */
export function useCreateMindmap() {
	const queryClient = useQueryClient();
	const { getAccessTokenSilently } = useAuth0();

	return useMutation<MindmapResponse, Error, MindmapCreate>({
		mutationFn: async (data: MindmapCreate) => {
			const token = await getAccessTokenSilently();
			return mindmapApiService.createMindmap(token, data);
		},
		onSuccess: () => {
			// Invalidate all mindmap lists to refresh sidebar
			queryClient.invalidateQueries({ queryKey: queryKeys.mindmaps.all });
		},
	});
}

/**
 * Hook to update mindmap content (nodes and edges)
 * Use this for immediate updates like node creation, deletion, or edge changes
 * Invalidates the specific mindmap query to refresh the view
 */
export function useUpdateMindmapContent() {
	const queryClient = useQueryClient();
	const { getAccessTokenSilently } = useAuth0();

	return useMutation<
		MindmapResponse,
		Error,
		{ mindmapId: string; update: MindmapUpdate }
	>({
		mutationKey: ["updateMindmapContent"],
		mutationFn: async ({ mindmapId, update }) => {
			const token = await getAccessTokenSilently();
			return mindmapApiService.updateMindmap(token, mindmapId, update);
		},
		onSuccess: (data) => {
			// Invalidate the specific mindmap to refresh it
			queryClient.invalidateQueries({
				queryKey: queryKeys.mindmaps.detail(data.id),
			});
		},
	});
}

/**
 * Hook to update mindmap metadata (title, description, icon, visibility)
 * Use this for debounced updates like title/description changes
 * Invalidates both the detail query and list queries to refresh everywhere
 */
export function useUpdateMindmapMetadata() {
	const queryClient = useQueryClient();
	const { getAccessTokenSilently } = useAuth0();

	return useMutation<
		MindmapResponse,
		Error,
		{ mindmapId: string; update: MindmapUpdate }
	>({
		mutationKey: ["updateMindmapMetadata"],
		mutationFn: async ({ mindmapId, update }) => {
			const token = await getAccessTokenSilently();
			return mindmapApiService.updateMindmap(token, mindmapId, update);
		},
		onSuccess: (data) => {
			// Invalidate the specific mindmap
			queryClient.invalidateQueries({
				queryKey: queryKeys.mindmaps.detail(data.id),
			});
			// Also invalidate lists since title/icon may show in sidebar
			queryClient.invalidateQueries({
				queryKey: queryKeys.mindmaps.all,
			});
		},
	});
}

