"use client";

import { ChevronRight, BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";

import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import { SidebarTooltip } from "@/components/ui/sidebar-tooltip";
import { ROUTES } from "@/constants/routes";
import { useAppStore } from "@/providers/store-provider";
import type { Mindmap } from "@/types/mindmap";
import { formatTimeAgo } from "@/utils/date";

interface MindmapRecentItemProps {
	mindmap: Mindmap;
	isActive?: boolean;
}

export function MindmapRecentItem({
	mindmap,
	isActive,
}: MindmapRecentItemProps) {
	const router = useRouter();
	const setActiveMindmap = useAppStore(
		(state) => state.mindmaps.setActiveMindmap,
	);

	const handleClick = () => {
		setActiveMindmap(mindmap.id);
		router.push(ROUTES.MAP(mindmap.id));
	};

	return (
		<SidebarTooltip content={mindmap.title} side="right">
			<Item
				size="sm"
				variant={isActive ? "muted" : "default"}
				className="group/mindmap-item relative min-h-0 cursor-pointer gap-2.5 px-2 py-2 transition-all duration-200 hover:bg-accent/80 active:scale-[0.98] group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
				onClick={handleClick}
			>
				{isActive && (
					<div className="absolute left-0 top-1/2 h-3/5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary transition-all group-data-[collapsible=icon]:hidden" />
				)}

				{/* Icon shown only when collapsed */}
				<ItemMedia className="shrink-0 group-data-[collapsible=icon]:flex">
					<div
						className={`flex size-7 items-center justify-center rounded-md transition-colors ${
							isActive
								? "bg-primary/10 text-primary"
								: "bg-muted text-muted-foreground"
						}`}
					>
						<BrainCircuit size={18} />
					</div>
				</ItemMedia>

				<ItemContent className="min-w-0 flex-1 gap-0.5 group-data-[collapsible=icon]:hidden">
					<ItemTitle className="truncate text-xs font-medium leading-tight transition-colors group-hover/mindmap-item:text-foreground">
						{mindmap.title}
					</ItemTitle>
					{mindmap.updated_at && (
						<ItemDescription className="truncate text-[0.7rem] leading-tight text-muted-foreground/60 transition-colors group-hover/mindmap-item:text-muted-foreground/80">
							last updated {formatTimeAgo(mindmap.updated_at)}
						</ItemDescription>
					)}
				</ItemContent>

				<ItemActions className="shrink-0 opacity-0 transition-all duration-200 group-hover/mindmap-item:translate-x-0 group-hover/mindmap-item:opacity-100 group-data-[collapsible=icon]:hidden -translate-x-1">
					<ChevronRight className="size-3.5 text-muted-foreground/60" />
				</ItemActions>
			</Item>
		</SidebarTooltip>
	);
}
