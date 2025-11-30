"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useSearchParams } from "next/navigation";
import { useOnboarding } from "@/hooks/use-onboarding";

export default function CallbackPage() {
	const { error, isLoading } = useAuth0();
	const searchParams = useSearchParams();

	// Get the returnTo parameter from query string, default to "/"
	const returnTo = searchParams.get("returnTo") || "/";

	// React Query handles onboarding automatically when user is authenticated
	// No useEffect needed - the query is enabled declaratively
	useOnboarding(true, returnTo);

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-red-600">
						Authentication Error
					</h1>
					<p className="mt-2 text-gray-600">{error.message}</p>
					<a
						href="/login"
						className="mt-4 inline-block text-blue-600 hover:underline"
					>
						Return to login
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<div className="text-lg">
					{isLoading
						? "Completing authentication..."
						: "Setting up your account..."}
				</div>
				<div className="mt-4 animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto" />
			</div>
		</div>
	);
}
