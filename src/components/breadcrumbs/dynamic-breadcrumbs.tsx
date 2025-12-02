"use client";

import { usePathname } from "next/navigation";
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

interface BreadcrumbSegment {
	label: string | React.ReactNode;
	href: string;
	isCurrentPage: boolean;
}

export function DynamicBreadcrumbs() {
	const pathname = usePathname();
	const nodes = useAppStore((state) => state.mindmap.nodes);

	// Extract mindmap ID from URL if on a map page
	const mindmapId = pathname.startsWith("/map/") ? pathname.split("/")[2] : "";

	// Read mindmap metadata directly from React Query cache (single source of truth)
	// This will return cached data immediately without an additional network request
	// The hook already has enabled logic, so it won't run if mindmapId is empty
	const { data: mindmap } = useGetMindmap(mindmapId);

	const breadcrumbs = useMemo((): BreadcrumbSegment[] => {
		const segments: BreadcrumbSegment[] = [];

		// Always include home
		const isHomePage = pathname === "/";
		segments.push({
			label: "NeuralMap",
			href: "/",
			isCurrentPage: isHomePage,
		});

		// Handle /map/[id] routes
		if (pathname.startsWith("/map/")) {
			const nodeCount = nodes.length;

			segments.push({
				label: (
					<>
						{mindmap?.icon && <span className="mr-2">{mindmap.icon}</span>}
						{mindmap?.title || "Mindmap"}{" "}
						<span className="text-muted-foreground font-normal">
							({nodeCount} {nodeCount === 1 ? "node" : "nodes"})
						</span>
					</>
				),
				href: pathname,
				isCurrentPage: true,
			});
		}

		// Add more route patterns here as your app grows
		// Example: /settings, /profile, etc.

		return segments;
	}, [pathname, mindmap, nodes]);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((segment, index) => {
					const isLast = index === breadcrumbs.length - 1;

					return (
						<div key={segment.href} className="contents">
							<BreadcrumbItem className="hidden md:block">
								{segment.isCurrentPage || isLast ? (
									<BreadcrumbPage>{segment.label}</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={segment.href}>
										{segment.label}
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
							{!isLast && <BreadcrumbSeparator className="hidden md:block" />}
						</div>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
