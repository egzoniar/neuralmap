"use client";

import { useCallback, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUpdateMindmapContent } from "@/services/mindmap/mutations";
import { useAppStoreApi } from "@/providers/store-provider";
import type { MindmapNode, MindmapEdge } from "@/types/mindmap";

interface UseDebouncedContentUpdateReturn {
	queueUpdate: () => void;
	flushUpdate: () => void;
	isPending: boolean;
	isError: boolean;
	error: Error | null;
}

/**
 * Hook to update mindmap content (nodes, edges) with debouncing
 *
 * This hook handles debounced updates to mindmap content.
 * It reads the current state from Zustand and sends it to the backend.
 *
 * Use cases:
 * - Node title changes
 * - Node content changes
 * - Any other content updates that should be debounced
 *
 * @param debounceMs - Debounce time in milliseconds (default: 2000ms)
 */
export function useDebouncedContentUpdate(
	debounceMs: number = 2000,
): UseDebouncedContentUpdateReturn {
	const params = useParams();
	const mindmapId = params?.id as string;
	const updateMutation = useUpdateMindmapContent();
	const storeApi = useAppStoreApi();
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	/**
	 * Queue a content update with debouncing
	 * Reads the latest state from Zustand when the timer fires
	 */
	const queueUpdate = useCallback(() => {
		if (!mindmapId) return;

		// Clear existing timer
		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
		}

		// Set new timer
		debounceTimerRef.current = setTimeout(() => {
			// Read fresh state when timer fires
			const state = storeApi.getState();
			const nodes = state.mindmap.nodes as MindmapNode[];
			const edges = state.mindmap.edges as MindmapEdge[];

			updateMutation.mutate({
				mindmapId,
				update: {
					content: {
						nodes,
						edges,
					},
				},
			});
		}, debounceMs);
	}, [mindmapId, updateMutation, debounceMs, storeApi]);

	/**
	 * Flush any pending updates immediately
	 * Useful when component unmounts or user navigates away
	 */
	const flushUpdate = useCallback(() => {
		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
			debounceTimerRef.current = null;
		}

		if (mindmapId) {
			const state = storeApi.getState();
			const nodes = state.mindmap.nodes as MindmapNode[];
			const edges = state.mindmap.edges as MindmapEdge[];

			updateMutation.mutate({
				mindmapId,
				update: {
					content: {
						nodes,
						edges,
					},
				},
			});
		}
	}, [mindmapId, updateMutation, storeApi]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
			// Note: We don't flush on unmount to avoid issues with React 18 strict mode
		};
	}, []);

	return {
		queueUpdate,
		flushUpdate,
		isPending: updateMutation.isPending,
		isError: updateMutation.isError,
		error: updateMutation.error,
	};
}
