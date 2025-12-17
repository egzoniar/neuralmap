"use client";

import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppStore } from "@/providers/store-provider";
import { useGetMindmap } from "@/services/mindmap/queries";
import { ROUTES, getRouteType } from "@/constants/routes";

interface BreadcrumbSegment {
	label: string | React.ReactNode;
	href: string;
	isCurrentPage: boolean;
}

export function DynamicBreadcrumbs() {
	const pathname = usePathname();
	const params = useParams<{ id?: string }>();
	const nodes = useAppStore((state) => state.mindmap.nodes);

	// Don't show breadcrumbs on the root page
	if (pathname === ROUTES.HOME) {
		return null;
	}

	// Get mindmap ID from route params (Next.js recommended approach)
	const mindmapId = params.id || "";

	// Read mindmap metadata directly from React Query cache (single source of truth)
	// This will return cached data immediately without an additional network request
	// The hook already has enabled logic, so it won't run if mindmapId is empty
	const { data: mindmap } = useGetMindmap(mindmapId);

	const breadcrumbs = useMemo((): BreadcrumbSegment[] => {
		const segments: BreadcrumbSegment[] = [];
		const routeType = getRouteType(pathname);

		// Always include home as a link
		segments.push({
			label: "Home",
			href: ROUTES.HOME,
			isCurrentPage: false,
		});

		// Route-specific breadcrumbs using route type helper

		// Handle /map/[id] routes
		if (routeType === "mindmap" && mindmapId) {
			segments.push({
				label: (
					<>
						{mindmap?.icon && <span className="mr-2">{mindmap.icon}</span>}
						{mindmap?.title || "Mindmap"}
					</>
				),
				href: ROUTES.MAP(mindmapId),
				isCurrentPage: true,
			});
		}

		// Handle /settings/billing route
		// Note: No dedicated /settings page exists yet
		else if (pathname === ROUTES.BILLING) {
			segments.push({
				label: "Billing",
				href: ROUTES.BILLING,
				isCurrentPage: true,
			});
		}

		// Add more route patterns here as needed
		// Use ROUTES constants and getRouteType() helper for route matching

		return segments;
	}, [pathname, mindmapId, mindmap, nodes]);

	return (
		<div className="flex items-center gap-5">
			<Breadcrumb>
				<BreadcrumbList>
					{breadcrumbs.map((segment, index) => {
						const isLast = index === breadcrumbs.length - 1;

						return (
							<div key={segment.href} className="contents">
								<BreadcrumbItem className="hidden md:block h-6">
									{segment.isCurrentPage || isLast ? (
										<BreadcrumbPage>{segment.label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild className="h-6">
											<Link href={segment.href}>{segment.label}</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{!isLast && <BreadcrumbSeparator className="hidden md:block" />}
							</div>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}
