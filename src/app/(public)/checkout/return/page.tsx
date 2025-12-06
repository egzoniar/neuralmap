"use client";

import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { useQueryClient } from "@tanstack/react-query";
import { useCheckoutFlow } from "@/hooks/use-checkout-flow";
import { SuccessState } from "@/components/checkout/success-state";
import { ErrorState } from "@/components/checkout/error-state";
import { ROUTES } from "@/constants/routes";
import { queryKeys } from "@/services/queryKeys";
import { useEffect } from "react";

/**
 * Checkout Return Page
 *
 * Simplified flow with inline checkout:
 * - Paddle confirms payment → instant success display
 * - Background query invalidation refreshes user tier
 * - No polling needed - trust Paddle's confirmation + webhook
 */

export default function CheckoutReturnPage() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();

	const { state, handleRetry } = useCheckoutFlow();

	// Invalidate queries when showing success
	// This triggers background refresh of user tier
	useEffect(() => {
		if (state === "success") {
			// Refresh all user and billing data in background
			queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
			queryClient.invalidateQueries({ queryKey: queryKeys.billing.status });
		}
	}, [state, queryClient]);

	const handleContinue = () => {
		router.push(ROUTES.HOME);
	};

	// Guard: Show nothing while checking auth
	if (isAuthLoading || !isAuthenticated) {
		return null;
	}

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="w-full max-w-md">
				{state === "success" && <SuccessState onContinue={handleContinue} />}

				{state === "error" && <ErrorState onRetry={handleRetry} />}
			</div>
		</div>
	);
}
