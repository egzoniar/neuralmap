"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/google-icon";
import { useLogin } from "@/services/auth/mutations";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface GoogleSignInButtonProps {
	/** Return URL after successful authentication */
	returnTo?: string;
	/** Button size variant */
	size?: ComponentProps<typeof Button>["size"];
	/** Button style variant */
	variant?: ComponentProps<typeof Button>["variant"];
	/** Additional CSS classes */
	className?: string;
	/** Whether to show full width button */
	fullWidth?: boolean;
}

export function GoogleSignInButton({
	returnTo = "/",
	size = "default",
	variant = "default",
	className,
	fullWidth = false,
}: GoogleSignInButtonProps) {
	const { mutate: login, isPending } = useLogin();

	const handleLogin = () => {
		login({
			appState: {
				returnTo,
			},
		});
	};

	return (
		<Button
			size={size}
			variant={variant}
			onClick={handleLogin}
			disabled={isPending}
			className={cn(
				fullWidth && "w-full",
				"font-semibold flex items-center gap-2 shrink-0",
				className,
			)}
		>
			{isPending ? (
				"Redirecting..."
			) : (
				<>
					<GoogleIcon className="h-4 w-4" />
					Sign in with Google
				</>
			)}
		</Button>
	);
}
