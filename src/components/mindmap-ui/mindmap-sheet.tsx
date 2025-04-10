"use client";

import { Sheet } from "@/components/ui/sheet";

import { useAppStore } from "@/providers/store-provider";
import { NodeSheetContent } from "@/components/mindmap-ui/node-sheet-content";
import { EdgeSheetContent } from "@/components/mindmap-ui/edge-sheet-content";

export function MindmapSheet() {
	const selection = useAppStore((state) => state.mindmap.selection);
	const { removeSelection } = useAppStore((state) => state.mindmap);
	const selectedNode = selection?.nodes[0];
	const selectedEdge = selection?.edges[0];

	const shouldOpenSheet = !!(selectedNode || selectedEdge);

	return (
		<Sheet hideCloseButton open={shouldOpenSheet}>
			{/* Node Sheet Content */}
			{selectedNode && (
				<NodeSheetContent
					nodeData={selectedNode.data}
					onClose={removeSelection}
				/>
			)}
			{/* Edge Sheet Content */}
			{selectedEdge && (
				<EdgeSheetContent edgeData={selectedEdge} onClose={removeSelection} />
			)}
		</Sheet>
	);
}
