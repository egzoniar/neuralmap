"use client";

import { ChevronRight, ImageOff } from "lucide-react";
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
import { useSidebar } from "@/components/ui/sidebar";
import { MindmapIcon } from "@/components/mindmap/mindmap-icon";
import { ROUTES } from "@/constants/routes";
import { useAppStore } from "@/providers/store-provider";
import type { Mindmap } from "@/types/mindmap";
import { formatTimeAgo } from "@/utils/date";
import { cn } from "@/lib/utils";

interface MindmapRecentItemProps {
	mindmap: Mindmap;
	isActive?: boolean;
}

export function MindmapRecentItem({
	mindmap,
	isActive,
}: MindmapRecentItemProps) {
	const router = useRouter();
	const { state } = useSidebar();
	const setActiveMindmap = useAppStore(
		(state) => state.mindmaps.setActiveMindmap,
	);
	const setNavigatingToMindmap = useAppStore(
		(state) => state.application.setNavigatingToMindmap,
	);
	const navigatingToMindmapId = useAppStore(
		(state) => state.application.navigatingToMindmapId,
	);

	const isNavigating = navigatingToMindmapId === mindmap.id;
	const isCollapsed = state === "collapsed";

	const handleClick = () => {
		if (isActive) return;
		setNavigatingToMindmap(mindmap.id);
		setActiveMindmap(mindmap.id);
		router.push(ROUTES.MAP(mindmap.id));
	};

	return (
		<SidebarTooltip content={mindmap.title} side="right">
			<Item
				size="sm"
				variant={isActive ? "muted" : "default"}
				className={cn(
					"group/mindmap-item relative min-h-0 cursor-pointer gap-1 px-2 py-1.5 transition-all duration-200 active:scale-[0.98] group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-1",
					isActive ? "bg-gray-200" : "bg-transparent hover:bg-accent",
				)}
				onClick={handleClick}
			>
				{isActive && (
					<div className="absolute left-0 top-1/2 h-3/5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary transition-all " />
				)}

				{/* Icon shown only when collapsed */}
				<ItemMedia className="shrink-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:min-h-[27px]">
					<div className="flex size-7 items-center justify-center">
						<MindmapIcon
							mindmap={mindmap}
							isLoading={isNavigating}
							spinnerStrokeWidth={1.5}
							spinnerWidth={18}
							fallback={
								isCollapsed ? (
									<ImageOff size={16} className="text-muted-foreground" />
								) : undefined
							}
							iconClassName="text-lg"
						/>
					</div>
				</ItemMedia>

				<ItemContent className="min-w-0 flex-1 gap-0.5 group-data-[collapsible=icon]:hidden">
					<ItemTitle className="block w-full min-w-0 truncate text-xs font-medium leading-tight transition-colors group-hover/mindmap-item:text-foreground">
						{mindmap.title}
					</ItemTitle>
					{mindmap.last_viewed_at && (
						<ItemDescription className="truncate text-[0.7rem] leading-tight text-muted-foreground/60 transition-colors group-hover/mindmap-item:text-muted-foreground/80">
							last viewed {formatTimeAgo(mindmap.last_viewed_at)}
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
