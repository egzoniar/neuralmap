"use client";

import { Button } from "@/components/ui/button";
import { useLogin } from "@/services/auth/mutations";

interface LoginButtonProps {
	className?: string;
	variant?: "default" | "outline" | "ghost";
	size?: "default" | "sm" | "lg";
	returnTo?: string;
}

export function LoginButton({
	className,
	variant = "default",
	size = "default",
	returnTo = "/",
}: LoginButtonProps) {
	const { mutate: login, isPending } = useLogin();

	return (
		<Button
			variant={variant}
			size={size}
			className={className}
			onClick={() => login({ appState: { returnTo } })}
			disabled={isPending}
		>
			{isPending ? "Loading..." : "Login"}
		</Button>
	);
}
