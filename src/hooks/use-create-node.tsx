"use client";

import { useCallback, useRef } from "react";
import { Position } from "reactflow";
import { useParams } from "next/navigation";
import { useAppStoreApi } from "@/providers/store-provider";
import { useUpdateMindmapContent } from "@/services/mindmap/mutations";
import { useCheckNodeLimit } from "@/hooks/use-check-node-limit";
import type { MindmapNode, MindmapEdge } from "@/types/mindmap";

/**
 * Hook to create a new node with backend sync
 * Checks limits before creating, shows upgrade prompt if needed
 */
export function useCreateNode() {
	const params = useParams();
	const mindmapId = params?.id as string;
	const updateMindmapContent = useUpdateMindmapContent();
	const storeApi = useAppStoreApi();
	const checkAndAddNode = useCheckNodeLimit();
	const isProcessingRef = useRef(false);

	const createNode = useCallback(
		async (
			sourceNodeId: string,
			sourceHandleId: string,
			handlePosition: Position,
			shouldNewNodeBeSelected?: boolean,
		) => {
			// Guard: Prevent concurrent executions and check mutation state
			if (
				!mindmapId ||
				updateMindmapContent.isPending ||
				isProcessingRef.current
			) {
				return;
			}

			// Lock to prevent race conditions during async limit check
			isProcessingRef.current = true;

			try {
				// 1. Check limit and update local state (shows prompt if at limit)
				const success = await checkAndAddNode(
					sourceNodeId,
					sourceHandleId,
					handlePosition,
					shouldNewNodeBeSelected,
				);

				// If limit reached, stop here
				if (!success) return;

				// 2. Capture state snapshot after update
				const freshState = storeApi.getState();
				const capturedNodes = freshState.mindmap.nodes as MindmapNode[];
				const capturedEdges = freshState.mindmap.edges as MindmapEdge[];

				// 3. Sync to backend (buttons will be disabled via isPending)
				updateMindmapContent.mutate({
					mindmapId,
					update: {
						content: {
							nodes: capturedNodes,
							edges: capturedEdges,
						},
					},
				});
			} finally {
				// Unlock after processing (whether success or failure)
				isProcessingRef.current = false;
			}
		},
		[mindmapId, updateMindmapContent, storeApi, checkAndAddNode],
	);

	return {
		createNode,
		isPending: updateMindmapContent.isPending,
		isError: updateMindmapContent.isError,
		error: updateMindmapContent.error,
	};
}
