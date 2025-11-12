"use client";

import { Button } from "@/components/ui/button"; // Assuming you have a Button component

interface LogoutButtonProps {
	className?: string;
	variant?: "default" | "outline" | "ghost";
	size?: "default" | "sm" | "lg";
}

export function LogoutButton({
	className,
	variant = "default",
	size = "default",
}: LogoutButtonProps) {
	return (
		<Button variant={variant} size={size} className={className} asChild>
			<a href="/api/auth/logout">Logout</a>
		</Button>
	);
}
