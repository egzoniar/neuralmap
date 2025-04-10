"use client";

import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE } from "@/constants/ui";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProviderProps {
	children: ReactNode;
}

export function AppSidebarProvider({ children }: SidebarProviderProps) {
	const pathname = usePathname();
	const isMapView = pathname.startsWith("/map");
	return (
		<SidebarProvider
			id="sidebar-provider"
			className={cn(isMapView && "mapview-sidebar")}
		>
			<AppSidebar pathname={pathname} />
			<main>{children}</main>
		</SidebarProvider>
	);
}
