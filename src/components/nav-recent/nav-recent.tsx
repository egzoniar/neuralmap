"use client";

import { useMemo } from "react";

import { MindmapRecentItem } from "./mindmap-recent-item";
import { RecentLoadingSkeleton } from "./recent-loading-skeleton";
import { RecentEmptyState } from "./recent-empty-state";
import { ItemGroup } from "@/components/ui/item";
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
				<RecentLoadingSkeleton />
			) : recentMindmaps.length === 0 ? (
				<RecentEmptyState />
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
