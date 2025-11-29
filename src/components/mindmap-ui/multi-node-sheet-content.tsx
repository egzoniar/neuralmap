import {
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetContent,
	SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/providers/store-provider";
import { Separator } from "@/components/ui/separator";
import { DeleteNodeDescription } from "@/components/dialogs/delete-node-description";
import { Trash2, AlertTriangle, FileDown, Copy, Layers } from "lucide-react";
import type { Node } from "reactflow";

interface MultiNodeSheetContentProps {
	selectedNodes: Node[];
	onClose: () => void;
}

export function MultiNodeSheetContent({
	selectedNodes,
	onClose,
}: MultiNodeSheetContentProps) {
	const deleteNodes = useAppStore((state) => state.mindmap.deleteNodes);
	const { confirm } = useAppStore((state) => state.dialog);

	// Filter out root nodes from the selection
	const deletableNodes = selectedNodes.filter(
		(node) => node.type !== "rootNode",
	);
	const nodeCount = selectedNodes.length;
	const deletableCount = deletableNodes.length;

	const handleDeleteAllNodes = async () => {
		if (deletableCount === 0) {
			return;
		}

		const isConfirmed = await confirm({
			title: "Delete Multiple Nodes?",
			children: (
				<DeleteNodeDescription nodeName="" nodeCount={deletableCount} />
			),
			variant: "destructive",
			confirmText: "Delete Permanently",
			cancelText: "Cancel",
			icon: <Trash2 className="w-5 h-5" />,
		});

		if (isConfirmed) {
			deleteNodes(deletableNodes.map((node) => node.id));
			onClose();
		}
	};

	const handleExportSelection = () => {
		// TODO: Implement export logic
		console.log("Export selection - Not implemented yet");
	};

	const handleDuplicateSelection = () => {
		// TODO: Implement duplicate logic
		console.log("Duplicate selection - Not implemented yet");
	};

	return (
		<SheetContent className="flex flex-col gap-6 min-w-[500px] sm:w-[540px] overflow-y-auto">
			<SheetClose onClick={onClose} />
			<SheetHeader>
				<SheetTitle>Multiple Nodes Selected ({nodeCount})</SheetTitle>
				<SheetDescription>
					Perform bulk operations on selected nodes or view the selection
					summary
				</SheetDescription>
			</SheetHeader>
			<div className="flex flex-col gap-4 sidebar-content">
				{/* Selection Summary Section */}
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<Layers className="w-4 h-4 text-muted-foreground" />
						<h3 className="text-base font-semibold">Selection Summary</h3>
					</div>
					<p className="text-xs text-muted-foreground -mt-1 mb-2">
						{nodeCount} {nodeCount === 1 ? "node" : "nodes"} currently selected
					</p>

					{/* List of selected nodes */}
					<div className="flex flex-col gap-1 max-h-[200px] overflow-y-auto rounded-md border p-3 bg-muted/30">
						{selectedNodes.map((node, index) => (
							<div
								key={node.id}
								className="flex items-center gap-2 text-sm py-1"
							>
								<span className="text-muted-foreground font-mono text-xs">
									{index + 1}.
								</span>
								<span className="font-medium truncate">
									{node.data.title || "Untitled Node"}
								</span>
								{node.type === "rootNode" && (
									<span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
										Root
									</span>
								)}
							</div>
						))}
					</div>
				</div>

				<Separator />

				{/* Bulk Actions Section */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2">
						<AlertTriangle className="w-4 h-4 text-muted-foreground" />
						<h3 className="text-base font-semibold">Bulk Actions</h3>
					</div>
					<p className="text-xs text-muted-foreground -mt-1 mb-1">
						Apply operations to all selected nodes at once
					</p>

					{/* Export Selection - Disabled */}
					<Button
						variant="outline"
						className="w-full justify-start"
						disabled
						onClick={handleExportSelection}
					>
						<FileDown className="w-4 h-4 mr-2" />
						Export Selection
						<span className="ml-auto text-xs text-muted-foreground">
							Coming Soon
						</span>
					</Button>

					{/* Duplicate Selection - Disabled */}
					<Button
						variant="outline"
						className="w-full justify-start"
						disabled
						onClick={handleDuplicateSelection}
					>
						<Copy className="w-4 h-4 mr-2" />
						Duplicate Selection
						<span className="ml-auto text-xs text-muted-foreground">
							Coming Soon
						</span>
					</Button>
				</div>

				{/* Danger Zone Section */}
				{deletableCount > 0 && (
					<>
						<Separator />
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-2">
								<AlertTriangle className="w-4 h-4 text-destructive" />
								<h3 className="text-base font-semibold text-destructive">
									Danger Zone
								</h3>
							</div>
							<p className="text-xs text-muted-foreground -mt-1">
								Permanently remove all selected nodes from your mindmap
								{deletableCount < nodeCount && (
									<span className="block mt-1 text-amber-600 dark:text-amber-500">
										Note: Root nodes cannot be deleted (
										{nodeCount - deletableCount} will be skipped)
									</span>
								)}
							</p>
							<Button
								variant="destructive"
								className="w-full"
								onClick={handleDeleteAllNodes}
							>
								<Trash2 className="w-4 h-4 mr-2" />
								Delete All Selected ({deletableCount})
							</Button>
						</div>
					</>
				)}

				{/* Warning if only root nodes are selected */}
				{deletableCount === 0 && (
					<div className="flex flex-col gap-2 p-3 rounded-md bg-muted/50 border border-amber-600/20">
						<div className="flex items-center gap-2">
							<AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500" />
							<p className="text-sm font-medium">Cannot Delete Selection</p>
						</div>
						<p className="text-xs text-muted-foreground">
							Root nodes cannot be deleted. Please deselect the root node to
							perform bulk delete operations.
						</p>
					</div>
				)}
			</div>
		</SheetContent>
	);
}
