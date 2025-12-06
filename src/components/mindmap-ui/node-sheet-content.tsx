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
import { IconPicker } from "@/components/ui/icon-picker";
import { TiptapEditor } from "../tiptap-editor/tiptap";
import { useAppStore } from "@/providers/store-provider";
import { NodeDirectionButtons } from "./node-direction-buttons";
import { Separator } from "@/components/ui/separator";
import { DeleteNodeDescription } from "@/components/dialogs/delete-node-description";
import { useUpdateMindmapMetadata } from "@/services/mindmap/mutations";
import { useDebouncedContentUpdate } from "@/hooks/use-debounced-content-update";
import { useMindmapActions } from "@/contexts/mindmap-actions-context";
import { useGetMindmap } from "@/services/mindmap/queries";
import { useParams } from "next/navigation";
import {
	Trash2,
	AlertTriangle,
	Heading,
	FileText,
	Zap,
	Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NODE_TYPE } from "@/constants/ui";

interface NodeSheetContentProps {
	nodeId: string;
	onClose: () => void;
}

export function NodeSheetContent({ nodeId, onClose }: NodeSheetContentProps) {
	const params = useParams();
	const mindmapId = params?.id as string;

	// Get the latest node data directly from the store
	const node = useAppStore((state) =>
		state.mindmap.nodes.find((n) => n.id === nodeId),
	);
	const updateNodeData = useAppStore((state) => state.mindmap.updateNodeData);
	const { confirm } = useAppStore((state) => state.dialog);

	// Get mindmap metadata for icon (source of truth is React Query)
	const { data: mindmap } = useGetMindmap(mindmapId);

	// Hook for immediate metadata updates (icon)
	const updateMetadata = useUpdateMindmapMetadata();

	// Hook for debounced content updates (title, content)
	const { queueUpdate: queueContentUpdate } = useDebouncedContentUpdate(2000);

	// Get actions from context (works for both auth and demo)
	const { deleteNodes } = useMindmapActions();

	// If node not found, don't render
	if (!node) return null;

	const nodeData = node.data;
	const isRootNode = node.type === NODE_TYPE.ROOT;

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// 1. Update local state immediately (optimistic update)
		updateNodeData(nodeId, { title: e.target.value });
		// 2. Queue debounced backend sync (2 seconds)
		queueContentUpdate();
	};

	const handleContentChange = (richText: string) => {
		// 1. Update local state immediately (optimistic update)
		updateNodeData(nodeId, { content: richText });
		// 2. Queue debounced backend sync (2 seconds)
		queueContentUpdate();
	};

	const handleIconChange = (icon: string | undefined) => {
		// Immediate backend sync (no debounce)
		if (!mindmapId) return;
		updateMetadata.mutate({
			mindmapId,
			update: { icon },
		});
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
			deleteNodes([nodeId]);
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
							{isRootNode ? "Mindmap Title" : "Title"}
						</Label>
						<p className="text-xs text-muted-foreground leading-relaxed">
							{isRootNode
								? "The main topic of your mindmap"
								: "Give your node a clear, concise name"}
						</p>
						{isRootNode ? (
							<div className="flex gap-2">
								<IconPicker
									value={mindmap?.icon ?? undefined}
									onChange={handleIconChange}
								/>
								<Input
									id="node-title"
									type="text"
									placeholder="Enter main topic..."
									value={nodeData.title || ""}
									onChange={handleTitleChange}
									className="flex-1"
								/>
							</div>
						) : (
							<Input
								id="node-title"
								type="text"
								placeholder="Enter node title..."
								value={nodeData.title || ""}
								onChange={handleTitleChange}
							/>
						)}
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
