"use client";

import { useMemo, useCallback } from "react";
import ReactFlow, { Background, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { useAppStore } from "@/providers/store-provider";
import { NODE_TYPES } from "@/constants/ui";
import { useMindmapKeyboardDemo } from "@/demo-hooks/use-mindmap-keyboard-demo";
import { useMindmapActions } from "@/contexts/mindmap-actions-context";

/**
 * Demo-specific mindmap viewer
 * NO backend sync - all interactions are local only
 * Uses actions from MindmapActionsContext (provided at page level)
 */
export function DemoMindmapViewer() {
	// Get Zustand state and actions
	const {
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		onSelectionChange: onSelectionChangeStore,
	} = useAppStore((state) => state.mindmap);

	// Get actions from context (provided at page level)
	const { createEdge } = useMindmapActions();
	const { containerRef } = useMindmapKeyboardDemo();

	// Memoize nodeTypes to prevent ReactFlow warning
	const nodeTypes = useMemo(() => NODE_TYPES, []);

	// Local-only selection handler (no backend sync)
	const onSelectionChange = useCallback(
		(selection: { nodes: any[]; edges: any[] }) => {
			onSelectionChangeStore(selection);
		},
		[onSelectionChangeStore],
	);

	// Local-only node drag handler (no backend sync)
	const onNodeDragStop = useCallback(() => {
		// Just local state update, no backend sync needed
	}, []);

	return (
		<div
			ref={containerRef}
			tabIndex={-1}
			className="h-full w-full outline-none"
		>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={createEdge}
				onSelectionChange={onSelectionChange}
				onNodeDragStop={onNodeDragStop}
				nodeTypes={nodeTypes}
				fitView
				minZoom={0.1}
				maxZoom={2}
				deleteKeyCode={null}
				multiSelectionKeyCode="Shift"
			>
				<Background />
				<MiniMap zoomable pannable />
			</ReactFlow>
		</div>
	);
}
