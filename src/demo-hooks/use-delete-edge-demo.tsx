"use client";

import { useCallback } from "react";
import { useAppStoreApi } from "@/providers/store-provider";

/**
 * Demo-specific hook to delete edges
 * NO backend sync - pure local state only
 */
export function useDeleteEdgeDemo() {
	const storeApi = useAppStoreApi();

	const deleteEdge = useCallback(
		(edgeId: string) => {
			// Update local state only - no backend sync
			const store = storeApi.getState();
			store.mindmap.deleteEdge(edgeId);
		},
		[storeApi],
	);

	const deleteEdges = useCallback(
		(edgeIds: string[]) => {
			// Update local state only - no backend sync
			const store = storeApi.getState();
			store.mindmap.deleteEdges(edgeIds);
		},
		[storeApi],
	);

	return {
		deleteEdge,
		deleteEdges,
		isPending: false, // Never pending in demo
	};
}
