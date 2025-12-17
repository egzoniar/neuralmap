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
import {
	DEMO_TITLE,
	DEMO_NODES_DESCRIPTION,
	DEMO_ACTION,
	FREE_TITLE,
	FREE_DESCRIPTION,
	FREE_ACTION,
	DEFAULT_TITLE,
	DEFAULT_DESCRIPTION,
	DEFAULT_ACTION,
} from "@/constants/upgrade-messages";
import { USER_TIERS } from "@/types/subscription";

interface UpgradePromptContentProps extends CustomDialogProps {
	limitInfo: LimitReachedInfo;
}

export function UpgradePromptContent({
	limitInfo,
	onResolve,
}: UpgradePromptContentProps) {
	const { tier } = limitInfo;

	let title = DEFAULT_TITLE;
	let description = DEFAULT_DESCRIPTION;
	let action = DEFAULT_ACTION;
	let icon = <Zap className="h-4 w-4" />;

	if (tier === USER_TIERS.DEMO) {
		title = DEMO_TITLE;
		description = DEMO_NODES_DESCRIPTION;
		action = DEMO_ACTION;
		icon = <Sparkles className="h-4 w-4" />;
	}

	if (tier === USER_TIERS.FREE) {
		title = FREE_TITLE;
		description = FREE_DESCRIPTION;
		action = FREE_ACTION;
		icon = <Zap className="h-4 w-4 text-yellow-500" />;
	}

	const handleAction = () => {
		if (tier === USER_TIERS.DEMO) {
			window.location.href = "/login";
		} else if (tier === USER_TIERS.FREE) {
			window.location.href = "/pricing";
		}
		onResolve(true);
	};

	return (
		<Dialog open={true} onOpenChange={() => onResolve(false)}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-base">
						{icon}
						{title}
					</DialogTitle>
					<DialogDescription className="text-sm">
						{description}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="gap-2 sm:gap-0">
					<Button variant="outline" onClick={() => onResolve(false)} size="sm">
						Cancel
					</Button>
					<Button onClick={handleAction} size="sm">
						{action}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
