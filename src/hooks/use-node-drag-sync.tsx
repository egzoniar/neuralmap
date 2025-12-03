"use client";

import { useCallback, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import type { Node } from "reactflow";
import { useAppStoreApi } from "@/providers/store-provider";
import { useUpdateMindmapContent } from "@/services/mindmap/mutations";
import type { MindmapNode, MindmapEdge } from "@/types/mindmap";

/**
 * Hook to sync node positions to backend after drag ends
 * Debounces for 500ms after the last drag operation completes
 *
 * Usage: Call onNodeDragStop when ReactFlow's onNodeDragStop event fires
 */
export function useNodeDragSync() {
	const params = useParams();
	const mindmapId = params?.id as string;
	const updateMindmapContent = useUpdateMindmapContent();
	const storeApi = useAppStoreApi();
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	/**
	 * Called when node drag ends
	 * Debounces the backend sync for 500ms
	 */
	const onNodeDragStop = useCallback(
		(_event: React.MouseEvent, _node: Node) => {
			if (!mindmapId) return;

			// Clear any existing timer
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}

			// Set new timer for 500ms debounce
			debounceTimerRef.current = setTimeout(() => {
				// Capture fresh state when timer fires
				const freshState = storeApi.getState();
				const capturedNodes = freshState.mindmap.nodes as MindmapNode[];
				const capturedEdges = freshState.mindmap.edges as MindmapEdge[];

				// Sync to backend
				updateMindmapContent.mutate({
					mindmapId,
					update: {
						content: {
							nodes: capturedNodes,
							edges: capturedEdges,
						},
					},
				});
			}, 500); // 500ms debounce as per requirements
		},
		[mindmapId, updateMindmapContent, storeApi],
	);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, []);

	return {
		onNodeDragStop,
		isPending: updateMindmapContent.isPending,
		isError: updateMindmapContent.isError,
		error: updateMindmapContent.error,
	};
}
