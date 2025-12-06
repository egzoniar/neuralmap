"use client";

import { useCallback } from "react";
import { useAppStoreApi } from "@/providers/store-provider";

/**
 * Demo-specific hook to delete nodes
 * NO backend sync - pure local state only
 */
export function useDeleteNodeDemo() {
	const storeApi = useAppStoreApi();

	const deleteNode = useCallback(
		(nodeId: string) => {
			// Update local state only - no backend sync
			const store = storeApi.getState();
			store.mindmap.deleteNode(nodeId);
		},
		[storeApi],
	);

	const deleteNodes = useCallback(
		(nodeIds: string[]) => {
			// Update local state only - no backend sync
			const store = storeApi.getState();
			store.mindmap.deleteNodes(nodeIds);
		},
		[storeApi],
	);

	return {
		deleteNode,
		deleteNodes,
		isPending: false, // Never pending in demo
	};
}
