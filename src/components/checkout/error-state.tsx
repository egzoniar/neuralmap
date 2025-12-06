"use client";

import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
	onRetry: () => void;
	message?: string;
}

export function ErrorState({ onRetry, message }: ErrorStateProps) {
	return (
		<div className="text-center space-y-6">
			<div className="flex justify-center">
				<XCircle className="h-16 w-16 text-red-600" />
			</div>
			<div className="space-y-2">
				<h2 className="text-2xl font-semibold">Something went wrong</h2>
				<p className="text-muted-foreground">
					{message || "We couldn't process your payment"}
				</p>
			</div>
			<div className="text-sm text-muted-foreground">
				<p>Please try again or contact support if the issue persists.</p>
			</div>
			<Button onClick={onRetry} size="lg" className="mt-4">
				Try Again
			</Button>
		</div>
	);
}
