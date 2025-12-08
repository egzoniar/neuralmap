"use client";

import { Badge } from "@/components/ui/badge";
import { SUBSCRIPTION_STATUS } from "@/types/subscription";

interface SubscriptionStatusBadgeProps {
	status: string | null;
	isCancelled: boolean;
}

export function SubscriptionStatusBadge({
	status,
	isCancelled,
}: SubscriptionStatusBadgeProps) {
	// Guard: Check if cancelled with end date
	if (isCancelled) {
		return (
			<Badge
				variant="outline"
				className="bg-yellow-50 text-yellow-700 border-yellow-300"
			>
				Cancelled
			</Badge>
		);
	}

	// Guard: Check if active
	if (status === SUBSCRIPTION_STATUS.ACTIVE) {
		return (
			<Badge
				variant="outline"
				className="bg-green-50 text-green-700 border-green-300"
			>
				Active
			</Badge>
		);
	}

	// Default: No subscription
	return null;
}
