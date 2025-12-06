"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessStateProps {
	onContinue: () => void;
}

export function SuccessState({ onContinue }: SuccessStateProps) {
	return (
		<div className="text-center space-y-6">
			<div className="flex justify-center">
				<CheckCircle2 className="h-16 w-16 text-green-600" />
			</div>
			<div className="space-y-2">
				<h2 className="text-2xl font-semibold">Welcome to Pro! 🎉</h2>
				<p className="text-muted-foreground">
					Your account has been successfully upgraded
				</p>
			</div>
			<div className="space-y-2 text-sm text-muted-foreground">
				<p>✨ Unlimited mindmaps</p>
				<p>🚀 Up to 600+ nodes per mindmap</p>
				<p>⚡ Priority support</p>
			</div>
			<Button onClick={onContinue} size="lg" className="mt-4">
				Get Started
			</Button>
		</div>
	);
}
