"use client";

import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import Link from "next/link";

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
			<Link href="/api/auth/logout">Logout</Link>
		</Button>
	);
}
