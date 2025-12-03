"use client";

import { CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useSyncStatus } from "@/hooks/use-sync-status";
import type { SyncStatus } from "@/hooks/use-sync-status";

/**
 * Badge component that displays the current sync status
 * Shows:
 * - "Syncing..." when mutation is in progress (with spinner)
 * - "Synced" briefly after successful save (with check icon)
 * - "Error" when mutation fails (with alert icon)
 * - Nothing when idle
 */
export function SyncStatusBadge() {
	const { status } = useSyncStatus();

	// Don't render anything when idle
	if (status === "idle") {
		return null;
	}

	return <StatusBadgeContent status={status} />;
}

interface StatusBadgeContentProps {
	status: SyncStatus;
}

function StatusBadgeContent({ status }: StatusBadgeContentProps) {
	switch (status) {
		case "syncing":
			return (
				<Badge variant="outline" className="gap-1.5 px-2.5 font-normal">
					<Spinner className="h-3 w-3" />
					<span>Syncing...</span>
				</Badge>
			);

		case "synced":
			return (
				<Badge
					variant="outline"
					className="gap-1.5 px-2.5 font-normal text-green-700"
				>
					<CheckCircle className="h-3 w-3" />
					<span>Synced</span>
				</Badge>
			);

		case "error":
			return (
				<Badge
					variant="outline"
					className="gap-1.5 px-2.5 font-normal text-red-700"
				>
					<AlertCircle className="h-3 w-3" />
					<span>Error</span>
				</Badge>
			);

		default:
			return null;
	}
}
