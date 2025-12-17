"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Shield, Layers, Zap } from "lucide-react";
import { useCancelSubscription } from "@/services/billing/mutations";
import { formatShortDate } from "@/utils/date";
import { TIER_LIMITS, USER_TIERS } from "@/types/subscription";
import { toast } from "sonner";
import type { CustomDialogProps } from "@/lib/features/dialog/types";
import type { SubscriptionStatus } from "@/types/subscription";

interface CancelSubscriptionDialogProps extends CustomDialogProps {
	subscription: SubscriptionStatus;
}

export function CancelSubscriptionDialog({
	onResolve,
	subscription,
}: CancelSubscriptionDialogProps) {
	const { mutate: cancelSubscription, isPending } = useCancelSubscription();

	const { current_mindmaps, subscription_ends_at } = subscription;

	// Get free tier limits from constants
	const freeTierLimits = TIER_LIMITS[USER_TIERS.FREE];
	const isOverMindmapLimit = current_mindmaps > freeTierLimits.maxMindmaps;
	const hiddenMindmapsCount = current_mindmaps - freeTierLimits.maxMindmaps;

	const handleCancel = () => {
		cancelSubscription(undefined, {
			onSuccess: (response) => {
				const endDate = response.subscription_ends_at
					? formatShortDate(response.subscription_ends_at)
					: "the end of your billing period";

				toast.success(`Subscription cancelled. Active until ${endDate}`);
				onResolve(true);
			},
			// Error handling provided by global handler in QueryProvider
			// This will show a toast automatically
		});
	};

	return (
		<Dialog open={true} onOpenChange={(open) => !open && onResolve(false)}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Cancel Pro Subscription</DialogTitle>
					<DialogDescription>
						Active until{" "}
						{subscription_ends_at
							? formatShortDate(subscription_ends_at)
							: "end of billing period"}
						, then you'll switch to Free.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{/* Free Plan Limits */}
					<div className="space-y-2.5">
						<p className="text-sm font-medium text-muted-foreground">
							Free plan limits:
						</p>
						<div className="space-y-2">
							<div className="flex items-start gap-3 text-sm">
								<Layers className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
								<div>
									<span className="font-medium">
										{freeTierLimits.maxMindmaps} mindmaps max
									</span>
									{current_mindmaps > freeTierLimits.maxMindmaps && (
										<span className="text-muted-foreground">
											{" "}
											(you have {current_mindmaps})
										</span>
									)}
								</div>
							</div>
							<div className="flex items-start gap-3 text-sm">
								<Shield className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
								<span>
									<span className="font-medium">
										{freeTierLimits.maxNodesPerMindmap} nodes
									</span>{" "}
									per mindmap
								</span>
							</div>
							<div className="flex items-start gap-3 text-sm">
								<Zap className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
								<span className="font-medium">No Pro features</span>
							</div>
						</div>
					</div>

					{/* Warning for users over mindmap limit */}
					{isOverMindmapLimit && (
						<div className="flex gap-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-3.5">
							<AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
							<div className="space-y-1">
								<p className="text-sm font-medium text-amber-900 dark:text-amber-100">
									{hiddenMindmapsCount} mindmap
									{hiddenMindmapsCount > 1 ? "s" : ""} will be hidden
								</p>
								<p className="text-xs text-amber-700 dark:text-amber-300">
									Access your {freeTierLimits.maxMindmaps} most recent. Others
									are preserved—reactivate Pro anytime to restore access.
								</p>
							</div>
						</div>
					)}
				</div>

				<DialogFooter className="gap-2 sm:gap-0">
					<Button
						variant="outline"
						onClick={() => onResolve(false)}
						disabled={isPending}
					>
						Keep Pro
					</Button>
					<Button
						variant="destructive"
						onClick={handleCancel}
						disabled={isPending}
					>
						{isPending ? "Cancelling..." : "Cancel Subscription"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
