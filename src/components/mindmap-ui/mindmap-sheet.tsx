"use client";

import { Sheet } from "@/components/ui/sheet";

import { useAppStore } from "@/providers/store-provider";
import { NodeSheetContent } from "@/components/mindmap-ui/node-sheet-content";
import { EdgeSheetContent } from "@/components/mindmap-ui/edge-sheet-content";
import { MultiNodeSheetContent } from "@/components/mindmap-ui/multi-node-sheet-content";

export function MindmapSheet() {
	const selection = useAppStore((state) => state.mindmap.selection);
	const { removeSelection } = useAppStore((state) => state.mindmap);

	const selectedNodes = selection?.nodes || [];
	const selectedEdges = selection?.edges || [];
	const hasMultipleNodes = selectedNodes.length > 1;
	const hasSingleNode = selectedNodes.length === 1;
	const hasSingleEdge =
		selectedEdges.length === 1 && selectedNodes.length === 0;

	const shouldOpenSheet = selectedNodes.length > 0 || selectedEdges.length > 0;

	return (
		<Sheet hideCloseButton open={shouldOpenSheet}>
			{/* Multi-Node Sheet Content */}
			{hasMultipleNodes && (
				<MultiNodeSheetContent
					selectedNodes={selectedNodes}
					onClose={removeSelection}
				/>
			)}
			{/* Single Node Sheet Content */}
			{hasSingleNode && (
				<NodeSheetContent
					nodeId={selectedNodes[0].id}
					onClose={removeSelection}
				/>
			)}
			{/* Edge Sheet Content */}
			{hasSingleEdge && (
				<EdgeSheetContent
					edgeData={selectedEdges[0]}
					onClose={removeSelection}
				/>
			)}
		</Sheet>
	);
}
