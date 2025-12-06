"use client";

import { useEffect } from "react";
import { useAppStore } from "@/providers/store-provider";
import { DEMO_MINDMAP_ID, DEMO_NODES, DEMO_EDGES } from "@/constants/demo-data";
import type { Mindmap } from "@/types/mindmap";

/**
 * Hook to initialize demo state
 * Sets tier to demo and initializes mindmap with demo data
 */
export function useDemoInitialization() {
	const setTier = useAppStore((state) => state.application.setTier);
	const setMindmaps = useAppStore((state) => state.mindmaps.setMindmaps);
	const setActiveMindmap = useAppStore(
		(state) => state.mindmaps.setActiveMindmap,
	);
	const setNodes = useAppStore((state) => state.mindmap.setNodes);
	const setEdges = useAppStore((state) => state.mindmap.setEdges);

	useEffect(() => {
		// Set tier to demo
		setTier("demo");

		const now = new Date().toISOString();

		// Create demo mindmap
		const demoMindmap: Mindmap = {
			id: DEMO_MINDMAP_ID,
			title: "Welcome to NeuralMap",
			description: "Try out NeuralMap with this interactive demo",
			icon: "🎯",
			visibility: "private" as const,
			user_id: "demo-user",
			project_id: null,
			view_count: 0,
			last_viewed_at: now,
			created_at: now,
			updated_at: now,
		};

		// Set demo mindmap as the only mindmap
		setMindmaps([demoMindmap]);
		setActiveMindmap(DEMO_MINDMAP_ID);

		// Initialize with demo nodes and edges
		setNodes(DEMO_NODES);
		setEdges(DEMO_EDGES);
	}, [setTier, setMindmaps, setActiveMindmap, setNodes, setEdges]);
}
