// src/app/(public)/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="flex flex-col items-center justify-center space-y-8 py-16 text-center">
			<h1 className="text-4xl font-bold tracking-tight">Welcome to Your App</h1>
			<p className="max-w-md text-muted-foreground">
				A powerful application for managing your tasks and projects.
			</p>
			<div className="flex gap-4">
				<Button asChild size="lg">
					<Link href="/auth/register">Get Started</Link>
				</Button>
				<Button variant="outline" asChild size="lg">
					<Link href="/auth/login">Sign In</Link>
				</Button>
			</div>
		</div>
	);
}
