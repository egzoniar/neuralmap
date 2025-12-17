"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppStore } from "@/providers/store-provider";
import { ErrorHandler } from "@/lib/error-handler";

/**
 * Hook to automatically set Sentry user context
 * 
 * Attaches user information to all Sentry error reports:
 * - User ID
 * - Email
 * - Subscription tier
 * 
 * This helps identify which users are affected by errors
 * and prioritize fixes based on user tier
 * 
 * Usage: Call once in root layout after auth provider
 */
export function useSentryUser() {
  const { user, isAuthenticated } = useAuth0();
  const tier = useAppStore((state) => state.application.tier);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Set user context in Sentry
      ErrorHandler.setUser({
        id: user.sub || "unknown",
        email: user.email,
        tier,
      });
    } else {
      // Clear user context on logout
      ErrorHandler.clearUser();
    }
  }, [isAuthenticated, user, tier]);
}

