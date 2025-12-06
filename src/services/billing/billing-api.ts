import { fetchApi } from "@/lib/fetch-api";
import { API_ENDPOINTS } from "@/constants/api";
import type {
	BillingConfig,
	CheckoutRequest,
	CheckoutResponse,
	CancelSubscriptionResponse,
	SubscriptionStatus,
} from "@/types/subscription";

/**
 * Billing API service
 * Handles all billing and subscription-related API calls
 */
export const billingApiService = {
	/**
	 * Get public billing configuration
	 * No authentication required - returns client-side payment provider config
	 */
	async getBillingConfig(): Promise<BillingConfig> {
		return await fetchApi<BillingConfig>(API_ENDPOINTS.BILLING.CONFIG, {
			method: "GET",
		});
	},

	/**
	 * Create a checkout session for upgrading to pro
	 * Returns a URL where the user should be redirected to complete payment
	 */
	async createCheckoutSession(
		token: string,
		data: CheckoutRequest,
	): Promise<CheckoutResponse> {
		return await fetchApi<CheckoutResponse>(API_ENDPOINTS.BILLING.CHECKOUT, {
			method: "POST",
			token,
			body: data,
		});
	},

	/**
	 * Cancel the current user's subscription
	 * Subscription will remain active until the end of the billing period
	 */
	async cancelSubscription(token: string): Promise<CancelSubscriptionResponse> {
		return await fetchApi<CancelSubscriptionResponse>(
			API_ENDPOINTS.BILLING.CANCEL,
			{
				method: "POST",
				token,
			},
		);
	},

	/**
	 * Get current user's subscription status and usage limits
	 * Returns information about the current tier, limits, and usage
	 */
	async getSubscriptionStatus(token: string): Promise<SubscriptionStatus> {
		return await fetchApi<SubscriptionStatus>(API_ENDPOINTS.BILLING.STATUS, {
			method: "GET",
			token,
		});
	},
};

