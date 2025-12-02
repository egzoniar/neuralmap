"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { Mindmap } from "@/types/mindmap";

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
			className="gap-2 p-2"
		>
			{mindmap.icon && (
				<div className="flex size-6 items-center justify-center rounded-sm border">
					<span className="text-sm">{mindmap.icon}</span>
				</div>
			)}
			{mindmap.title}
		</DropdownMenuItem>
	);
}
