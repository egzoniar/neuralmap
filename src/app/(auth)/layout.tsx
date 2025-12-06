"use client";

import { AppSidebarProvider } from "@/providers/app-sidebar-provider";
import { useRouteGuard } from "@/hooks/use-route-guard";
import { useSyncUserTier } from "@/hooks/use-sync-user-tier";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isLoading, canRender } = useRouteGuard({
		requireAuth: true,
		redirectTo: "/login",
	});

	// Sync user tier from backend
	useSyncUserTier();

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

	return <AppSidebarProvider>{children}</AppSidebarProvider>;
}
