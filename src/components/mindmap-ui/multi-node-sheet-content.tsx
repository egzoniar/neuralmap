import {
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetClose,
	SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/providers/store-provider";
import { useDeleteNode } from "@/hooks/use-delete-node";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { DeleteNodeDescription } from "@/components/dialogs/delete-node-description";
import {
	Trash2,
	AlertTriangle,
	Layers,
	FileUp,
	Copy,
	CheckSquare,
	Zap,
} from "lucide-react";
import type { Node } from "reactflow";
import { cn } from "@/lib/utils";
import { NODE_TYPE } from "@/constants/ui";

interface MultiNodeSheetContentProps {
	selectedNodes: Node[];
	onClose: () => void;
}

export function MultiNodeSheetContent({
	selectedNodes,
	onClose,
}: MultiNodeSheetContentProps) {
	const { confirm } = useAppStore((state) => state.dialog);

	// Hook for immediate node deletion with backend sync
	const { deleteNodes } = useDeleteNode();

	// Filter out root nodes from the selection
	const deletableNodes = selectedNodes.filter(
		(node) => node.type !== NODE_TYPE.ROOT,
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
		<SheetContent
			className={cn(
				"p-[.7rem] pr-4 flex flex-col gap-6 min-w-[500px] sm:w-[540px] overflow-y-auto",
			)}
		>
			<SheetClose onClick={onClose} />
			<SheetHeader>
				<SheetTitle className="flex items-center gap-2 text-lg">
					<Layers className="size-4" />
					Multiple Nodes Selected
				</SheetTitle>
				<SheetDescription className="text-xs">
					{nodeCount} {nodeCount === 1 ? "node" : "nodes"} selected. Manage your
					selection or perform bulk operations.
				</SheetDescription>
			</SheetHeader>
			<div className="flex flex-col gap-6">
				{/* Selection Summary */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-semibold flex items-center gap-2">
							<CheckSquare className="size-4 text-muted-foreground" />
							Selection Summary
						</h3>
						<span className="text-xs font-medium text-muted-foreground">
							{nodeCount} {nodeCount === 1 ? "node" : "nodes"}
						</span>
					</div>

					{/* List of selected nodes */}
					<div className="rounded-lg border bg-muted/30">
						<ScrollArea className="h-[130px]">
							<div className="p-1">
								<div className="flex flex-col gap-0.5">
									{selectedNodes.map((node, index) => (
										<div
											key={node.id}
											className="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent/50 transition-colors"
										>
											<span className="text-muted-foreground font-mono text-xs tabular-nums w-6">
												{index + 1}.
											</span>
											<span className="font-medium truncate flex-1">
												{node.data.title || "Untitled Node"}
											</span>
											{node.type === NODE_TYPE.ROOT && (
												<Badge variant="secondary" className="text-xs">
													Root
												</Badge>
											)}
										</div>
									))}
								</div>
							</div>
						</ScrollArea>
					</div>
				</div>

				<Separator />

				{/* Bulk Actions */}
				<div className="flex flex-col gap-3">
					<h3 className="text-sm font-semibold flex items-center gap-2">
						<Zap className="size-4 text-muted-foreground" />
						Bulk Actions
					</h3>
					<p className="text-xs text-muted-foreground leading-relaxed">
						Apply operations to all selected nodes at once
					</p>

					{/* Export Selection - Disabled */}
					<Button
						variant="outline"
						className="w-full justify-start text-xs"
						disabled
						onClick={handleExportSelection}
					>
						<FileUp className="size-3.5 mr-2" strokeWidth={2} />
						Export Selection
						<span className="ml-auto text-xs text-muted-foreground">
							Coming Soon
						</span>
					</Button>

					{/* Duplicate Selection - Disabled */}
					<Button
						variant="outline"
						className="w-full justify-start text-xs"
						disabled
						onClick={handleDuplicateSelection}
					>
						<Copy className="size-3.5 mr-2" strokeWidth={2} />
						Duplicate Selection
						<span className="ml-auto text-xs text-muted-foreground">
							Coming Soon
						</span>
					</Button>
				</div>

				{/* Danger Zone or Warning */}
				{deletableCount > 0 ? (
					<>
						<Separator />
						<div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
							<div className="flex flex-col gap-3">
								<div className="flex items-center gap-2">
									<AlertTriangle className="size-4 text-destructive" />
									<h3 className="text-sm font-semibold text-destructive">
										Danger Zone
									</h3>
								</div>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Permanently remove {deletableCount}{" "}
									{deletableCount === 1 ? "node" : "nodes"} from your mindmap.
									This action cannot be undone.
									{deletableCount < nodeCount && (
										<span className="block mt-2 text-amber-600 dark:text-amber-500 font-medium">
											Note: {nodeCount - deletableCount} root{" "}
											{nodeCount - deletableCount === 1 ? "node" : "nodes"} will
											be skipped
										</span>
									)}
								</p>
								<Button
									variant="destructive"
									size="sm"
									className="w-full text-xs"
									onClick={handleDeleteAllNodes}
								>
									<Trash2 className="size-3.5 mr-2" strokeWidth={2} />
									Delete {deletableCount} Selected{" "}
									{deletableCount === 1 ? "Node" : "Nodes"}
								</Button>
							</div>
						</div>
					</>
				) : (
					<>
						<Separator />
						<div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-2">
									<AlertTriangle className="size-4 text-amber-600 dark:text-amber-500" />
									<h3 className="text-sm font-semibold text-amber-600 dark:text-amber-500">
										Cannot Delete Selection
									</h3>
								</div>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Root nodes cannot be deleted. Deselect the root node to
									perform delete operations on other nodes.
								</p>
							</div>
						</div>
					</>
				)}
			</div>
		</SheetContent>
	);
}
