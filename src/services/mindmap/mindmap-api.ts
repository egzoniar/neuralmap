import { fetchApi } from "@/lib/fetch-api";
import { API_ENDPOINTS } from "@/constants/api";
import type {
	Mindmap,
	MindmapCreate,
	MindmapUpdate,
	MindmapResponse,
} from "@/types/mindmap";

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
	 * List recently viewed mindmaps
	 * Returns mindmaps ordered by last viewed timestamp (most recent first)
	 * Only includes mindmaps that have been viewed at least once
	 */
	async listRecentMindmaps(
		token: string,
		limit: number = 10,
	): Promise<Mindmap[]> {
		const url = `${API_ENDPOINTS.MINDMAPS.RECENT}?limit=${limit}`;
		return await fetchApi<Mindmap[]>(url, {
			method: "GET",
			token,
		});
	},

	/**
	 * Get a specific mindmap by ID with full content
	 * Returns complete mindmap data including nodes and edges
	 */
	async getMindmap(token: string, id: string): Promise<MindmapResponse> {
		return await fetchApi<MindmapResponse>(API_ENDPOINTS.MINDMAPS.DETAIL(id), {
			method: "GET",
			token,
		});
	},

	/**
	 * Increment view count for a mindmap
	 * Call this when user opens/views a mindmap
	 * Returns 204 No Content on success
	 */
	async incrementViewCount(token: string, id: string): Promise<void> {
		await fetchApi<void>(API_ENDPOINTS.MINDMAPS.VIEW(id), {
			method: "POST",
			token,
		});
	},

	/**
	 * Create a new mindmap
	 * Backend automatically generates root node with mindmap title
	 * Returns 201 with created mindmap including full content
	 */
	async createMindmap(
		token: string,
		data: MindmapCreate,
	): Promise<MindmapResponse> {
		return await fetchApi<MindmapResponse>(API_ENDPOINTS.MINDMAPS.CREATE, {
			method: "POST",
			token,
			body: data,
		});
	},

	/**
	 * Update a mindmap (including content)
	 * Backend validates content structure and syncs root node title
	 * Returns 200 with updated mindmap including full content
	 */
	async updateMindmap(
		token: string,
		id: string,
		data: MindmapUpdate,
	): Promise<MindmapResponse> {
		return await fetchApi<MindmapResponse>(API_ENDPOINTS.MINDMAPS.UPDATE(id), {
			method: "PUT",
			token,
			body: data,
		});
	},
};
