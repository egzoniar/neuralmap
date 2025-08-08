// src/app/(public)/page.tsx
import { LoginButton } from "@/components/auth/login-button";

export default function HomePage() {
	return (
		<div className="flex flex-col items-center justify-center space-y-8 py-16 text-center">
			<h1 className="text-4xl font-bold tracking-tight">Welcome to Your App</h1>
			<p className="max-w-md text-muted-foreground">
				A powerful application for managing your tasks and projects.
			</p>
			<LoginButton />
		</div>
	);
}
