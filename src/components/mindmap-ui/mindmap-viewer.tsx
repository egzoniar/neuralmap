"use client";

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

	return (
		<div className="w-full" style={{ height: "calc(100vh - 64px - 1rem)" }}>
			<ReactFlow
				minZoom={0.15}
				nodes={nodes}
				edges={edges}
				nodeTypes={NODE_TYPES}
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
