"use client";

import { Calendar, GitBranch, Layers } from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/providers/store-provider";
import { formatShortDate } from "@/utils/date";

export function NavStats() {
	const nodes = useAppStore((state) => state.mindmap.nodes);
	const edges = useAppStore((state) => state.mindmap.edges);
	const mindmaps = useAppStore((state) => state.mindmaps.mindmaps);
	const activeMindmapId = useAppStore(
		(state) => state.mindmaps.activeMindmapId,
	);

	const activeMindmap = mindmaps.find((m) => m.id === activeMindmapId);

	if (!activeMindmap) {
		return null;
	}

	const totalNodes = nodes.length;
	const totalConnections = edges.length;

	return (
		<SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Mindmap Overview</SidebarGroupLabel>
			<SidebarGroupContent>
				<div className="rounded-lg border bg-sidebar-accent/50 px-3 py-2.5 text-sm">
					<div className="grid grid-cols-2 gap-3">
						<div className="flex flex-col space-y-1">
							<div className="flex items-center gap-1.5 text-muted-foreground">
								<Layers className="size-3.5" />
								<span className="text-xs">Nodes</span>
							</div>
							<span className="text-lg font-semibold tabular-nums">
								{totalNodes}
							</span>
						</div>
						<div className="flex flex-col space-y-1">
							<div className="flex items-center gap-1.5 text-muted-foreground">
								<GitBranch className="size-3.5" />
								<span className="text-xs">Links</span>
							</div>
							<span className="text-lg font-semibold tabular-nums">
								{totalConnections}
							</span>
						</div>
					</div>
					<Separator className="my-2.5" />
					<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
						<Calendar className="size-3.5" />
						<span>Created {formatShortDate(activeMindmap.createdAt)}</span>
					</div>
				</div>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
