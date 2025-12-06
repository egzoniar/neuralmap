"use client";

import { useCallback } from "react";
import { useAppStore } from "@/providers/store-provider";
import { UpgradePromptContent } from "@/components/upgrade-prompt/upgrade-prompt-content";

/**
 * Hook to check mindmap limit before creating mindmaps
 * Returns a function that only validates limit (does NOT create)
 * Creation is handled by the backend mutation
 */
export function useCheckMindmapLimit() {
	const mindmaps = useAppStore((state) => state.mindmaps.mindmaps);
	const tier = useAppStore((state) => state.application.tier);
	const limits = useAppStore((state) => state.application.limits);
	const showDialog = useAppStore((state) => state.dialog.show);

	const checkMindmapLimit = useCallback(async () => {
		// Check if we're at the limit
		if (mindmaps.length >= limits.maxMindmaps) {
			// Show upgrade prompt
			await showDialog({
				component: UpgradePromptContent,
				props: {
					limitInfo: {
						type: "mindmaps",
						current: mindmaps.length,
						max: limits.maxMindmaps,
						tier,
					},
				},
			});
			return false; // Limit reached
		}

		return true; // Under limit - proceed
	}, [mindmaps, limits, tier, showDialog]);

	return checkMindmapLimit;
}
