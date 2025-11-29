"use client";

import { Brain, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/routes";
import { useAppStore } from "@/providers/store-provider";
import { formatTimeAgo } from "@/utils/date";

export function NavRecent() {
	const router = useRouter();
	const setActiveMindmap = useAppStore(
		(state) => state.mindmaps.setActiveMindmap,
	);
	const activeMindmapId = useAppStore(
		(state) => state.mindmaps.activeMindmapId,
	);
	// Subscribe to mindmaps array
	const mindmaps = useAppStore((state) => state.mindmaps.mindmaps);

	// Cache the computation to prevent infinite loop
	const recentMindmaps = useMemo(() => {
		return mindmaps
			.filter((m) => m.lastAccessedAt)
			.sort((a, b) => {
				const timeA = new Date(a.lastAccessedAt!).getTime();
				const timeB = new Date(b.lastAccessedAt!).getTime();
				return timeB - timeA;
			})
			.slice(0, 5);
	}, [mindmaps]);

	const handleSelectMindmap = (id: string) => {
		setActiveMindmap(id);
		router.push(ROUTES.MAP(id));
	};

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Recent</SidebarGroupLabel>
			<SidebarMenu>
				{recentMindmaps.length === 0 ? (
					<div className="flex items-center gap-2 px-2 py-6 text-sm text-muted-foreground/70 group-data-[collapsible=icon]:hidden">
						<Clock className="size-4 shrink-0" />
						<span className="text-xs leading-relaxed">
							Open a mindmap to see it here
						</span>
					</div>
				) : (
					recentMindmaps.map((mindmap) => (
						<SidebarMenuItem key={mindmap.id}>
							<SidebarMenuButton
								onClick={() => handleSelectMindmap(mindmap.id)}
								isActive={mindmap.id === activeMindmapId}
								tooltip={mindmap.name}
							>
								<Brain className="size-4" />
								<span className="truncate">{mindmap.name}</span>
								{mindmap.lastAccessedAt && (
									<span className="ml-auto text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
										{formatTimeAgo(mindmap.lastAccessedAt)}
									</span>
								)}
							</SidebarMenuButton>
						</SidebarMenuItem>
					))
				)}
			</SidebarMenu>
		</SidebarGroup>
	);
}
