import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { billingApiService } from "@/services/billing/billing-api";
import { queryKeys } from "@/services/queryKeys";
import type {
	CheckoutRequest,
	CheckoutResponse,
	CancelSubscriptionResponse,
} from "@/types/subscription";

/**
 * Hook to create a checkout session for upgrading to pro
 * Returns a checkout URL where the user should be redirected
 * On success, user should be redirected to the checkout_url
 */
export function useCreateCheckoutSession() {
	const { getAccessTokenSilently } = useAuth0();

	return useMutation<CheckoutResponse, Error, CheckoutRequest>({
		mutationFn: async (data: CheckoutRequest) => {
			const token = await getAccessTokenSilently();
			return billingApiService.createCheckoutSession(token, data);
		},
		// No invalidation needed - this just returns a URL for redirect
	});
}

/**
 * Hook to cancel the current user's subscription
 * Subscription will remain active until the end of the billing period
 * Invalidates user profile and billing status on success
 */
export function useCancelSubscription() {
	const queryClient = useQueryClient();
	const { getAccessTokenSilently } = useAuth0();

	return useMutation<CancelSubscriptionResponse, Error, void>({
		mutationFn: async () => {
			const token = await getAccessTokenSilently();
			return billingApiService.cancelSubscription(token);
		},
		onSuccess: () => {
			// Invalidate user profile to refresh subscription info
			queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
			// Invalidate billing status to refresh usage/limits
			queryClient.invalidateQueries({ queryKey: queryKeys.billing.status });
		},
	});
}
