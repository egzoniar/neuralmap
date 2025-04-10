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
import type { Edge } from "reactflow";
import { SheetClose } from "@/components/ui/sheet";

interface EdgeSheetContentProps {
	edgeData: Edge;
	onClose: () => void;
}

export function EdgeSheetContent({ edgeData, onClose }: EdgeSheetContentProps) {
	return (
		<SheetContent className="flex flex-col gap-6 min-w-[500px] sm:w-[540px]">
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
			</div>
		</SheetContent>
	);
}
