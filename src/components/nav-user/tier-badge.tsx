"use client";

import { useAppStore } from "@/providers/store-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import type { UserTier } from "@/types/subscription";

const TIER_VALUES: Record<UserTier, UserTier> = {
	demo: "demo",
	free: "free",
	pro: "pro",
} as const;

export function TierBadge() {
	const tier = useAppStore((state) => state.application.tier);

	if (tier === TIER_VALUES.demo) {
		return null;
	}

	const isPro = tier === TIER_VALUES.pro;

	return (
		<Badge
			className={cn(
				"shrink-0 text-[10px] px-1.5 py-0 capitalize select-none",
				isPro
					? "bg-brand text-white dark:text-orange-300 border-brand-400/40"
					: "bg-muted-foreground/30 text-muted-foreground border-muted-foreground/20",
			)}
		>
			{isPro && <Zap className="h-3 w-3" />}
			{tier.toUpperCase()}
		</Badge>
	);
}
