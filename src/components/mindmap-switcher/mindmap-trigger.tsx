import { Brain, ChevronsUpDown } from "lucide-react";
import { MindmapIcon } from "@/components/mindmap/mindmap-icon";
import type { Mindmap } from "@/types/mindmap";

interface MindmapTriggerProps {
	mindmap: Mindmap | undefined;
	mindmapCount: number;
	isLoading: boolean;
}

export function MindmapTrigger({
	mindmap,
	mindmapCount,
	isLoading,
}: MindmapTriggerProps) {
	const displayTitle = isLoading
		? "Loading mindmap..."
		: mindmap?.title || "Open a mindmap";
	const countLabel = `${mindmapCount} mindmap${mindmapCount !== 1 ? "s" : ""}`;

	return (
		<>
			<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
				<MindmapIcon
					mindmap={mindmap}
					isLoading={isLoading}
					fallback={<Brain className="size-4 text-orange-600" />}
				/>
			</div>
			<div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
				<span className="truncate font-semibold">{displayTitle}</span>
				<span className="truncate text-xs">{countLabel}</span>
			</div>
			<ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden" />
		</>
	);
}
