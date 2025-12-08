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
import { AlertTriangle } from "lucide-react";
import { useCancelSubscription } from "@/services/billing/mutations";
import { formatShortDate } from "@/utils/date";
import { TIER_LIMITS } from "@/types/subscription";
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
	const freeTierLimits = TIER_LIMITS.free;
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
			onError: (error) => {
				toast.error(
					error.message || "Failed to cancel subscription. Please try again.",
				);
			},
		});
	};

	return (
		<Dialog open={true} onOpenChange={(open) => !open && onResolve(false)}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-base">
						<AlertTriangle className="h-5 w-5 text-destructive" />
						Cancel Subscription?
					</DialogTitle>
					<DialogDescription className="text-sm">
						Your subscription will remain active until{" "}
						{subscription_ends_at
							? formatShortDate(subscription_ends_at)
							: "the end of your billing period"}
						. After that, you'll be downgraded to the Free plan.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-3">
					<div className="rounded-lg bg-muted p-3 space-y-2">
						<p className="text-sm font-medium">
							What happens after cancellation:
						</p>
						<ul className="text-sm space-y-1 ml-4 list-disc">
							<li>
								Maximum {freeTierLimits.maxMindmaps} mindmaps (you have:{" "}
								{current_mindmaps})
							</li>
							<li>
								Maximum {freeTierLimits.maxNodesPerMindmap} nodes per mindmap
								(down from {TIER_LIMITS.pro.maxNodesPerMindmap})
							</li>
							<li>No more Pro features</li>
						</ul>
					</div>

					{isOverMindmapLimit && (
						<div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
							<p className="text-sm font-medium text-yellow-800">
								⚠️ Important Notice
							</p>
							<p className="text-sm text-yellow-700 mt-1">
								You currently have {current_mindmaps} mindmaps. After
								cancellation, you'll only be able to access your{" "}
								{freeTierLimits.maxMindmaps} most recently created mindmaps.
							</p>
							<p className="text-xs text-yellow-600 mt-1">
								Your other {hiddenMindmapsCount} mindmap
								{hiddenMindmapsCount > 1 ? "s" : ""} will be preserved but
								hidden. Reactivate Pro to access them again.
							</p>
						</div>
					)}

					<p className="text-sm font-medium pt-2">
						Are you sure you want to cancel?
					</p>
				</div>

				<DialogFooter className="gap-2 sm:gap-0">
					<Button
						variant="outline"
						onClick={() => onResolve(false)}
						disabled={isPending}
					>
						Keep Subscription
					</Button>
					<Button
						variant="destructive"
						onClick={handleCancel}
						disabled={isPending}
					>
						{isPending ? "Cancelling..." : "Yes, Cancel Subscription"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
