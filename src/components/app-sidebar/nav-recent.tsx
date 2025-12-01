"use client";

import { Clock } from "lucide-react";
import { useMemo } from "react";

import { MindmapRecentItem } from "@/components/app-sidebar/mindmap-recent-item";
import { ItemGroup } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { useListMindmaps } from "@/services/mindmap/queries";
import { useAppStore } from "@/providers/store-provider";

export function NavRecent() {
	const activeMindmapId = useAppStore(
		(state) => state.mindmaps.activeMindmapId,
	);
	const { data: mindmaps, isLoading, isFetching } = useListMindmaps();

	// Backend returns mindmaps ordered by most recently updated first
	// Just take the first 3 (most recent)
	const recentMindmaps = useMemo(() => {
		if (!mindmaps) return [];
		return mindmaps.slice(0, 3);
	}, [mindmaps]);

	// Show loading skeleton when:
	// 1. React Query is fetching data, OR
	// 2. We don't have data yet (covers Auth0 initialization)
	const showLoading = isLoading || isFetching || !mindmaps;

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Recent Mindmaps</SidebarGroupLabel>
			{showLoading ? (
				<div className="space-y-2 px-2 group-data-[collapsible=icon]:hidden">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="flex items-center gap-2.5">
							<Skeleton className="size-7 shrink-0 rounded-md" />
							<div className="flex-1 space-y-1.5">
								<Skeleton className="h-3 w-3/4" />
								<Skeleton className="h-2.5 w-1/2" />
							</div>
						</div>
					))}
				</div>
			) : recentMindmaps.length === 0 ? (
				<div className="flex items-center gap-2 px-2 py-6 text-sm text-muted-foreground/70 group-data-[collapsible=icon]:hidden">
					<Clock className="size-4 shrink-0" />
					<span className="text-xs leading-relaxed">
						Open a mindmap to see it here
					</span>
				</div>
			) : (
				<ItemGroup>
					{recentMindmaps.map((mindmap) => (
						<MindmapRecentItem
							key={mindmap.id}
							mindmap={mindmap}
							isActive={mindmap.id === activeMindmapId}
						/>
					))}
				</ItemGroup>
			)}
		</SidebarGroup>
	);
}
