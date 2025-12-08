export type UserTier = "demo" | "free" | "pro";

export const USER_TIERS = {
	DEMO: "demo",
	FREE: "free",
	PRO: "pro",
} as const;

export const SUBSCRIPTION_STATUS = {
	ACTIVE: "active",
	CANCELED: "canceled",
	PAST_DUE: "past_due",
	TRIALING: "trialing",
} as const;

export interface UserLimits {
	maxMindmaps: number;
	maxNodesPerMindmap: number;
}

export const TIER_LIMITS: Record<UserTier, UserLimits> = {
	demo: {
		maxMindmaps: 1,
		maxNodesPerMindmap: 40,
	},
	free: {
		maxMindmaps: 3,
		maxNodesPerMindmap: 100,
	},
	pro: {
		maxMindmaps: Number.POSITIVE_INFINITY,
		maxNodesPerMindmap: 600,
	},
};

export interface LimitReachedInfo {
	type: "mindmaps" | "nodes";
	current: number;
	max: number;
	tier: UserTier;
}

/**
 * Request body for creating a checkout session
 */
export interface CheckoutRequest {
	success_url: string;
	cancel_url: string;
}

/**
 * Public billing configuration from backend
 * Contains all client-side configuration needed for payment provider
 */
export interface BillingConfig {
	payment_provider: "stripe" | "paddle";
	price_id: string;
	environment?: "sandbox" | "production";
	client_token?: string; // For Paddle: client-side token for Paddle.js SDK
}

/**
 * Response from creating a checkout session
 * Contains checkout_url for redirect and session_id for inline modal
 * session_id is the Paddle transaction ID needed for Paddle.Checkout.open()
 */
export interface CheckoutResponse {
	checkout_url: string;
	session_id: string;
}

/**
 * Response from canceling a subscription
 */
export interface CancelSubscriptionResponse {
	message: string;
	subscription_ends_at: string | null;
	status: string;
}

/**
 * Response from resuming a canceled subscription
 */
export interface ResumeSubscriptionResponse {
	success: boolean;
	message: string;
	subscription_renews_at: string | null;
}

/**
 * Response from getting billing portal URL
 */
export interface BillingPortalResponse {
	portal_url: string;
}

/**
 * Payment method information from backend
 */
export interface PaymentMethodInfo {
	type: string;
	last4?: string;
	brand?: string;
}

/**
 * Detailed subscription status and usage information
 * Returned from GET /api/v1/billing/status
 * Note: Backend only returns "free" or "pro" - "demo" tier is frontend-only for non-authenticated users
 */
export interface SubscriptionStatus {
	tier: "free" | "pro";
	status: string | null;
	subscription_ends_at: string | null;
	cancellation_scheduled: boolean;
	current_mindmaps: number;
	max_mindmaps: number | null;
	max_nodes_per_mindmap: number;
	can_create_mindmap: boolean;
	price_amount: number | null;
	price_currency: string | null;
	billing_interval: string | null;
	payment_method: PaymentMethodInfo | null;
}
