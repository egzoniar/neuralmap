"use client";

import { useMemo } from "react";
import { MindmapSwitcher } from "@/components/app-sidebar/mindmap-switcher";
import { NavMain } from "@/components/app-sidebar/nav-main";
import { NavProjects } from "@/components/app-sidebar/nav-projects";
import { NavUser } from "@/components/app-sidebar/nav-user";
import {
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { APP_SIDEBAR_DATA } from "@/constants/ui";

// You might want to create separate data constants for authenticated and unauthenticated users
import { PUBLIC_SIDEBAR_DATA } from "@/constants/ui"; // Create this file with public navigation items
import { NavPublic } from "@/components/app-sidebar/nav-public";

interface DynamicSidebarContentProps {
	pathname: string;
}

export function DynamicSidebarContent({
	pathname,
}: DynamicSidebarContentProps) {
	// Determine if the user is on an authenticated route
	// This is a simple check - you might want to use your auth state instead
	const isAuthRoute = useMemo(() => {
		return (
			pathname.startsWith("/map/1") ||
			pathname.startsWith("/dashboard") ||
			pathname.startsWith("/profile") ||
			pathname.startsWith("/settings")
		);
	}, [pathname]);

	if (isAuthRoute) {
		// Authenticated sidebar content
		return (
			<>
				<SidebarHeader>
					<MindmapSwitcher teams={APP_SIDEBAR_DATA.teams} />
				</SidebarHeader>
				<SidebarContent>
					<NavMain items={APP_SIDEBAR_DATA.navMain} />
					<NavProjects projects={APP_SIDEBAR_DATA.projects} />
				</SidebarContent>
				<SidebarFooter>
					<NavUser user={APP_SIDEBAR_DATA.user} />
				</SidebarFooter>
			</>
		);
	}

	// Public sidebar content
	return (
		<>
			<SidebarHeader>
				{/* Public header content */}
				<MindmapSwitcher teams={PUBLIC_SIDEBAR_DATA.teams} />
			</SidebarHeader>
			<SidebarContent>
				{/* Public navigation items */}
				<NavMain items={PUBLIC_SIDEBAR_DATA.navMain} />
			</SidebarContent>
			<SidebarFooter>
				{/* Login/Register buttons or other public actions */}
				<NavPublic /> {/* Create this component for public navigation */}
			</SidebarFooter>
		</>
	);
}
