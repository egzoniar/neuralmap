interface DeleteNodeDescriptionProps {
	nodeName?: string;
	nodeCount: number;
}

/**
 * Reusable content component for node deletion confirmation dialogs.
 * Displays a detailed explanation of what happens when a node is deleted.
 * Supports both single and multiple node deletion.
 */
export function DeleteNodeDescription({
	nodeName,
	nodeCount,
}: DeleteNodeDescriptionProps) {
	// Determine if we're deleting multiple nodes
	const isMultiple = nodeCount > 1;

	return (
		<div className="space-y-3">
			<p className="text-sm text-muted-foreground">
				Are you sure you want to delete{" "}
				<span className="font-semibold text-foreground">
					{isMultiple ? `${nodeCount} nodes` : `"${nodeName || "this node"}"`}
				</span>
				?
			</p>
			<p className="text-sm text-muted-foreground">
				This action cannot be undone. All connections to{" "}
				{isMultiple ? "these nodes" : "this node"} will be removed.
			</p>
		</div>
	);
}
