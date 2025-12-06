"use client";

import { useEffect } from "react";
import { useAppStore } from "@/providers/store-provider";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services/queryKeys";
import { API_ENDPOINTS } from "@/constants/api";
import { fetchApi } from "@/lib/fetch-api";
import type { UserResponse } from "@/types/user";

/**
 * Hook to sync user tier from backend to Zustand
 * Fetches user profile and sets tier in application slice
 * Should be used in authenticated layouts
 */
export function useSyncUserTier() {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();
	const setTier = useAppStore((state) => state.application.setTier);

	const { data: user, isSuccess } = useQuery({
		queryKey: queryKeys.user.profile,
		queryFn: async () => {
			const token = await getAccessTokenSilently();
			return fetchApi<UserResponse>(API_ENDPOINTS.USER.ME, {
				method: "GET",
				token,
			});
		},
		enabled: isAuthenticated,
		staleTime: 5 * 60 * 1000, // Cache for 5 minutes
	});

	useEffect(() => {
		if (isSuccess && user) {
			// Map backend subscription_tier to frontend tier
			// Backend returns "free" | "pro", we already have these types
			const tier = user.subscription_tier;
			setTier(tier);
		}
	}, [isSuccess, user, setTier]);
}
