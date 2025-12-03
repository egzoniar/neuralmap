"use client";

import { useEffect, useRef } from "react";
import { useIncrementViewCount } from "@/services/mindmap/mutations";

/**
 * Hook to track mindmap views
 * Fires the view count API call once when the mindmap is opened
 * Uses a ref to ensure the API is called only once per mount
 */
export function useTrackMindmapView(mindmapId: string) {
	const { mutate: incrementViewCount } = useIncrementViewCount();
	const hasTrackedRef = useRef(false);

	useEffect(() => {
		if (!mindmapId || hasTrackedRef.current) return;

		hasTrackedRef.current = true;
		incrementViewCount(mindmapId);
	}, [mindmapId, incrementViewCount]);
}
