// src/app/(auth)/layout.tsx
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Check if user is authenticated
	try {
		await auth0.getAccessToken();
	} catch (error) {
		// Redirect to login if not authenticated
		redirect("/login");
	}

	return (
		<div className="min-h-screen">
			{/* Auth navigation */}
			<header className="border-b p-4">
				<nav className="container mx-auto flex items-center justify-between">
					<h1 className="text-xl font-bold">Your App</h1>
					<div className="flex gap-4">
						<a href="/dashboard" className="hover:underline">
							Dashboard
						</a>
						<a href="/profile" className="hover:underline">
							Profile
						</a>
						<a href="/settings" className="hover:underline">
							Settings
						</a>
						<a
							href="/api/auth/logout"
							className="text-destructive hover:underline"
						>
							Logout
						</a>
					</div>
				</nav>
			</header>

			<main className="container mx-auto py-8">{children}</main>
		</div>
	);
}
