"use client";

import { Auth0Provider as Auth0ProviderSDK } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { auth0Config } from "@/lib/auth0";

export function Auth0Provider({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const onRedirectCallback = (appState?: { returnTo?: string }) => {
		// After Auth0 redirect, navigate to callback page to handle onboarding
		// The callback page will trigger onboarding and then redirect to final destination
		const returnTo = appState?.returnTo || "/";
		router.push(`/callback?returnTo=${encodeURIComponent(returnTo)}`);
	};

	return (
		<Auth0ProviderSDK {...auth0Config} onRedirectCallback={onRedirectCallback}>
			{children}
		</Auth0ProviderSDK>
	);
}
