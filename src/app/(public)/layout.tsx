"use client";

import { RouteErrorBoundary } from "@/components/error-boundary/route-error-boundary";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<RouteErrorBoundary routeName="Public Routes">
			{children}
		</RouteErrorBoundary>
	);
}
