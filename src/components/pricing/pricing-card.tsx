"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PricingFeatureItem } from "./pricing-feature-item";
import { cn } from "@/lib/utils";

interface PricingCardProps {
	title: string;
	description: string;
	price: string;
	priceDescription: string;
	features: string[];
	buttonText: string;
	buttonVariant?: "default" | "outline";
	onButtonClick: () => void;
	isPopular?: boolean;
	isLoading?: boolean;
}

export function PricingCard({
	title,
	description,
	price,
	priceDescription,
	features,
	buttonText,
	buttonVariant = "default",
	onButtonClick,
	isPopular = false,
	isLoading = false,
}: PricingCardProps) {
	return (
		<Card
			className={cn(
				"relative flex flex-col transition-all hover:shadow-md",
				isPopular && "border-brand/20 shadow-md ring-1 ring-brand/10",
			)}
		>
			{isPopular && (
				<div className="absolute -top-4 left-1/2 -translate-x-1/2">
					<Badge className="bg-brand text-white text-[10px] px-2 py-0.5 shadow-sm">
						Most Popular
					</Badge>
				</div>
			)}
			<CardHeader className="pb-4">
				<CardTitle className="text-xl font-semibold">{title}</CardTitle>
				<CardDescription className="text-xs">{description}</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 space-y-4 pb-4">
				<div className="flex items-baseline gap-1.5">
					<span className="text-4xl font-bold tracking-tight">{price}</span>
					<span className="text-sm text-muted-foreground">
						{priceDescription}
					</span>
				</div>
				<ul className="space-y-2">
					{features.map((feature) => (
						<PricingFeatureItem key={feature} text={feature} />
					))}
				</ul>
			</CardContent>
			<CardFooter className="pt-0">
				<Button
					variant={buttonVariant}
					className={cn("w-full", isPopular && "bg-brand hover:bg-brand/90")}
					onClick={onButtonClick}
					disabled={isLoading}
				>
					{buttonText}
				</Button>
			</CardFooter>
		</Card>
	);
}
