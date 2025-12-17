"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SubscriptionOverview } from "@/components/billing/subscription-overview";
import { UsageStats } from "@/components/billing/usage-stats";
import { PastDueAlert } from "@/components/billing/past-due-alert";
import { useGetSubscriptionStatus } from "@/services/billing/queries";
import {
	useResumeSubscription,
	useGetPaymentPortal,
} from "@/services/billing/mutations";
import { ROUTES } from "@/constants/routes";
import { SUBSCRIPTION_STATUS } from "@/types/subscription";
import { Loader2 } from "lucide-react";
import type { BillingPortalResponse } from "@/types/subscription";

export default function BillingPage() {
	const router = useRouter();
	const { data: subscription, isLoading, isError } = useGetSubscriptionStatus();
	const { mutate: resumeSubscription, isPending: isResuming } =
		useResumeSubscription();
	const { mutate: getPaymentPortal, isPending: isLoadingPortal } =
		useGetPaymentPortal();

	const handleUpgrade = () => {
		router.push(ROUTES.PRICING);
	};

	const handleKeepSubscription = () => {
		resumeSubscription(undefined, {
			onSuccess: () => {
				toast.success(
					"Subscription resumed! You will be charged at the next billing cycle.",
				);
			},
			// Error handling provided by global handler in QueryProvider
		});
	};

	const handleManagePayment = () => {
		getPaymentPortal(undefined, {
			onSuccess: (response: BillingPortalResponse) => {
				// Open portal in new tab
				window.open(response.portal_url, "_blank", "noopener,noreferrer");
				toast.info("Opening payment portal...");
			},
			// Error handling provided by global handler in QueryProvider
		});
	};

	// Guard: Show loading state
	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="flex flex-col items-center gap-3">
					<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
					<p className="text-sm text-muted-foreground">
						Loading subscription details...
					</p>
				</div>
			</div>
		);
	}

	// Guard: Show error state
	if (isError || !subscription) {
		return (
			<div className="flex min-h-screen items-center justify-center p-4">
				<div className="text-center max-w-md">
					<h2 className="text-lg font-semibold mb-2">
						Unable to load billing information
					</h2>
					<p className="text-sm text-muted-foreground mb-4">
						There was an error loading your subscription details. Please try
						again.
					</p>
					<button
						onClick={() => window.location.reload()}
						className="text-sm text-brand hover:underline"
					>
						Reload page
					</button>
				</div>
			</div>
		);
	}

	// Check if subscription is past due
	const isPastDue = subscription.status === SUBSCRIPTION_STATUS.PAST_DUE;

	return (
		<div className="container max-w-4xl mx-auto p-6 space-y-6">
			<div>
				<h1 className="text-3xl font-semibold tracking-tight">
					Billing & Subscription
				</h1>
				<p className="text-sm text-muted-foreground mt-1">
					Manage your subscription and view usage statistics
				</p>
			</div>

			{isPastDue && <PastDueAlert />}

			<div className="grid gap-6 md:grid-cols-2">
				<SubscriptionOverview
					subscription={subscription}
					onUpgrade={handleUpgrade}
					onKeepSubscription={handleKeepSubscription}
					onManagePayment={handleManagePayment}
					isKeeping={isResuming}
					isLoadingPortal={isLoadingPortal}
					isPastDue={isPastDue}
				/>
				<UsageStats subscription={subscription} />
			</div>
		</div>
	);
}
