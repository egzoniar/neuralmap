export type UserTier = "demo" | "free" | "pro";

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
		maxNodesPerMindmap: 60,
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
}

/**
 * Detailed subscription status and usage information
 * Returned from GET /api/v1/billing/status
 */
export interface SubscriptionStatus {
	tier: UserTier;
	status: string | null;
	ends_at: string | null;
	limits: UserLimits;
	usage: {
		mindmap_count: number;
		nodes_per_mindmap: Record<string, number>;
	};
}

