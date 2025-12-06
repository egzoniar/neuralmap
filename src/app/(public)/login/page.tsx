"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "@/components/auth/google-signin-button";
import { useRouteGuard } from "@/hooks/use-route-guard";
import { ROUTES } from "@/constants/routes";

export default function LoginPage() {
	const searchParams = useSearchParams();
	const router = useRouter();

	// Get the returnTo parameter from query string, default to "/"
	const returnTo = searchParams.get("returnTo") || "/";

	const { isLoading, canRender } = useRouteGuard({
		requireAuth: false,
		redirectTo: returnTo, // Redirect to returnTo if user is already authenticated
	});

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-sm text-muted-foreground">Loading...</div>
			</div>
		);
	}

	// Don't render if user is authenticated (will redirect)
	if (!canRender) {
		return null;
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="mx-auto w-full max-w-md space-y-6 p-6">
				<div className="space-y-2 text-center">
					<h1 className="text-2xl font-semibold">Welcome to NeuralMap</h1>
					<p className="text-sm text-muted-foreground">
						Sign in to access your mind maps
					</p>
				</div>

				<div className="space-y-4">
					<GoogleSignInButton
						returnTo={returnTo}
						fullWidth
						className="text-sm"
					/>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or
							</span>
						</div>
					</div>

					<Button
						variant="outline"
						className="w-full text-sm"
						size="default"
						onClick={() => router.push(ROUTES.DEMO)}
					>
						Try Demo
					</Button>

					<p className="text-center text-xs text-muted-foreground">
						By signing in, you agree to our Terms of Service and Privacy Policy
					</p>
				</div>
			</div>
		</div>
	);
}
