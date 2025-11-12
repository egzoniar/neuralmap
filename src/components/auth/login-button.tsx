"use client";

import { Button } from "@/components/ui/button"; // Assuming you have a Button component

interface LoginButtonProps {
	className?: string;
	variant?: "default" | "outline" | "ghost";
	size?: "default" | "sm" | "lg";
}

export function LoginButton({
	className,
	variant = "default",
	size = "default",
}: LoginButtonProps) {
	return (
		<Button variant={variant} size={size} className={className} asChild>
			<a href="/api/auth/login">Login</a>
		</Button>
	);
}
