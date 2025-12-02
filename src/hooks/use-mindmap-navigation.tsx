"use client";

import { useLayoutEffect } from "react";
import { useAppStore } from "@/providers/store-provider";

/**
 * Manages navigation loading state and active mindmap synchronization.
 *
 * Architecture:
 * - Coordinates UI feedback (sidebar loading spinner) with data loading
 * - Syncs active mindmap with current URL on page load/refresh
 * - Uses useLayoutEffect to ensure synchronous state updates before paint
 * - Prevents visual inconsistency where mindmap loads but spinner still shows
 *
 * Flow:
 * 1. User clicks mindmap item → setNavigatingToMindmap(id) → Spinner shows
 * 2. Navigation happens → Page loads → Data fetches
 * 3. Data arrives → isLoaded becomes true
 * 4. useLayoutEffect fires (before paint) → setNavigatingToMindmap(null) + setActiveMindmap(id)
 * 5. Spinner clears and active state updates in sync with mindmap render
 *
 * Why useLayoutEffect:
 * - Synchronous (runs before browser paint)
 * - No visual flash of loaded mindmap + visible spinner
 * - Consistent with other sync hooks in the codebase (use-mindmap-store)
 *
 * @param mindmapId - The ID of the mindmap being navigated to
 * @param isLoaded - Whether the mindmap data has successfully loaded
 */
export function useMindmapNavigation(mindmapId: string, isLoaded: boolean) {
	const setNavigatingToMindmap = useAppStore(
		(state) => state.application.setNavigatingToMindmap,
	);
	const setActiveMindmap = useAppStore(
		(state) => state.mindmaps.setActiveMindmap,
	);

	useLayoutEffect(() => {
		if (isLoaded) {
			// Data loaded successfully - clear the loading state and sync active mindmap
			setNavigatingToMindmap(null);
			setActiveMindmap(mindmapId);
		}
	}, [isLoaded, mindmapId, setNavigatingToMindmap, setActiveMindmap]);
}
