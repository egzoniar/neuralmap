"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/providers/store-provider";
import { CancelSubscriptionDialog } from "./cancel-subscription-dialog";
import { USER_TIERS, SUBSCRIPTION_STATUS } from "@/types/subscription";
import type { SubscriptionStatus } from "@/types/subscription";

interface CancelSubscriptionButtonProps {
	subscription: SubscriptionStatus;
	variant?: "default" | "outline" | "ghost" | "link";
	className?: string;
}

export function CancelSubscriptionButton({
	subscription,
	variant = "outline",
	className,
}: CancelSubscriptionButtonProps) {
	const showDialog = useAppStore((state) => state.dialog.show);
	const { tier, status } = subscription;

	// Guard: Only show for Pro users with active subscription
	if (tier !== USER_TIERS.PRO || status !== SUBSCRIPTION_STATUS.ACTIVE) {
		return null;
	}

	const handleClick = () => {
		showDialog({
			component: CancelSubscriptionDialog,
			props: { subscription },
		});
	};

	return (
		<Button variant={variant} onClick={handleClick} className={className}>
			Cancel Subscription
		</Button>
	);
}
