import {
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetContent,
	SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TiptapEditor } from "../tiptap-editor/tiptap";
import { useAppStore } from "@/providers/store-provider";

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

	return (
		<SheetContent className="flex flex-col gap-6 min-w-[500px] sm:w-[540px]">
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
				<div className="flex flex-col gap-2">
					<Label>Title</Label>
					<Input
						type="text"
						value={nodeData.title || ""}
						onChange={handleTitleChange}
					/>
				</div>
				{!isRootNode && (
					<div className="flex flex-col gap-2 sidebar-content">
						<Label>Content</Label>
						<TiptapEditor
							content={nodeData.content || ""}
							onChange={handleContentChange}
						/>
					</div>
				)}
			</div>
		</SheetContent>
	);
}
