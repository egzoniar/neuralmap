import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { billingApiService } from "@/services/billing/billing-api";
import { queryKeys } from "@/services/queryKeys";

/**
 * Hook to get public billing configuration from backend
 * No authentication required
 * Returns payment provider config (Paddle client token, environment, etc.)
 */
export function useGetBillingConfig() {
	return useQuery({
		queryKey: queryKeys.billing.config,
		queryFn: () => billingApiService.getBillingConfig(),
		staleTime: Infinity, // Config rarely changes, cache indefinitely
		retry: 3, // Retry on failure as this is critical for payments
	});
}

/**
 * Hook to get current user's subscription status and usage limits
 * Returns information about the current tier, limits, and usage
 * Enabled only when user is authenticated
 */
export function useGetSubscriptionStatus() {
	const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

	return useQuery({
		queryKey: queryKeys.billing.status,
		queryFn: async () => {
			const token = await getAccessTokenSilently();
			return billingApiService.getSubscriptionStatus(token);
		},
		enabled: isAuthenticated && !isLoading,
		staleTime: 5 * 60 * 1000, // Cache for 5 minutes
	});
}
