"use client";

import { useMemo } from "react";
import ReactFlow, {
	Background,
	MiniMap,
	type Edge,
	type Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { useAppStore } from "@/providers/store-provider";
import { NODE_TYPES } from "@/constants/ui";

interface MindmapViewerProps {
	initialNodes: Node[];
	initialEdges: Edge[];
	mindmapId: string;
}

export default function MindmapViewer({
	initialNodes,
	initialEdges,
	mindmapId,
}: MindmapViewerProps) {
	// Use your Zustand store instead of ReactFlow's hooks
	const {
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		onConnect,
		onSelectionChange,
		selection,
	} = useAppStore((state) => state.mindmap);

	// Memoize nodeTypes and edgeTypes to prevent recreation on each render
	const nodeTypes = useMemo(() => ({ ...NODE_TYPES }), []);

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onSelectionChange={onSelectionChange}
				fitView
			>
				<Background />
				<MiniMap />
			</ReactFlow>
		</div>
	);
}
