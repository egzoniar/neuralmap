"use client";

import { useCallback, useRef } from "react";
import { Position } from "reactflow";
import { useAppStoreApi } from "@/providers/store-provider";
import { useCheckNodeLimit } from "@/hooks/use-check-node-limit";

/**
 * Demo-specific hook to create nodes
 * NO backend sync - pure local state only
 */
export function useCreateNodeDemo() {
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
			// Guard: Prevent concurrent executions
			if (isProcessingRef.current) return;

			isProcessingRef.current = true;

			try {
				// Check limit and add node locally (shows prompt if at limit)
				await checkAndAddNode(
					sourceNodeId,
					sourceHandleId,
					handlePosition,
					shouldNewNodeBeSelected,
				);
				// That's it! No backend sync needed
			} finally {
				isProcessingRef.current = false;
			}
		},
		[checkAndAddNode],
	);

	return {
		createNode,
		// Note: isPending not needed for demo - operations are instant (no API calls)
		// The isProcessingRef guard prevents dialog conflicts, which is sufficient
	};
}
