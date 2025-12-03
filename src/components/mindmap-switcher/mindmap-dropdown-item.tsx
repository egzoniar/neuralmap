"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { Mindmap } from "@/types/mindmap";
import { formatCreatedDate } from "@/utils/date";
import { MindmapIcon } from "../mindmap/mindmap-icon";

interface MindmapDropdownItemProps {
	mindmap: Mindmap;
	onSelect: (id: string) => void;
}

export function MindmapDropdownItem({
	mindmap,
	onSelect,
}: MindmapDropdownItemProps) {
	return (
		<DropdownMenuItem
			onClick={() => onSelect(mindmap.id)}
			className="flex-col items-start gap-2 p-2 hover:cursor-pointer"
		>
			<div className="flex w-full items-start gap-2">
				<div className="flex size-8 shrink-0 items-center justify-center">
					<MindmapIcon mindmap={mindmap} isLoading={false} />
				</div>
				<div className="flex min-w-0 flex-1 flex-col gap-0.5">
					<div className="flex items-center gap-2">
						<span className="truncate text-sm font-medium">
							{mindmap.title}
						</span>
						<Badge
							variant="secondary"
							className="shrink-0 bg-muted-foreground/20 hover:bg-muted-foreground/20 text-[10px] text-muted-foreground px-1.5 py-0 capitalize"
						>
							{mindmap.visibility}
						</Badge>
					</div>
					{mindmap.description && (
						<p className="line-clamp-2 text-xs text-muted-foreground">
							{mindmap.description}
						</p>
					)}
					<p className="text-[11px] text-muted-foreground/70">
						Created {formatCreatedDate(mindmap.created_at)}
					</p>
				</div>
			</div>
		</DropdownMenuItem>
	);
}
