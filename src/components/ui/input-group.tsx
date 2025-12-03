import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const InputGroup = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"relative flex items-center rounded-md border border-input bg-background shadow-sm has-[:focus-visible]:outline-none has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring",
				className,
			)}
			{...props}
		/>
	);
});
InputGroup.displayName = "InputGroup";

const InputGroupInput = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
InputGroupInput.displayName = "InputGroupInput";

const InputGroupTextarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				"flex min-h-[60px] w-full rounded-md bg-transparent px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
InputGroupTextarea.displayName = "InputGroupTextarea";

const inputGroupAddonVariants = cva(
	"flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-sm text-muted-foreground",
	{
		variants: {
			align: {
				"inline-start": "order-first",
				"inline-end": "order-last ml-auto",
				"block-start": "order-first w-full",
				"block-end": "order-last w-full",
			},
		},
		defaultVariants: {
			align: "inline-start",
		},
	},
);

const InputGroupAddon = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> &
		VariantProps<typeof inputGroupAddonVariants>
>(({ className, align, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(inputGroupAddonVariants({ align }), className)}
			{...props}
		/>
	);
});
InputGroupAddon.displayName = "InputGroupAddon";

const InputGroupText = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
	return (
		<span
			ref={ref}
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
});
InputGroupText.displayName = "InputGroupText";

interface InputGroupButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const InputGroupButton = React.forwardRef<
	HTMLButtonElement,
	InputGroupButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
});
InputGroupButton.displayName = "InputGroupButton";

export {
	InputGroup,
	InputGroupInput,
	InputGroupTextarea,
	InputGroupAddon,
	InputGroupText,
	InputGroupButton,
};
