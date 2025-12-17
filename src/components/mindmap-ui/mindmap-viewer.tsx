"use client";

import { useMemo, useCallback } from "react";
import ReactFlow, { Background, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { useAppStore } from "@/providers/store-provider";
import { NODE_TYPES } from "@/constants/ui";
import { useMindmapKeyboard } from "@/hooks/use-mindmap-keyboard";
import { useMindmapNavigation } from "@/hooks/use-mindmap-navigation";
import { useQueryAuthError } from "@/hooks/use-query-auth-error";
import { useGetMindmap } from "@/services/mindmap/queries";
import { useNodeDragSync } from "@/hooks/use-node-drag-sync";
import { useSelectionSync } from "@/hooks/use-selection-sync";
import { Skeleton } from "@/components/ui/skeleton";
import { useMindmapStore } from "@/hooks/use-mindmap-store";
import { MindmapErrorState } from "@/components/mindmap-ui/mindmap-error-state";
import { DEMO_MINDMAP_ID } from "@/constants/demo-data";
import { useMindmapActions } from "@/contexts/mindmap-actions-context";

interface MindmapViewerProps {
	mindmapId: string;
}

export function MindmapViewer({ mindmapId }: MindmapViewerProps) {
	// Check if this is the demo mindmap
	const isDemo = mindmapId === DEMO_MINDMAP_ID;

	// Fetch mindmap data (disabled for demo)
	const { data: mindmap, isLoading, error } = useGetMindmap(mindmapId);

	// Handle Auth0 errors with automatic redirect to login
	useQueryAuthError(error, `/map/${mindmapId}`);

	// Get Zustand actions for handling interactions
	const {
		onNodesChange,
		onEdgesChange,
		onSelectionChange: onSelectionChangeStore,
	} = useAppStore((state) => state.mindmap);

	// Get actions from context (provided at page level)
	const { createEdge } = useMindmapActions();

	// Hook for debounced node position sync (500ms after drag ends)
	const { onNodeDragStop } = useNodeDragSync();

	// Hook for debounced selection state sync (1000ms after selection changes)
	const { syncSelection } = useSelectionSync();

	// Memoize the selection change handler to prevent infinite loops
	// Sync both selection AND deselection to backend
	const onSelectionChange = useCallback(
		(selection: { nodes: any[]; edges: any[] }) => {
			// 1. Update local state immediately
			onSelectionChangeStore(selection);

			// 2. Queue debounced backend sync (for both selection and deselection)
			// This allows users to return to their mindmap in the exact state they left it
			syncSelection();
		},
		[onSelectionChangeStore, syncSelection],
	);

	// Sync server state with client state
	// The hook has built-in guards against stale cached data
	const { nodes, edges } = useMindmapStore(
		mindmap?.content.nodes,
		mindmap?.content.edges,
		mindmapId,
	);

	// Handle keyboard shortcuts with custom hook
	const { containerRef } = useMindmapKeyboard();

	// Manage navigation loading state (clears sidebar spinner when data loads)
	useMindmapNavigation(mindmapId, !!mindmap);

	// Memoize nodeTypes to prevent ReactFlow warning about object recreation
	const nodeTypes = useMemo(() => NODE_TYPES, []);

	// Early returns AFTER all hooks
	if (isLoading) {
		return (
			<div
				style={{ height: "calc(100vh - 64px - 1rem)" }}
				className="flex w-full items-center justify-center bg-gray-50/50"
			>
				<div className="relative w-full h-full flex items-center justify-center">
					{/* Center Root Node Skeleton */}
					<div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2">
						<Skeleton className="h-20 w-48 rounded-lg shadow-md" />
					</div>
				</div>
			</div>
		);
	}

	if (error && !isDemo) {
		return <MindmapErrorState error={error} />;
	}

	// For demo, only check nodes/edges; for regular mindmaps, also check mindmap data
	if (!nodes || !edges || (!isDemo && !mindmap)) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<p className="text-muted-foreground">Mindmap not found</p>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			className="w-full h-screen outline-none"
			tabIndex={-1} // Make div focusable for keyboard events
		>
			<ReactFlow
				minZoom={0.15}
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={createEdge}
				onSelectionChange={onSelectionChange}
				onNodeDragStop={onNodeDragStop}
				deleteKeyCode={null} // Disable delete/backspace key (we handle with custom dialog)
				panActivationKeyCode={null} // Disable pan activation key
				zoomActivationKeyCode={null} // Disable zoom activation key
				fitView
			>
				<Background />
				<MiniMap />
			</ReactFlow>
		</div>
	);
}
