import {
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Edge } from "reactflow";
import { SheetClose } from "@/components/ui/sheet";
import { useAppStore } from "@/providers/store-provider";
import { Trash2, AlertTriangle } from "lucide-react";

interface EdgeSheetContentProps {
	edgeData: Edge;
	onClose: () => void;
}

export function EdgeSheetContent({ edgeData, onClose }: EdgeSheetContentProps) {
	const deleteEdge = useAppStore((state) => state.mindmap.deleteEdge);

	const handleDeleteEdge = () => {
		deleteEdge(edgeData.id);
		onClose();
	};

	return (
		<SheetContent className="flex flex-col gap-6 min-w-[500px] sm:w-[540px] overflow-y-auto">
			<SheetClose onClick={onClose} />
			<SheetHeader>
				<SheetTitle>Edit Edge</SheetTitle>
				<SheetDescription>
					Here you can edit the edge, types, and color.
				</SheetDescription>
			</SheetHeader>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label>Type</Label>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Select a type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="default">Default</SelectItem>
							<SelectItem value="default">Default</SelectItem>
							<SelectItem value="default">Default</SelectItem>
							<SelectItem value="default">Default</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Separator />

				{/* Danger Zone Section */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2">
						<AlertTriangle className="w-4 h-4 text-destructive" />
						<Label className="text-base text-destructive">Danger Zone</Label>
					</div>
					<p className="text-xs text-muted-foreground -mt-1">
						Permanently remove this connection from your mindmap
					</p>
					<Button
						variant="destructive"
						className="w-full"
						onClick={handleDeleteEdge}
					>
						<Trash2 className="w-4 h-4 mr-2" />
						Delete Connection
					</Button>
				</div>
			</div>
		</SheetContent>
	);
}
