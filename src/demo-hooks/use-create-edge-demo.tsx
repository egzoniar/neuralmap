"use client";

import { useCallback } from "react";
import type { Connection } from "reactflow";
import { useAppStoreApi } from "@/providers/store-provider";

/**
 * Demo-specific hook to create edges
 * NO backend sync - pure local state only
 */
export function useCreateEdgeDemo() {
	const storeApi = useAppStoreApi();

	const createEdge = useCallback(
		(connection: Connection) => {
			// Update local state only - no backend sync
			const store = storeApi.getState();
			store.mindmap.onConnect(connection);
		},
		[storeApi],
	);

	return {
		createEdge,
		isPending: false, // Never pending in demo
	};
}
