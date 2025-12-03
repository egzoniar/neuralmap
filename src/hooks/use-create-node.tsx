"use client";

import { useCallback } from "react";
import { Position } from "reactflow";
import { useParams } from "next/navigation";
import { useAppStoreApi } from "@/providers/store-provider";
import { useUpdateMindmapContent } from "@/services/mindmap/mutations";
import type { MindmapNode, MindmapEdge } from "@/types/mindmap";

/**
 * Hook to create a new node with backend sync
 * Simple approach: disable buttons while mutation is in progress
 * This prevents all race conditions by design
 */
export function useCreateNode() {
	const params = useParams();
	const mindmapId = params?.id as string;
	const updateMindmapContent = useUpdateMindmapContent();
	const storeApi = useAppStoreApi();

	const createNode = useCallback(
		(
			sourceNodeId: string,
			sourceHandleId: string,
			handlePosition: Position,
		) => {
			// Guard: Don't proceed if no mindmapId or if mutation is already in progress
			if (!mindmapId || updateMindmapContent.isPending) return;

			// 1. Update local state immediately (optimistic update)
			const store = storeApi.getState();
			store.mindmap.addNodeWithEdge(
				sourceNodeId,
				sourceHandleId,
				handlePosition,
			);

			// 2. Capture state snapshot immediately after update
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
		},
		[mindmapId, updateMindmapContent, storeApi],
	);

	return {
		createNode,
		isPending: updateMindmapContent.isPending,
		isError: updateMindmapContent.isError,
		error: updateMindmapContent.error,
	};
}
