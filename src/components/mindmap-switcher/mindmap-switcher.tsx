"use client";

import { useMemo, useCallback, useState } from "react";
import { Search } from "lucide-react";
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
import {
	InputGroup,
	InputGroupInput,
	InputGroupAddon,
} from "@/components/ui/input-group";
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

	const [searchQuery, setSearchQuery] = useState("");

	const activeMindmap = useMemo(
		() => mindmaps?.find((m) => m.id === activeMindmapId),
		[mindmaps, activeMindmapId],
	);

	const mindmapCount = useMemo(() => mindmaps?.length ?? 0, [mindmaps]);
	const showLoading = isLoading || isFetching || !mindmaps;

	const filteredMindmaps = useMemo(() => {
		if (!mindmaps) return [];
		if (!searchQuery.trim()) return mindmaps;

		const query = searchQuery.toLowerCase().trim();
		return mindmaps.filter((mindmap) =>
			mindmap.title.toLowerCase().includes(query),
		);
	}, [mindmaps, searchQuery]);

	const handleSelectMindmap = useCallback(
		(id: string) => {
			setActiveMindmap(id);
			router.push(ROUTES.MAP(id));
		},
		[setActiveMindmap, router],
	);

	const handleOpenChange = useCallback((open: boolean) => {
		if (!open) {
			setSearchQuery("");
		}
	}, []);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu onOpenChange={handleOpenChange}>
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
						className="w-96 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={15}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							Your Mindmaps
						</DropdownMenuLabel>
						<div className="px-2 py-1.5">
							<InputGroup>
								<InputGroupInput
									placeholder="Search mindmaps..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-0 h-7"
								/>
								<InputGroupAddon className="p-2">
									<Search size={14} />
								</InputGroupAddon>
								{searchQuery && (
									<InputGroupAddon align="inline-end">
										{filteredMindmaps.length}{" "}
										{filteredMindmaps.length === 1 ? "result" : "results"}
									</InputGroupAddon>
								)}
							</InputGroup>
						</div>
						<DropdownMenuSeparator />
						<MindmapList
							mindmaps={filteredMindmaps}
							isLoading={showLoading}
							onSelectMindmap={handleSelectMindmap}
						/>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
