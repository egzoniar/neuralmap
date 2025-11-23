"use client";

import { AppSidebarProvider } from "@/providers/app-sidebar-provider";
import { MindmapSheet } from "@/components/mindmap-ui/mindmap-sheet";
import { useRouteGuard } from "@/hooks/use-route-guard";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isLoading, canRender } = useRouteGuard({
		requireAuth: true,
		redirectTo: "/login",
	});

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}

	// Don't render content if not authenticated
	if (!canRender) {
		return null;
	}

	return (
		<>
			<MindmapSheet />
			<AppSidebarProvider>{children}</AppSidebarProvider>
		</>
	);
}
