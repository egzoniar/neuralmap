import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function LoginPage() {
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
					<Button className="w-full" size="lg" asChild>
						<a href={ROUTES.API_AUTH_LOGIN}>Sign in with Auth0</a>
					</Button>

					<p className="text-center text-xs text-muted-foreground">
						By signing in, you agree to our Terms of Service and Privacy Policy
					</p>
				</div>
			</div>
		</div>
	);
}
