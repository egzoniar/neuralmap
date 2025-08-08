"use client";

import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import Link from "next/link";

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
			<Link href="/api/auth/login">Login</Link>
		</Button>
	);
}
