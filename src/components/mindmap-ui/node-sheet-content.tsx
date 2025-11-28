import {
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetContent,
	SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DeleteNodeDialog } from "./delete-node-dialog";
import { TiptapEditor } from "../tiptap-editor/tiptap";
import { useAppStore } from "@/providers/store-provider";
import { NodeDirectionButtons } from "./node-direction-buttons";
import { Separator } from "@/components/ui/separator";
import { Trash2, AlertTriangle, Heading, FileText, Zap } from "lucide-react";
import { useState } from "react";

interface NodeSheetContentProps {
	nodeId: string;
	onClose: () => void;
}

export function NodeSheetContent({ nodeId, onClose }: NodeSheetContentProps) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	// Get the latest node data directly from the store
	const node = useAppStore((state) =>
		state.mindmap.nodes.find((n) => n.id === nodeId),
	);
	const updateNodeData = useAppStore((state) => state.mindmap.updateNodeData);
	const deleteNode = useAppStore((state) => state.mindmap.deleteNode);

	// If node not found, don't render
	if (!node) return null;

	const nodeData = node.data;
	const isRootNode = node.type === "rootNode";

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateNodeData(nodeId, { title: e.target.value });
	};

	const handleContentChange = (richText: string) => {
		updateNodeData(nodeId, { content: richText });
	};

	const handleDeleteNode = () => {
		deleteNode(nodeId);
		onClose();
	};

	return (
		<SheetContent className="flex flex-col gap-6 min-w-[500px] sm:w-[540px] overflow-y-auto">
			<SheetClose onClick={onClose} />
			<SheetHeader>
				<SheetTitle>{isRootNode ? "Edit Root Node" : "Edit Node"}</SheetTitle>
				<SheetDescription>
					{isRootNode
						? "Here you can edit the root node title. This is the main topic of your mindmap."
						: "Here you can edit the node, add a description, or add a link. You can write code or format text any way you want."}
				</SheetDescription>
			</SheetHeader>
			<div className="flex flex-col gap-4 sidebar-content">
				{/* Title Section */}
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<Heading className="w-4 h-4 text-muted-foreground" />
						<Label className="text-base">Title</Label>
					</div>
					<p className="text-xs text-muted-foreground -mt-1 mb-1">
						{isRootNode
							? "The main topic of your mindmap"
							: "Give your node a clear, concise name"}
					</p>
					<Input
						type="text"
						value={nodeData.title || ""}
						onChange={handleTitleChange}
					/>
				</div>

				{/* Content Section - Only for non-root nodes */}
				{!isRootNode && (
					<>
						<Separator />
						<div className="flex flex-col gap-2 sidebar-content">
							<div className="flex items-center gap-2">
								<FileText className="w-4 h-4 text-muted-foreground" />
								<Label className="text-base">Content</Label>
							</div>
							<p className="text-xs text-muted-foreground -mt-1 mb-1">
								Add detailed notes, code snippets, links, or formatted text to
								this node
							</p>
							<TiptapEditor
								content={nodeData.content || ""}
								onChange={handleContentChange}
							/>
						</div>
					</>
				)}

				<Separator />

				{/* Quick Add Node Section */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2">
						<Zap className="w-4 h-4 text-muted-foreground" />
						<Label className="text-base">Quick Add Node</Label>
					</div>
					<p className="text-xs text-muted-foreground -mt-1">
						Create a new connected node in any direction with one click
					</p>
					<NodeDirectionButtons nodeId={nodeId} isRootNode={isRootNode} />
				</div>

				{/* Danger Zone Section - Only for non-root nodes */}
				{!isRootNode && (
					<>
						<Separator />
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-2">
								<AlertTriangle className="w-4 h-4 text-destructive" />
								<Label className="text-base text-destructive">
									Danger Zone
								</Label>
							</div>
							<p className="text-xs text-muted-foreground -mt-1">
								Permanently remove this node from your mindmap
							</p>
							<Button
								variant="destructive"
								className="w-full"
								onClick={() => setIsDeleteDialogOpen(true)}
							>
								<Trash2 className="w-4 h-4 mr-2" />
								Delete Node
							</Button>
						</div>
					</>
				)}
			</div>

			{/* Delete Confirmation Dialog */}
			<DeleteNodeDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				onConfirm={handleDeleteNode}
				nodeName={nodeData.title}
			/>
		</SheetContent>
	);
}
