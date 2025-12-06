"use client";

import type { CustomDialogProps } from "@/lib/features/dialog/types";
import type { LimitReachedInfo } from "@/types/subscription";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap } from "lucide-react";

interface UpgradePromptContentProps extends CustomDialogProps {
	limitInfo: LimitReachedInfo;
}

export function UpgradePromptContent({
	limitInfo,
	onResolve,
}: UpgradePromptContentProps) {
	const { type, max, tier } = limitInfo;

	const getMessage = () => {
		if (tier === "demo") {
			return {
				title: "Sign Up to Continue",
				description: `You've reached the demo limit of ${max} ${type}. Sign up for free to get ${type === "nodes" ? "60 nodes per mindmap" : "3 mindmaps"}!`,
				action: "Sign Up Free",
				icon: <Sparkles className="h-4 w-4" />,
			};
		}

		if (tier === "free") {
			return {
				title: "Upgrade to Pro",
				description: `You've reached your limit of ${max} ${type}. Upgrade to Pro for ${type === "nodes" ? "600+ nodes per mindmap" : "unlimited mindmaps"}!`,
				action: "Upgrade to Pro",
				icon: <Zap className="h-4 w-4 text-yellow-500" />,
			};
		}

		return {
			title: "Limit Reached",
			description: "You've reached the maximum limit.",
			action: "OK",
			icon: <Zap className="h-4 w-4" />,
		};
	};

	const message = getMessage();

	const handleAction = () => {
		if (tier === "demo") {
			window.location.href = "/login";
		} else if (tier === "free") {
			window.location.href = "/pricing";
		}
		onResolve(true);
	};

	return (
		<Dialog open={true} onOpenChange={() => onResolve(false)}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-base">
						{message.icon}
						{message.title}
					</DialogTitle>
					<DialogDescription className="text-sm">
						{message.description}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="gap-2 sm:gap-0">
					<Button variant="outline" onClick={() => onResolve(false)} size="sm">
						Cancel
					</Button>
					<Button onClick={handleAction} size="sm">
						{message.action}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
