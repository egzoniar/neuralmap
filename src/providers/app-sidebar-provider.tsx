"use client";

import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE } from "@/constants/ui";
import { cn } from "@/lib/utils";

interface SidebarProviderProps {
	children: ReactNode;
}

export function AppSidebarProvider({ children }: SidebarProviderProps) {
	return (
		<SidebarProvider
			id="sidebar-provider"
			style={
				{
					"--sidebar-width": SIDEBAR_WIDTH,
					"--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
				} as React.CSSProperties
			}
		>
			<AppSidebar />
			<main>
				{children}
			</main>
		</SidebarProvider>
	);
}
