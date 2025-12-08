"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, Network } from "lucide-react";
import type { SubscriptionStatus } from "@/types/subscription";

interface UsageStatsProps {
	subscription: SubscriptionStatus;
}

export function UsageStats({ subscription }: UsageStatsProps) {
	const {
		current_mindmaps,
		max_mindmaps,
		max_nodes_per_mindmap,
		can_create_mindmap,
	} = subscription;

	const isUnlimitedMindmaps = max_mindmaps === null;

	const mindmapPercentage = isUnlimitedMindmaps
		? 0
		: (current_mindmaps / max_mindmaps) * 100;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Usage</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<FolderOpen className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm font-medium">Mindmaps</span>
						</div>
						<span className="text-sm text-muted-foreground">
							{current_mindmaps} /{" "}
							{isUnlimitedMindmaps ? "Unlimited" : max_mindmaps}
						</span>
					</div>
					{!isUnlimitedMindmaps && (
						<>
							<Progress value={mindmapPercentage} className="h-2" />
							{!can_create_mindmap && (
								<p className="text-xs text-muted-foreground text-red-600">
									You've reached your mindmap limit
								</p>
							)}
						</>
					)}
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Network className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm font-medium">Nodes per mindmap</span>
						</div>
						<span className="text-sm text-muted-foreground">
							Max {max_nodes_per_mindmap}
						</span>
					</div>
					<p className="text-xs text-muted-foreground">
						Maximum nodes allowed per mindmap
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
