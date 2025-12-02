"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { NavUser } from "@/components/nav-user/nav-user";
import { MindmapSwitcher } from "@/components/mindmap-switcher/mindmap-switcher";
import { NavQuickActions } from "@/components/nav-quick-actions/nav-quick-actions";
import { NavRecent } from "@/components/nav-recent/nav-recent";
import { NavStats } from "@/components/nav-stats/nav-stats";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useAuth();
	const pathname = usePathname();

	const userData = {
		name: user?.name || user?.nickname || "User",
		email: user?.email || "",
		avatar: user?.picture || "",
	};

	// On home page (/), show mindmap switcher and recent items
	const isHomePage = pathname === "/";

	return (
		<TooltipProvider delayDuration={300}>
			<Sidebar collapsible="icon" {...props}>
				<SidebarHeader>
					<MindmapSwitcher />
				</SidebarHeader>
				<SidebarContent>
					<NavQuickActions />
					<NavRecent />
					{!isHomePage && <NavStats />}
				</SidebarContent>
				<SidebarFooter>
					<NavUser user={userData} />
				</SidebarFooter>
				{!isHomePage && <SidebarRail />}
			</Sidebar>
		</TooltipProvider>
	);
}
