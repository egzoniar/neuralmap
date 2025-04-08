// src/app/(public)/login/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
	return (
		<div className="mx-auto max-w-md space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-2xl font-bold">Sign In</h1>
				<p className="text-muted-foreground">
					Enter your credentials to access your account
				</p>
			</div>

			<div className="space-y-4">
				<Button className="w-full" asChild>
					<Link href="/api/auth/login">Sign in with Auth0</Link>
				</Button>

				<div className="text-center text-sm">
					<p>
						Don't have an account?{" "}
						<Link
							href="/auth/register"
							className="text-primary hover:underline"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
