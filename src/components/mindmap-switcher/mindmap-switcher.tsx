"use client";

import { useMemo, useCallback } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { SidebarTooltip } from "@/components/ui/sidebar-tooltip";
import { MindmapTrigger } from "./mindmap-trigger";
import { MindmapList } from "./mindmap-list";
import { useAppStore } from "@/providers/store-provider";
import { ROUTES } from "@/constants/routes";
import { useListMindmaps } from "@/services/mindmap/queries";

export function MindmapSwitcher() {
	const router = useRouter();
	const { isMobile } = useSidebar();
	const { data: mindmaps, isLoading, isFetching } = useListMindmaps();
	const activeMindmapId = useAppStore(
		(state) => state.mindmaps.activeMindmapId,
	);
	const setActiveMindmap = useAppStore(
		(state) => state.mindmaps.setActiveMindmap,
	);
	const createMindmap = useAppStore((state) => state.mindmaps.createMindmap);

	const activeMindmap = useMemo(
		() => mindmaps?.find((m) => m.id === activeMindmapId),
		[mindmaps, activeMindmapId],
	);

	const mindmapCount = useMemo(() => mindmaps?.length ?? 0, [mindmaps]);
	const showLoading = isLoading || isFetching || !mindmaps;

	const handleSelectMindmap = useCallback(
		(id: string) => {
			setActiveMindmap(id);
			router.push(ROUTES.MAP(id));
		},
		[setActiveMindmap, router],
	);

	const handleCreateMindmap = useCallback(() => {
		const name = `New Mindmap ${mindmapCount + 1}`;
		const newId = createMindmap(name);
		router.push(ROUTES.MAP(newId));
	}, [mindmapCount, createMindmap, router]);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<SidebarTooltip
						content={
							<span className="font-medium">
								{activeMindmap?.title || "No Mindmap"}
							</span>
						}
					>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center"
							>
								<MindmapTrigger
									mindmap={activeMindmap}
									mindmapCount={mindmapCount}
									isLoading={showLoading}
								/>
							</SidebarMenuButton>
						</DropdownMenuTrigger>
					</SidebarTooltip>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							Mindmaps
						</DropdownMenuLabel>
						<MindmapList
							mindmaps={mindmaps}
							isLoading={showLoading}
							onSelectMindmap={handleSelectMindmap}
						/>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="gap-2 p-2"
							onClick={handleCreateMindmap}
							disabled={showLoading}
						>
							<div className="flex size-6 items-center justify-center rounded-md border bg-background">
								<Plus className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">
								Add mindmap
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
