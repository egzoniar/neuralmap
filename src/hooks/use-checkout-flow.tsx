"use client";

import { useLayoutEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { ROUTES } from "@/constants/routes";

type CheckoutState = "idle" | "success" | "error";

interface UseCheckoutFlowReturn {
	state: CheckoutState;
	transactionId: string | null;
	handleRetry: () => void;
}

/**
 * Hook to manage checkout flow state and redirects
 * Simplified: No polling, instant success on Paddle confirmation
 * Follows codebase pattern: side effects in custom hooks
 */
export function useCheckoutFlow(): UseCheckoutFlowReturn {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();

	const [state, setState] = useState<CheckoutState>("idle");

	const transactionId = searchParams.get("_ptxn");
	const status = searchParams.get("status");

	// Use useLayoutEffect to prevent flicker when setting state
	// This ensures state transitions happen before browser paint
	useLayoutEffect(() => {
		// Guard: Wait for auth to be ready
		if (isAuthLoading) return;

		// Guard: Redirect to login if not authenticated
		if (!isAuthenticated) {
			router.push(ROUTES.LOGIN);
			return;
		}

		// Guard: Redirect to home if no status parameter at all
		// User shouldn't be on this page without coming from checkout
		if (!status) {
			router.push(ROUTES.HOME);
			return;
		}

		// Only process state transitions if in idle state
		if (state !== "idle") return;

		// Handle different checkout statuses
		if (status === "success") {
			// Payment succeeded - show success immediately
			// Trust Paddle's inline checkout confirmation
			setState("success");
		} else {
			// Any other status (error, cancelled, failed, etc.) → error state
			// This includes manual navigation or payment failures
			setState("error");
		}
	}, [isAuthLoading, isAuthenticated, status, state, router]);

	const handleRetry = () => {
		router.push(ROUTES.PRICING);
	};

	return {
		state,
		transactionId,
		handleRetry,
	};
}
