"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, CreditCard, Calendar, ExternalLink, Loader2 } from "lucide-react";
import { formatShortDate } from "@/utils/date";
import { formatPrice } from "@/utils/currency";
import { SubscriptionStatusBadge } from "./subscription-status-badge";
import { SubscriptionActionButton } from "./subscription-action-button";
import { USER_TIERS, SUBSCRIPTION_STATUS } from "@/types/subscription";
import { SUBSCRIPTION_DISPLAY } from "@/constants/subscription";
import { cn } from "@/lib/utils";
import type { SubscriptionStatus } from "@/types/subscription";

interface SubscriptionOverviewProps {
	subscription: SubscriptionStatus;
	onUpgrade: () => void;
	onKeepSubscription?: () => void;
	onManagePayment?: () => void;
	isUpgrading?: boolean;
	isKeeping?: boolean;
	isLoadingPortal?: boolean;
	isPastDue?: boolean;
}

export function SubscriptionOverview({
	subscription,
	onUpgrade,
	onKeepSubscription,
	onManagePayment,
	isUpgrading = false,
	isKeeping = false,
	isLoadingPortal = false,
	isPastDue = false,
}: SubscriptionOverviewProps) {
	const {
		tier,
		status,
		subscription_ends_at,
		cancellation_scheduled,
		price_amount,
		price_currency,
		billing_interval,
		payment_method,
	} = subscription;

	// Derived state with clear names
	const isPro = tier === USER_TIERS.PRO;
	const isActive = status === SUBSCRIPTION_STATUS.ACTIVE;
	const isCancelled = cancellation_scheduled === true;
	const hasPaymentMethod = isPro && isActive && payment_method;

	// Format price display
	const getPriceDisplay = () => {
		if (isPro && price_amount && price_currency && billing_interval) {
			return formatPrice(price_amount, price_currency, billing_interval);
		}
		return isPro
			? SUBSCRIPTION_DISPLAY.PRO_PRICE_FALLBACK
			: SUBSCRIPTION_DISPLAY.FREE_PRICE;
	};

	const priceDisplay = getPriceDisplay();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg">Current Plan</CardTitle>
					<SubscriptionStatusBadge status={status} isCancelled={isCancelled} />
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between py-3 border-b">
					<div className="flex items-center gap-3">
						{isPro && <Zap className="h-5 w-5 text-brand" />}
						<div>
							<div className="font-semibold capitalize flex items-center gap-2">
								{tier}
								{isPro && (
									<Badge className="bg-brand text-white text-[10px] px-1.5 py-0">
										PRO
									</Badge>
								)}
							</div>
							<div className="text-sm text-muted-foreground">
								{priceDisplay}
							</div>
						</div>
					</div>
				</div>

				{isPro && subscription_ends_at && (
					<div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
						<Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
						<div className="flex-1">
							<div className="text-sm font-medium">
								{isCancelled ? "Subscription Ends" : "Next Renewal Date"}
							</div>
							<div className="text-sm text-muted-foreground">
								{formatShortDate(subscription_ends_at)}
							</div>
							{isCancelled ? (
								<div className="text-xs text-muted-foreground mt-1">
									You'll have access to Pro features until this date
								</div>
							) : (
								<div className="text-xs text-muted-foreground mt-1">
									Your subscription will automatically renew on this date
								</div>
							)}
						</div>
					</div>
				)}

				{isPro && (
					<div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
						<CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
						<div className="flex-1">
							<div className="text-sm font-medium">Payment Method</div>
							<div className="text-sm text-muted-foreground">
								{payment_method?.brand && payment_method?.last4
									? `${payment_method.brand} •••• ${payment_method.last4}`
									: "No payment method on file"}
							</div>
						</div>
						<div className="relative shrink-0">
							{isPastDue && (
								<div className="absolute inset-0 rounded-md ring-2 ring-amber-500/50 animate-pulse pointer-events-none" />
							)}
							<Button
								variant="ghost"
								size="sm"
								onClick={onManagePayment}
								disabled={isLoadingPortal || !onManagePayment}
								className="gap-1.5"
							>
								{isLoadingPortal && (
									<Loader2 className="h-3 w-3 animate-spin" />
								)}
								Manage
								{!isLoadingPortal && <ExternalLink className="h-3 w-3" />}
							</Button>
						</div>
					</div>
				)}

				<SubscriptionActionButton
					isPro={isPro}
					isActive={isActive}
					isCancelled={isCancelled}
					subscription={subscription}
					onUpgrade={onUpgrade}
					onKeepSubscription={onKeepSubscription}
					isUpgrading={isUpgrading}
					isKeeping={isKeeping}
				/>
			</CardContent>
		</Card>
	);
}
