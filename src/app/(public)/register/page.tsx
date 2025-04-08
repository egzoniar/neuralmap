// src/app/(public)/register/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
	return (
		<div className="mx-auto max-w-md space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-2xl font-bold">Create an Account</h1>
				<p className="text-muted-foreground">Sign up to get started</p>
			</div>

			<div className="space-y-4">
				<Button className="w-full" asChild>
					<Link href="/api/auth/login">Sign up with Auth0</Link>
				</Button>

				<div className="text-center text-sm">
					<p>
						Already have an account?{" "}
						<Link href="/auth/login" className="text-primary hover:underline">
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
