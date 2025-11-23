"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/services/auth/mutations";

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
	const { mutate: logout, isPending } = useLogout();

	return (
		<Button
			variant={variant}
			size={size}
			className={className}
			onClick={() => logout()}
			disabled={isPending}
		>
			{isPending ? "Logging out..." : "Logout"}
		</Button>
	);
}
