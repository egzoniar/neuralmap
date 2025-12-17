import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Empty = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"flex flex-col items-center justify-center gap-3 text-center",
			className,
		)}
		{...props}
	/>
));
Empty.displayName = "Empty";

const EmptyHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"flex flex-col items-center gap-2 max-w-sm text-center",
			className,
		)}
		{...props}
	/>
));
EmptyHeader.displayName = "EmptyHeader";

const emptyMediaVariants = cva(
	"flex size-12 items-center justify-center rounded-full",
	{
		variants: {
			variant: {
				default: "",
				icon: "bg-muted text-muted-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const EmptyMedia = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof emptyMediaVariants>
>(({ className, variant, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(emptyMediaVariants({ variant }), className)}
		{...props}
	/>
));
EmptyMedia.displayName = "EmptyMedia";

const EmptyTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-lg font-semibold", className)}
		{...props}
	/>
));
EmptyTitle.displayName = "EmptyTitle";

const EmptyDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn(
			"text-sm text-muted-foreground [&_a]:underline [&_a:hover]:text-foreground",
			className,
		)}
		{...props}
	/>
));
EmptyDescription.displayName = "EmptyDescription";

const EmptyContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"flex flex-col items-center gap-4 w-full max-w-sm text-sm",
			className,
		)}
		{...props}
	/>
));
EmptyContent.displayName = "EmptyContent";

export {
	Empty,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
	EmptyDescription,
	EmptyContent,
};
