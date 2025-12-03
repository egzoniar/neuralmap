"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

type RouteGuardOptions = {
	/** If true, route requires authentication. If false, route is for non-authenticated users only */
	requireAuth: boolean;
	/** Where to redirect if condition isn't met */
	redirectTo: string;
};

/**
 * Hook to guard routes based on authentication state
 *
 * @example
 * // Protect authenticated routes
 * const { isLoading, canRender } = useRouteGuard({
 *   requireAuth: true,
 *   redirectTo: "/login"
 * });
 *
 * @example
 * // Redirect authenticated users away from public pages
 * const { isLoading, canRender } = useRouteGuard({
 *   requireAuth: false,
 *   redirectTo: "/dashboard"
 * });
 */
export function useRouteGuard({ requireAuth, redirectTo }: RouteGuardOptions) {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useLayoutEffect(() => {
		// Don't redirect while still loading auth state
		if (isLoading) return;

		// Determine if we should redirect
		const shouldRedirect = requireAuth ? !isAuthenticated : isAuthenticated;

		if (shouldRedirect) {
			// If redirecting to login (requireAuth=true but not authenticated),
			// preserve the current URL as returnTo parameter
			if (requireAuth && redirectTo === "/login") {
				const currentPath = window.location.pathname;
				const loginUrl = `/login?returnTo=${encodeURIComponent(currentPath)}`;
				router.replace(loginUrl);
			} else {
				router.replace(redirectTo);
			}
		}
	}, [isLoading, isAuthenticated, requireAuth, redirectTo, router]);

	return {
		isLoading,
		/** Whether the route should render content (not loading and passed guard) */
		canRender: !isLoading && (requireAuth ? isAuthenticated : !isAuthenticated),
	};
}
