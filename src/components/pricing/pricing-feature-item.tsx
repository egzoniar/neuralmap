"use client";

import { Check } from "lucide-react";

interface PricingFeatureItemProps {
	text: string;
}

export function PricingFeatureItem({ text }: PricingFeatureItemProps) {
	return (
		<li className="flex items-center gap-2.5">
			<Check className="h-4 w-4 shrink-0 text-primary" />
			<span className="text-sm text-muted-foreground leading-relaxed">
				{text}
			</span>
		</li>
	);
}
