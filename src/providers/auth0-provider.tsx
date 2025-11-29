"use client";

import { Auth0Provider as Auth0ProviderSDK } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { auth0Config } from "@/lib/auth0";

export function Auth0Provider({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const onRedirectCallback = (appState?: { returnTo?: string }) => {
		router.push(appState?.returnTo || "/");
	};

	return (
		<Auth0ProviderSDK {...auth0Config} onRedirectCallback={onRedirectCallback}>
			{children}
		</Auth0ProviderSDK>
	);
}
