"use client";

import { use } from "react";
import { MindmapViewer } from "@/components/mindmap-ui/mindmap-viewer";
import { MindmapSheet } from "@/components/mindmap-ui/mindmap-sheet";
import { MindmapErrorBoundary } from "@/components/error-boundary/mindmap-error-boundary";
import { useTrackMindmapView } from "@/hooks/use-track-mindmap-view";
import { useCreateNode } from "@/hooks/use-create-node";
import { useCreateEdge } from "@/hooks/use-create-edge";
import { useDeleteNode } from "@/hooks/use-delete-node";
import { useDeleteEdge } from "@/hooks/use-delete-edge";
import { MindmapActionsProvider } from "@/contexts/mindmap-actions-context";

interface MindmapPageProps {
	params: Promise<{
		id: string;
	}>;
}

/**
 * Mindmap page - provides actions context at the page level
 * so both viewer and sheet can access the same authenticated actions
 */
export default function MindmapPage({ params }: MindmapPageProps) {
	const { id } = use(params);
	useTrackMindmapView(id);

	// Auth hooks (with backend sync)
	const { createNode, isPending } = useCreateNode();
	const { createEdge } = useCreateEdge();
	const { deleteNodes } = useDeleteNode();
	const { deleteEdges } = useDeleteEdge();

	return (
		<MindmapActionsProvider
			value={{
				createNode,
				createEdge,
				deleteNodes,
				deleteEdges,
				isCreateNodePending: isPending,
			}}
		>
			<MindmapSheet />
			<MindmapErrorBoundary mindmapId={id}>
				<MindmapViewer mindmapId={id} />
			</MindmapErrorBoundary>
		</MindmapActionsProvider>
	);
}
