"use client";

import { useCallback, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppStoreApi } from "@/providers/store-provider";
import { useUpdateMindmapContent } from "@/services/mindmap/mutations";
import type { MindmapNode, MindmapEdge } from "@/types/mindmap";

/**
 * Hook to persist node/edge selection state to backend
 * Debounces for 1000ms after selection changes
 *
 * This allows users to return to their mindmap and see what they were working on
 */
export function useSelectionSync() {
	const params = useParams();
	const mindmapId = params?.id as string;
	const updateMindmapContent = useUpdateMindmapContent();
	const storeApi = useAppStoreApi();
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	// Use ref to store mutation to avoid recreating the callback
	const mutationRef = useRef(updateMindmapContent);

	// Keep mutation ref up to date
	useEffect(() => {
		mutationRef.current = updateMindmapContent;
	}, [updateMindmapContent]);

	/**
	 * Called when selection changes
	 * Debounces the backend sync for 1000ms
	 */
	const syncSelection = useCallback(() => {
		if (!mindmapId) return;

		// Clear any existing timer
		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
		}

		// Set new timer for 1000ms debounce
		debounceTimerRef.current = setTimeout(() => {
			// Capture fresh state when timer fires
			const freshState = storeApi.getState();
			const capturedNodes = freshState.mindmap.nodes as MindmapNode[];
			const capturedEdges = freshState.mindmap.edges as MindmapEdge[];

			// Sync to backend using ref to avoid stale closure
			mutationRef.current.mutate({
				mindmapId,
				update: {
					content: {
						nodes: capturedNodes,
						edges: capturedEdges,
					},
				},
			});
		}, 1000); // 1 second debounce
	}, [mindmapId, storeApi]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, []);

	return {
		syncSelection,
		isPending: updateMindmapContent.isPending,
		isError: updateMindmapContent.isError,
		error: updateMindmapContent.error,
	};
}
