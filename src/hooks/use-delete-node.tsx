"use client";

import { useCallback } from "react";
import { useParams } from "next/navigation";
import { useAppStoreApi } from "@/providers/store-provider";
import { useUpdateMindmapContent } from "@/services/mindmap/mutations";
import type { MindmapNode, MindmapEdge } from "@/types/mindmap";

/**
 * Hook to delete node(s) with immediate backend sync
 * Follows the same pattern as useCreateNode: disable UI while mutation is pending
 */
export function useDeleteNode() {
	const params = useParams();
	const mindmapId = params?.id as string;
	const updateMindmapContent = useUpdateMindmapContent();
	const storeApi = useAppStoreApi();

	const deleteNode = useCallback(
		(nodeId: string) => {
			// Guard: Don't proceed if no mindmapId or if mutation is already in progress
			if (!mindmapId || updateMindmapContent.isPending) return;

			// 1. Update local state immediately (optimistic update)
			const store = storeApi.getState();
			store.mindmap.deleteNode(nodeId);

			// 2. Capture state snapshot immediately after update
			const freshState = storeApi.getState();
			const capturedNodes = freshState.mindmap.nodes as MindmapNode[];
			const capturedEdges = freshState.mindmap.edges as MindmapEdge[];

			// 3. Sync to backend immediately
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

	const deleteNodes = useCallback(
		(nodeIds: string[]) => {
			// Guard: Don't proceed if no mindmapId or if mutation is already in progress
			if (!mindmapId || updateMindmapContent.isPending) return;

			// 1. Update local state immediately (optimistic update)
			const store = storeApi.getState();
			store.mindmap.deleteNodes(nodeIds);

			// 2. Capture state snapshot immediately after update
			const freshState = storeApi.getState();
			const capturedNodes = freshState.mindmap.nodes as MindmapNode[];
			const capturedEdges = freshState.mindmap.edges as MindmapEdge[];

			// 3. Sync to backend immediately
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
		deleteNode,
		deleteNodes,
		isPending: updateMindmapContent.isPending,
		isError: updateMindmapContent.isError,
		error: updateMindmapContent.error,
	};
}
