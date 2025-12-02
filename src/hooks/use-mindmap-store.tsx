"use client";

import { useRef, useLayoutEffect } from "react";
import { useAppStore } from "@/providers/store-provider";
import type { Node, Edge } from "reactflow";

/**
 * Hook to sync server state (React Query) with working copy (Zustand).
 *
 * Architecture:
 * - React Query = source of truth (server state)
 * - Zustand = working copy + pending changes (client state)
 * - This hook bridges them using useLayoutEffect (synchronous, before paint)
 *
 * Flow:
 * 1. React Query fetches mindmap
 * 2. This hook initializes Zustand (one-time per mindmap)
 * 3. User edits → Zustand updates → Triggers saves
 * 4. Saves complete → React Query refetches → Updates Zustand
 *
 * Why useLayoutEffect:
 * - Synchronous (runs before browser paint)
 * - Prevents "setState during render" errors
 * - No flash of wrong content (unlike useEffect)
 */
export function useMindmapStore(
	serverNodes: Node[] | undefined,
	serverEdges: Edge[] | undefined,
	mindmapId: string,
) {
	const initializeMindmap = useAppStore(
		(state) => state.mindmap.initializeMindmap,
	);
	const nodes = useAppStore((state) => state.mindmap.nodes);
	const edges = useAppStore((state) => state.mindmap.edges);

	// Track both the last initialized ID and the data snapshot
	// This prevents initializing with stale cached data from a different mindmap
	const lastInitialized = useRef<{
		id: string;
		nodesSnapshot: Node[];
		edgesSnapshot: Edge[];
	} | null>(null);

	// Initialize Zustand when new mindmap data arrives
	// useLayoutEffect is synchronous and runs before paint - no flicker!
	useLayoutEffect(() => {
		// Guard: only initialize if we have data and ID has changed
		if (
			!serverNodes ||
			!serverEdges ||
			mindmapId === lastInitialized.current?.id
		) {
			return;
		}

		// Additional safety: verify this isn't stale cached data from navigation
		const isSameData =
			lastInitialized.current &&
			serverNodes === lastInitialized.current.nodesSnapshot &&
			serverEdges === lastInitialized.current.edgesSnapshot;

		if (!isSameData) {
			initializeMindmap(serverNodes, serverEdges);
			lastInitialized.current = {
				id: mindmapId,
				nodesSnapshot: serverNodes,
				edgesSnapshot: serverEdges,
			};
		}
	}, [serverNodes, serverEdges, mindmapId, initializeMindmap]);

	return { nodes, edges };
}
