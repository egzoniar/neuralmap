"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import type { AuthState } from "@/types/auth";

export function useAuth(): AuthState {
	const { user, isAuthenticated, isLoading, error } = useAuth0();

	// Log authentication errors for debugging
	useEffect(() => {
		if (error) {
			console.error("Authentication error:", error);

			// You can add additional error handling here:
			// - Send to Sentry
			// - Show toast notification
			// - Trigger re-authentication
		}
	}, [error]);

	return {
		user: user || null,
		isAuthenticated,
		isLoading,
		error: error || null,
	};
}
