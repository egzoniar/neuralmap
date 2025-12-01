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

interface BreadcrumbSegment {
	label: string | React.ReactNode;
	href: string;
	isCurrentPage: boolean;
}

export function DynamicBreadcrumbs() {
	const pathname = usePathname();
	const mindmaps = useAppStore((state) => state.mindmaps.mindmaps);
	const activeMindmapId = useAppStore(
		(state) => state.mindmaps.activeMindmapId,
	);
	const nodes = useAppStore((state) => state.mindmap.nodes);

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
			const mindmapId = pathname.split("/")[2];
			const mindmap = mindmaps.find((m) => m.id === mindmapId);
			const nodeCount = nodes.length;

			segments.push({
				label: (
					<>
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
	}, [pathname, mindmaps, activeMindmapId, nodes]);

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
