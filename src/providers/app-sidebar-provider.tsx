"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
	SidebarProvider,
	SidebarInset,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumbs } from "@/components/app-sidebar/dynamic-breadcrumbs";

interface SidebarProviderProps {
	children: ReactNode;
}

export function AppSidebarProvider({ children }: SidebarProviderProps) {
	const pathname = usePathname();
	const isHomePage = pathname === "/";

	return (
		<SidebarProvider defaultOpen={isHomePage}>
			<AppSidebar />
			<SidebarInset className="flex flex-col">
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						{!isHomePage && (
							<>
								<SidebarTrigger className="-ml-1" />
								<Separator orientation="vertical" className="mr-2 h-4" />
							</>
						)}
						<DynamicBreadcrumbs />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-0">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
