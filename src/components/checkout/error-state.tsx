"use client";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";

interface ErrorStateProps {
	onRetry: () => void;
	message?: string;
}

export function ErrorState({ onRetry, message }: ErrorStateProps) {
	const displayMessage =
		message ||
		"We couldn't complete your checkout. This might be a temporary issue with the payment provider.";

	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>Payment Error</EmptyTitle>
				<EmptyDescription>{displayMessage}</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button onClick={onRetry}>Try Again</Button>
				<EmptyDescription>
					Need help?{" "}
					<a href="#" className="underline">
						Contact support
					</a>
				</EmptyDescription>
			</EmptyContent>
		</Empty>
	);
}
