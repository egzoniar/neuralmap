import {
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetClose,
	SheetContent,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TiptapEditor } from "../tiptap-editor/tiptap";
import { useAppStore } from "@/providers/store-provider";
import { NodeDirectionButtons } from "./node-direction-buttons";
import { Separator } from "@/components/ui/separator";
import { DeleteNodeDescription } from "@/components/dialogs/delete-node-description";
import {
	Trash2,
	AlertTriangle,
	Heading,
	FileText,
	Zap,
	Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NodeSheetContentProps {
	nodeId: string;
	onClose: () => void;
}

export function NodeSheetContent({ nodeId, onClose }: NodeSheetContentProps) {
	// Get the latest node data directly from the store
	const node = useAppStore((state) =>
		state.mindmap.nodes.find((n) => n.id === nodeId),
	);
	const updateNodeData = useAppStore((state) => state.mindmap.updateNodeData);
	const deleteNode = useAppStore((state) => state.mindmap.deleteNode);
	const { confirm } = useAppStore((state) => state.dialog);

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

	const handleDeleteNode = async () => {
		const isConfirmed = await confirm({
			title: "Delete Node?",
			children: (
				<DeleteNodeDescription nodeName={nodeData.title} nodeCount={1} />
			),
			variant: "destructive",
			confirmText: "Delete Permanently",
			cancelText: "Cancel",
			icon: <Trash2 className="w-5 h-5" />,
		});

		if (isConfirmed) {
			deleteNode(nodeId);
			onClose();
		}
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
					<Edit3 className="size-4" />
					{isRootNode ? "Edit Root Node" : "Edit Node"}
				</SheetTitle>
				<SheetDescription className="text-xs">
					{isRootNode
						? "Edit the main topic of your mindmap. This is the central idea everything connects to."
						: "Edit node details, add rich content, or quickly create connected nodes."}
				</SheetDescription>
			</SheetHeader>
			<div className="flex flex-col gap-6">
				{/* Title Section */}
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="node-title"
							className="text-sm font-semibold flex items-center gap-2"
						>
							<Heading className="size-4 text-muted-foreground" />
							Title
						</Label>
						<p className="text-xs text-muted-foreground leading-relaxed">
							{isRootNode
								? "The main topic of your mindmap"
								: "Give your node a clear, concise name"}
						</p>
						<Input
							id="node-title"
							type="text"
							placeholder={
								isRootNode ? "Enter main topic..." : "Enter node title..."
							}
							value={nodeData.title || ""}
							onChange={handleTitleChange}
						/>
					</div>
				</div>

				{/* Content Section - Only for non-root nodes */}
				{!isRootNode && (
					<>
						<Separator />
						<div className="flex flex-col gap-3">
							<div className="flex flex-col gap-2">
								<Label className="text-sm font-semibold flex items-center gap-2">
									<FileText className="size-4 text-muted-foreground" />
									Content
								</Label>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Add detailed notes, code snippets, links, or formatted text
								</p>
							</div>
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
					<div className="flex flex-col gap-2">
						<Label className="text-sm font-semibold flex items-center gap-2">
							<Zap className="size-4 text-muted-foreground" />
							Quick Add Node
						</Label>
						<p className="text-xs text-muted-foreground leading-relaxed">
							Create a new connected node in any direction
						</p>
					</div>
					<NodeDirectionButtons nodeId={nodeId} isRootNode={isRootNode} />
				</div>

				{/* Danger Zone Section - Only for non-root nodes */}
				{!isRootNode && (
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
									Permanently remove this node and all its connections. This
									action cannot be undone.
								</p>
								<Button
									variant="destructive"
									size="sm"
									className="w-full text-xs"
									onClick={handleDeleteNode}
								>
									<Trash2 className="size-3.5 mr-2" />
									Delete Node
								</Button>
							</div>
						</div>
					</>
				)}
			</div>
		</SheetContent>
	);
}
