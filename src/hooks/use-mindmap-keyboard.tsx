import { useCallback, useEffect, useRef } from "react";
import { useAppStore } from "@/providers/store-provider";
import { DeleteNodeDescription } from "@/components/dialogs/delete-node-description";
import { Trash2 } from "lucide-react";

/**
 * Custom hook to handle keyboard shortcuts for the mindmap
 * Returns a ref to attach to the ReactFlow container for proper event scoping
 */
export function useMindmapKeyboard() {
	const containerRef = useRef<HTMLDivElement>(null);
	const isDialogOpenRef = useRef(false);
	const { selection, removeSelection, deleteNode } = useAppStore(
		(state) => state.mindmap,
	);
	const { confirm } = useAppStore((state) => state.dialog);

	const handleKeyDown = useCallback(
		async (event: globalThis.KeyboardEvent) => {
			// Validate event target exists
			if (!event.target) {
				return;
			}

			// Check if the event target is within our container
			if (
				!containerRef.current ||
				!containerRef.current.contains(event.target as Node)
			) {
				return;
			}

			// Don't handle shortcuts if user is typing in an input/textarea
			const target = event.target;
			if (
				!(target instanceof HTMLElement) ||
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.isContentEditable
			) {
				return;
			}

			// Handle Backspace/Delete for node deletion
			if (event.key === "Backspace" || event.key === "Delete") {
				event.preventDefault();

				// Prevent concurrent dialog calls (race condition guard)
				if (isDialogOpenRef.current) {
					return;
				}

				// Check if there are selected nodes (excluding root nodes)
				const nodesToDelete = selection?.nodes?.filter(
					(node) => node.type !== "rootNode",
				);

				if (nodesToDelete && nodesToDelete.length > 0) {
					const nodeName = nodesToDelete[0]?.data?.title || "this node";

					// Mark dialog as open to prevent concurrent calls
					isDialogOpenRef.current = true;

					try {
						// Show confirmation dialog
						const isConfirmed = await confirm({
							title: "Delete Node?",
							children: <DeleteNodeDescription nodeName={nodeName} />,
							variant: "destructive",
							confirmText: "Delete Permanently",
							cancelText: "Cancel",
							icon: <Trash2 className="w-5 h-5" />,
						});

						// If confirmed, delete the nodes
						if (isConfirmed) {
							// Delete each selected node
							nodesToDelete.forEach((node) => {
								deleteNode(node.id);
							});
							// Clear selection after deletion
							removeSelection();
						}
					} finally {
						// Always reset the flag when dialog is closed
						isDialogOpenRef.current = false;
					}
				}
			}
		},
		[selection, confirm, deleteNode, removeSelection],
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
