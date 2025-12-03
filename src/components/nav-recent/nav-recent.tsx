"use client";

import { MindmapRecentItem } from "./mindmap-recent-item";
import { RecentLoadingSkeleton } from "./recent-loading-skeleton";
import { RecentEmptyState } from "./recent-empty-state";
import { ItemGroup } from "@/components/ui/item";
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { useListRecentMindmaps } from "@/services/mindmap/queries";
import { useAppStore } from "@/providers/store-provider";

export function NavRecent() {
	const activeMindmapId = useAppStore(
		(state) => state.mindmaps.activeMindmapId,
	);
	const {
		data: recentMindmaps,
		isLoading,
		isFetching,
	} = useListRecentMindmaps(3);

	// Show loading skeleton when:
	// 1. React Query is fetching data, OR
	// 2. We don't have data yet (covers Auth0 initialization)
	const showLoading = isLoading || isFetching || !recentMindmaps;

	function renderContent() {
		if (showLoading) return <RecentLoadingSkeleton />;
		if (recentMindmaps.length === 0) return <RecentEmptyState />;

		return (
			<ItemGroup>
				{recentMindmaps.map((mindmap) => (
					<MindmapRecentItem
						key={mindmap.id}
						mindmap={mindmap}
						isActive={mindmap.id === activeMindmapId}
					/>
				))}
			</ItemGroup>
		);
	}

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Recent Mindmaps</SidebarGroupLabel>
			{renderContent()}
		</SidebarGroup>
	);
}
