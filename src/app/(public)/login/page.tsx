"use client";

import { Button } from "@/components/ui/button";
import { useLogin } from "@/services/auth/mutations";
import { useRouteGuard } from "@/hooks/use-route-guard";

export default function LoginPage() {
	const { mutate: login, isPending } = useLogin();
	const { isLoading, canRender } = useRouteGuard({
		requireAuth: false,
		redirectTo: "/map/default",
	});

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}

	// Don't render if user is authenticated (will redirect)
	if (!canRender) {
		return null;
	}

	const handleLogin = () => {
		login({
			appState: {
				returnTo: "/map/default",
			},
		});
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="mx-auto w-full max-w-md space-y-6 p-6">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">Welcome to NeuralMap</h1>
					<p className="text-muted-foreground">
						Sign in to access your mind maps
					</p>
				</div>

				<div className="space-y-4">
					<Button
						className="w-full"
						size="lg"
						onClick={handleLogin}
						disabled={isPending}
					>
						{isPending ? "Redirecting to Google..." : "Sign in with Google"}
					</Button>

					<p className="text-center text-xs text-muted-foreground">
						By signing in, you agree to our Terms of Service and Privacy Policy
					</p>
				</div>
			</div>
		</div>
	);
}
