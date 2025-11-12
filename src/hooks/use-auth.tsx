"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

export function useAuth() {
	const { user, error, isLoading } = useUser();

	// Log authentication errors for debugging
	useEffect(() => {
		if (error) {
			console.error("Authentication error:", error);

			// You can add additional error handling here, such as:
			// - Sending errors to a logging service (e.g., Sentry)
			// - Showing a toast notification to the user
			// - Triggering a re-authentication flow
		}
	}, [error]);

	return {
		user,
		isAuthenticated: !!user,
		isLoading,
		error,
	};
}
