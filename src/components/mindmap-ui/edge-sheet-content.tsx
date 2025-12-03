import {
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetClose,
	SheetContent,
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
import { useDeleteEdge } from "@/hooks/use-delete-edge";
import { Trash2, AlertTriangle, Link2, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EdgeSheetContentProps {
	edgeData: Edge;
	onClose: () => void;
}

export function EdgeSheetContent({ edgeData, onClose }: EdgeSheetContentProps) {
	// Hook for immediate edge deletion with backend sync
	const { deleteEdges } = useDeleteEdge();

	const handleDeleteEdge = () => {
		deleteEdges([edgeData.id]);
		onClose();
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
					<Link2 className="size-4" />
					Connection Settings
				</SheetTitle>
				<SheetDescription className="text-xs">
					Customize this connection or remove it from your mindmap
				</SheetDescription>
			</SheetHeader>
			<div className="flex flex-col gap-6">
				{/* Connection Properties */}
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label
							htmlFor="edge-type"
							className="text-sm font-semibold flex items-center gap-2"
						>
							<Settings2 className="size-4 text-muted-foreground" />
							Connection Type
						</Label>
						<p className="text-xs text-muted-foreground leading-relaxed">
							Select the type of connection you want to make (coming soon)
						</p>
						<Select defaultValue="default" disabled>
							<SelectTrigger id="edge-type">
								<SelectValue placeholder="Select connection type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="default">Default</SelectItem>
								<SelectItem value="straight">Straight</SelectItem>
								<SelectItem value="step">Step</SelectItem>
								<SelectItem value="smoothstep">Smooth Step</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<Separator />

				{/* Danger Zone */}
				<div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-2">
							<AlertTriangle className="size-4 text-destructive" />
							<h3 className="text-sm font-semibold text-destructive">
								Danger Zone
							</h3>
						</div>
						<p className="text-xs text-muted-foreground leading-relaxed">
							This will permanently remove the connection between the two nodes.
							This action cannot be undone.
						</p>
						<Button
							variant="destructive"
							size="sm"
							className="w-full text-xs"
							onClick={handleDeleteEdge}
						>
							<Trash2 className="size-3.5 mr-2" />
							Delete Connection
						</Button>
					</div>
				</div>
			</div>
		</SheetContent>
	);
}
