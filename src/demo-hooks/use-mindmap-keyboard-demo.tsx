"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAppStore } from "@/providers/store-provider";
import { DeleteNodeDescription } from "@/components/dialogs/delete-node-description";
import { useDeleteNodeDemo } from "@/demo-hooks/use-delete-node-demo";
import { useDeleteEdgeDemo } from "@/demo-hooks/use-delete-edge-demo";
import { Trash2 } from "lucide-react";
import { NODE_TYPE } from "@/constants/ui";

/**
 * Demo-specific keyboard shortcuts hook
 * NO backend sync - pure local state only
 */
export function useMindmapKeyboardDemo() {
	const containerRef = useRef<HTMLDivElement>(null);
	const isDialogOpenRef = useRef(false);
	const { selection, removeSelection } = useAppStore((state) => state.mindmap);
	const { confirm } = useAppStore((state) => state.dialog);

	// Demo-specific deletion hooks (no backend sync)
	const { deleteNodes } = useDeleteNodeDemo();
	const { deleteEdges } = useDeleteEdgeDemo();

	const handleKeyDown = useCallback(
		async (event: globalThis.KeyboardEvent) => {
			if (!event.target) return;

			const target = event.target;

			// Don't handle shortcuts if user is typing
			if (
				!(target instanceof HTMLElement) ||
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.isContentEditable
			) {
				return;
			}

			// Check if event is within our container or a sheet
			const isInContainer =
				containerRef.current && containerRef.current.contains(target as Node);
			const isInSheet = target.closest('[role="dialog"]') !== null;

			if (!isInContainer && !isInSheet) {
				return;
			}

			// Handle Backspace/Delete for deletion
			if (event.key === "Backspace" || event.key === "Delete") {
				event.preventDefault();

				if (isDialogOpenRef.current) return;

				const nodesToDelete = selection?.nodes?.filter(
					(node) => node.type !== NODE_TYPE.ROOT,
				);
				const edgesToDelete = selection?.edges;

				// Handle node deletion
				if (nodesToDelete && nodesToDelete.length > 0) {
					const nodeCount = nodesToDelete.length;
					const nodeName = nodesToDelete[0]?.data?.title;

					isDialogOpenRef.current = true;

					try {
						const isConfirmed = await confirm({
							title: nodeCount > 1 ? "Delete Nodes?" : "Delete Node?",
							children: (
								<DeleteNodeDescription
									nodeName={nodeName}
									nodeCount={nodeCount}
								/>
							),
							variant: "destructive",
							confirmText: "Delete Permanently",
							cancelText: "Cancel",
							icon: <Trash2 className="w-5 h-5" />,
						});

						if (isConfirmed) {
							deleteNodes(nodesToDelete.map((node) => node.id));
							removeSelection();
						}
					} finally {
						isDialogOpenRef.current = false;
					}
				}
				// Handle edge deletion
				else if (edgesToDelete && edgesToDelete.length > 0) {
					deleteEdges(edgesToDelete.map((edge) => edge.id));
					removeSelection();
				}
			}
		},
		[selection, confirm, deleteNodes, deleteEdges, removeSelection],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return {
		containerRef,
	};
}
