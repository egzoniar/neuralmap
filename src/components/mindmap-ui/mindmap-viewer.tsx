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
import { useMindmapKeyboard } from "@/hooks/use-mindmap-keyboard";

interface MindmapViewerProps {
	initialNodes: Node[];
	initialEdges: Edge[];
	mindmapId: string;
}

export function MindmapViewer({
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
	} = useAppStore((state) => state.mindmap);

	// Handle keyboard shortcuts with custom hook
	const { containerRef } = useMindmapKeyboard();

	return (
		<div
			ref={containerRef}
			className="w-full"
			style={{ height: "calc(100vh - 64px - 1rem)" }}
			tabIndex={-1} // Make div focusable for keyboard events
		>
			<ReactFlow
				minZoom={0.15}
				nodes={nodes}
				edges={edges}
				nodeTypes={NODE_TYPES}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onSelectionChange={onSelectionChange}
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
