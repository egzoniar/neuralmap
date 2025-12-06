"use client";

import { Sheet } from "@/components/ui/sheet";
import { useAppStore } from "@/providers/store-provider";
import { NodeSheetContent } from "@/components/mindmap-ui/node-sheet-content";

/**
 * Demo-specific mindmap sheet
 * Uses universal NodeSheetContent component (context-aware)
 * Only shows node editing (no edge editing, no multi-select for simplicity)
 * NO backend sync - pure local state only (via context)
 */
export function DemoMindmapSheet() {
	const selection = useAppStore((state) => state.mindmap.selection);
	const { removeSelection } = useAppStore((state) => state.mindmap);

	const selectedNodes = selection?.nodes || [];
	const hasSingleNode = selectedNodes.length === 1;

	return (
		<Sheet hideCloseButton open={hasSingleNode}>
			{hasSingleNode && (
				<NodeSheetContent
					nodeId={selectedNodes[0].id}
					onClose={removeSelection}
				/>
			)}
		</Sheet>
	);
}
