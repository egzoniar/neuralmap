"use client";

import { DemoMindmapViewer } from "@/components/mindmap-ui/demo-mindmap-viewer";
import { DemoMindmapSheet } from "@/components/mindmap-ui/demo-mindmap-sheet";
import { DemoBanner } from "@/components/demo-banner";
import { useDemoInitialization } from "@/hooks/use-demo-initialization";
import { useCreateNodeDemo } from "@/demo-hooks/use-create-node-demo";
import { useCreateEdgeDemo } from "@/demo-hooks/use-create-edge-demo";
import { useDeleteNodeDemo } from "@/demo-hooks/use-delete-node-demo";
import { useDeleteEdgeDemo } from "@/demo-hooks/use-delete-edge-demo";
import { MindmapActionsProvider } from "@/contexts/mindmap-actions-context";

/**
 * Demo page - provides actions context at the page level
 * so both viewer and sheet can access the same demo actions
 */
export default function DemoPage() {
	useDemoInitialization();

	// Demo-specific hooks (no backend sync)
	const { createNode } = useCreateNodeDemo();
	const { createEdge } = useCreateEdgeDemo();
	const { deleteNodes } = useDeleteNodeDemo();
	const { deleteEdges } = useDeleteEdgeDemo();

	return (
		<MindmapActionsProvider
			value={{
				createNode,
				createEdge,
				deleteNodes,
				deleteEdges,
				isCreateNodePending: false, // Demo operations are instant
			}}
		>
			<DemoMindmapSheet />
			<div className="flex flex-col h-screen">
				<div className="p-4">
					<DemoBanner />
				</div>
				<div className="flex-1">
					<DemoMindmapViewer />
				</div>
			</div>
		</MindmapActionsProvider>
	);
}
