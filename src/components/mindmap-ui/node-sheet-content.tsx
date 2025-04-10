import {
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetContent,
	SheetClose,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MindmapNodeData } from "@/types/mindmap";

interface NodeSheetContentProps {
	nodeData: MindmapNodeData;
	onClose: () => void;
}

export function NodeSheetContent({ nodeData, onClose }: NodeSheetContentProps) {
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
	};

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		console.log(e.target.value);
	};

	return (
		<SheetContent className="flex flex-col gap-6 min-w-[500px] sm:w-[540px]">
			<SheetClose onClick={onClose} />
			<SheetHeader>
				<SheetTitle>Edit Node</SheetTitle>
				<SheetDescription>
					Here you can edit the node, add a description, or add a link. You can
					write code or format text any way you want.
				</SheetDescription>
			</SheetHeader>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label>Title</Label>
					<Input
						type="text"
						value={nodeData.title}
						onChange={handleTitleChange}
					/>
				</div>
				{nodeData.content && (
					<div className="flex flex-col gap-2">
						<Label>Content</Label>
						<Textarea value={nodeData.content} onChange={handleContentChange} />
					</div>
				)}
			</div>
		</SheetContent>
	);
}
