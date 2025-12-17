"use client";

import { useCallback } from "react";
import { useAppStore } from "@/providers/store-provider";
import { UpgradePromptContent } from "@/components/upgrade-prompt-content";
import type { Position } from "reactflow";

/**
 * Hook to check node limit before adding nodes
 * Returns a function that validates and creates nodes if under limit
 */
export function useCheckNodeLimit() {
	const nodes = useAppStore((state) => state.mindmap.nodes);
	const tier = useAppStore((state) => state.application.tier);
	const limits = useAppStore((state) => state.application.limits);
	const addNodeWithEdge = useAppStore((state) => state.mindmap.addNodeWithEdge);
	const showDialog = useAppStore((state) => state.dialog.show);

	const checkAndAddNode = useCallback(
		async (
			sourceNodeId: string,
			sourceHandleId: string,
			handlePosition: Position,
			shouldNewNodeBeSelected?: boolean,
		) => {
			// Check if we're at the limit
			if (nodes.length >= limits.maxNodesPerMindmap) {
				// Show upgrade prompt
				await showDialog({
					component: UpgradePromptContent,
					props: {
						limitInfo: {
							type: "nodes",
							current: nodes.length,
							max: limits.maxNodesPerMindmap,
							tier,
						},
					},
				});
				return false; // Limit reached
			}

			// Under limit - create the node
			addNodeWithEdge(
				sourceNodeId,
				sourceHandleId,
				handlePosition,
				shouldNewNodeBeSelected,
			);
			return true; // Success
		},
		[nodes, limits, tier, addNodeWithEdge, showDialog],
	);

	return checkAndAddNode;
}
