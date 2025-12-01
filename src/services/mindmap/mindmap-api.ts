import { fetchApi } from "@/lib/fetch-api";
import { API_ENDPOINTS } from "@/constants/api";
import type { Mindmap } from "@/types/mindmap";

/**
 * Mindmap API service
 * Handles all mindmap-related API calls
 */
export const mindmapApiService = {
	/**
	 * List all user's mindmaps
	 * Returns lightweight response without content field for performance
	 * Ordered by most recently updated first
	 */
	async listMindmaps(token: string): Promise<Mindmap[]> {
		return await fetchApi<Mindmap[]>(API_ENDPOINTS.MINDMAPS.LIST, {
			method: "GET",
			token,
		});
	},

	/**
	 * Get a specific mindmap by ID
	 * @todo Implement when backend endpoint is ready
	 */
	async getMindmap(token: string, id: string): Promise<Mindmap> {
		return await fetchApi<Mindmap>(API_ENDPOINTS.MINDMAPS.DETAIL(id), {
			method: "GET",
			token,
		});
	},
};
