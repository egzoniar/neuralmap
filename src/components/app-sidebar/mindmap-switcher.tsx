"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, Brain } from "lucide-react";
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
import { useAppStore } from "@/providers/store-provider";
import { ROUTES } from "@/constants/routes";

export function MindmapSwitcher() {
	const router = useRouter();
	const { isMobile } = useSidebar();
	const mindmaps = useAppStore((state) => state.mindmaps.mindmaps);
	const activeMindmapId = useAppStore(
		(state) => state.mindmaps.activeMindmapId,
	);
	const setActiveMindmap = useAppStore(
		(state) => state.mindmaps.setActiveMindmap,
	);
	const createMindmap = useAppStore((state) => state.mindmaps.createMindmap);

	const activeMindmap = mindmaps.find((m) => m.id === activeMindmapId);

	const handleSelectMindmap = (id: string) => {
		setActiveMindmap(id);
		router.push(ROUTES.MAP(id));
	};

	const handleCreateMindmap = () => {
		const name = `New Mindmap ${mindmaps.length + 1}`;
		const newId = createMindmap(name);
		router.push(ROUTES.MAP(newId));
	};

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
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Brain className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
									<span className="truncate font-semibold">
										{activeMindmap?.title || "No Mindmap"}
									</span>
									<span className="truncate text-xs">
										{mindmaps.length} mindmap{mindmaps.length !== 1 ? "s" : ""}
									</span>
								</div>
								<ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden" />
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
						{mindmaps.map((mindmap) => (
							<DropdownMenuItem
								key={mindmap.id}
								onClick={() => handleSelectMindmap(mindmap.id)}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center rounded-sm border">
									<Brain className="size-4 shrink-0" />
								</div>
								{mindmap.title}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="gap-2 p-2"
							onClick={handleCreateMindmap}
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
