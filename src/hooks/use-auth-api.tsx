"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";
import { fetchApi } from "@/lib/fetch-api";

/**
 * Hook that provides fetchApi with automatic token injection
 * Use this instead of fetchApi directly for authenticated requests
 */
export function useAuthApi() {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

	const authFetch = useCallback(
		async <T,>(
			endpoint: string,
			options: Parameters<typeof fetchApi>[1] = {},
		) => {
			if (!isAuthenticated) {
				throw new Error("User is not authenticated");
			}

			const token = await getAccessTokenSilently();
			return fetchApi<T>(endpoint, {
				...options,
				token,
			});
		},
		[getAccessTokenSilently, isAuthenticated],
	);

	return { authFetch, isAuthenticated };
}
