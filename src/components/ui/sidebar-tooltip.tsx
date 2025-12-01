"use client";

import * as React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarTooltipProps {
	children: React.ReactNode;
	content: React.ReactNode;
	side?: "top" | "right" | "bottom" | "left";
	className?: string;
}

/**
 * Tooltip wrapper that only shows tooltips when sidebar is collapsed.
 * Use this instead of Tooltip directly in sidebar components.
 */
export function SidebarTooltip({
	children,
	content,
	side = "right",
	className,
}: SidebarTooltipProps) {
	const { state } = useSidebar();
	const isCollapsed = state === "collapsed";

	// Only render tooltip when collapsed
	if (!isCollapsed) {
		return <>{children}</>;
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent side={side} className={className}>
				{content}
			</TooltipContent>
		</Tooltip>
	);
}
