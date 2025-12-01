"use client";

import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Input } from "@/components/ui/input";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarTooltip } from "@/components/ui/sidebar-tooltip";
import { ROUTES } from "@/constants/routes";
import { useAppStore } from "@/providers/store-provider";

export function NavQuickActions() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = React.useState("");
	const mindmaps = useAppStore((state) => state.mindmaps.mindmaps);
	const createMindmap = useAppStore((state) => state.mindmaps.createMindmap);

	const handleCreateMindmap = () => {
		const name = `New Mindmap ${mindmaps.length + 1}`;
		const newId = createMindmap(name);
		router.push(ROUTES.MAP(newId));
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		// TODO: Implement search functionality when needed
	};

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
						<div className="relative">
							<Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search mindmaps..."
								value={searchQuery}
								onChange={handleSearch}
								className="h-8 w-full rounded-md bg-background pl-8 shadow-none"
							/>
						</div>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarTooltip
							content={<span className="font-medium">New Mindmap</span>}
						>
							<SidebarMenuButton onClick={handleCreateMindmap}>
								<div className="flex aspect-square size-6 items-center justify-center rounded-md border bg-background">
									<Plus className="size-4" />
								</div>
								<span className="font-medium">New Mindmap</span>
							</SidebarMenuButton>
						</SidebarTooltip>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
