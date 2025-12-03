import { useCallback, useEffect, useRef } from "react";
import { useAppStore } from "@/providers/store-provider";
import { DeleteNodeDescription } from "@/components/dialogs/delete-node-description";
import { useDeleteNode } from "@/hooks/use-delete-node";
import { useDeleteEdge } from "@/hooks/use-delete-edge";
import { Trash2 } from "lucide-react";
import { NODE_TYPE } from "@/constants/ui";

/**
 * Custom hook to handle keyboard shortcuts for the mindmap
 * Returns a ref to attach to the ReactFlow container for proper event scoping
 */
export function useMindmapKeyboard() {
	const containerRef = useRef<HTMLDivElement>(null);
	const isDialogOpenRef = useRef(false);
	const { selection, removeSelection } = useAppStore((state) => state.mindmap);
	const { confirm } = useAppStore((state) => state.dialog);

	// Hooks for immediate backend sync
	const { deleteNodes } = useDeleteNode();
	const { deleteEdges } = useDeleteEdge();

	const handleKeyDown = useCallback(
		async (event: globalThis.KeyboardEvent) => {
			// Validate event target exists
			if (!event.target) {
				return;
			}

			const target = event.target;

			// Don't handle shortcuts if user is typing in an input/textarea
			if (
				!(target instanceof HTMLElement) ||
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.isContentEditable
			) {
				return;
			}

			// Check if the event target is within our container OR within a sheet
			// (sheets can contain edge/node details and should allow keyboard shortcuts)
			const isInContainer =
				containerRef.current && containerRef.current.contains(target as Node);
			const isInSheet = target.closest('[role="dialog"]') !== null;

			if (!isInContainer && !isInSheet) {
				return;
			}

			// Handle Backspace/Delete for node and edge deletion
			if (event.key === "Backspace" || event.key === "Delete") {
				event.preventDefault();

				// Prevent concurrent dialog calls (race condition guard)
				if (isDialogOpenRef.current) {
					return;
				}

				// Check if there are selected nodes (excluding root nodes)
				const nodesToDelete = selection?.nodes?.filter(
					(node) => node.type !== NODE_TYPE.ROOT,
				);

				// Check if there are selected edges
				const edgesToDelete = selection?.edges;

				// Handle node deletion
				if (nodesToDelete && nodesToDelete.length > 0) {
					const nodeCount = nodesToDelete.length;
					const nodeName = nodesToDelete[0]?.data?.title;

					// Mark dialog as open to prevent concurrent calls
					isDialogOpenRef.current = true;

					try {
						// Show confirmation dialog
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

						// If confirmed, delete the nodes
						if (isConfirmed) {
							// Delete all selected nodes in batch
							deleteNodes(nodesToDelete.map((node) => node.id));
							// Clear selection after deletion
							removeSelection();
						}
					} finally {
						// Always reset the flag when dialog is closed
						isDialogOpenRef.current = false;
					}
				}
				// Handle edge deletion (only if no nodes are selected)
				else if (edgesToDelete && edgesToDelete.length > 0) {
					// Delete all selected edges in batch (no confirmation needed)
					deleteEdges(edgesToDelete.map((edge) => edge.id));
					// Clear selection after deletion
					removeSelection();
				}
			}
		},
		[selection, confirm, deleteNodes, deleteEdges, removeSelection],
	);

	// Set up and clean up keyboard event listener
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
