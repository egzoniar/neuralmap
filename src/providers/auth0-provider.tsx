"use client";

import type React from "react";
import { useUser } from "@auth0/nextjs-auth0";

export function Auth0Provider({ children }: { children: React.ReactNode }) {
	// In v4.4.2, the provider model is different
	// The session is handled automatically by the SDK
	const { user } = useUser();

	console.log("user", user);

	return <>{children}</>;
}
