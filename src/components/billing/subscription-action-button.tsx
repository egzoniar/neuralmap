"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CancelSubscriptionButton } from "./cancel-subscription-button";
import type { SubscriptionStatus } from "@/types/subscription";

interface SubscriptionActionButtonProps {
	isPro: boolean;
	isActive: boolean;
	isCancelled: boolean;
	subscription: SubscriptionStatus;
	onUpgrade: () => void;
	onKeepSubscription?: () => void;
	isUpgrading?: boolean;
	isKeeping?: boolean;
}

export function SubscriptionActionButton({
	isPro,
	isActive,
	isCancelled,
	subscription,
	onUpgrade,
	onKeepSubscription,
	isUpgrading = false,
	isKeeping = false,
}: SubscriptionActionButtonProps) {
	// Pro user with active subscription (not cancelled)
	if (isPro && isActive && !isCancelled) {
		return (
			<div className="pt-2 border-t">
				<CancelSubscriptionButton
					subscription={subscription}
					variant="outline"
					className="w-full text-destructive hover:bg-destructive/10"
				/>
			</div>
		);
	}

	// Pro user with active subscription scheduled for cancellation
	// User wants to UNDO the cancellation and keep their subscription
	if (isPro && isActive && isCancelled) {
		// Don't show button if onKeepSubscription handler is not provided
		if (!onKeepSubscription) {
			return null;
		}

		return (
			<div className="pt-2 border-t space-y-3">
				<div className="px-3 py-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
					<p className="text-xs text-blue-900 dark:text-blue-100">
						Keep your subscription and it will automatically renew at the end of
						your billing period.
					</p>
				</div>
				<Button
					onClick={onKeepSubscription}
					disabled={isKeeping}
					className={cn("w-full", "bg-brand hover:bg-brand/90")}
				>
					{isKeeping ? "Processing..." : "Keep Subscription"}
				</Button>
			</div>
		);
	}

	// Free tier user
	if (!isPro) {
		return (
			<div className="pt-2">
				<Button
					onClick={onUpgrade}
					disabled={isUpgrading}
					className={cn("w-full", "bg-brand hover:bg-brand/90")}
				>
					{isUpgrading ? "Loading..." : "Upgrade to Pro"}
				</Button>
			</div>
		);
	}

	// No action button needed (edge case)
	return null;
}
