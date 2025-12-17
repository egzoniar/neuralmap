"use client";

import { useSentryUser } from "@/hooks/use-sentry-user";

/**
 * Component to automatically set Sentry user context
 * Place this inside Auth0Provider to track authenticated users
 */
export function SentryUserContext() {
	useSentryUser();
	return null;
}
