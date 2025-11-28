"use client";

import { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface BaseDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	onCancel?: () => void;
	title: string;
	children: ReactNode;
	confirmText?: string;
	cancelText?: string;
	variant?: "default" | "destructive";
	icon?: ReactNode;
	isLoading?: boolean;
}

export function BaseDialog({
	open,
	onOpenChange,
	onConfirm,
	onCancel,
	title,
	children,
	confirmText = "Confirm",
	cancelText = "Cancel",
	variant = "default",
	icon,
	isLoading = false,
}: BaseDialogProps) {
	const handleConfirm = () => {
		onConfirm();
		onOpenChange(false);
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						{icon || (
							<AlertTriangle
								className={`w-5 h-5 ${variant === "destructive" ? "text-destructive" : ""}`}
							/>
						)}
						{title}
					</DialogTitle>
					<DialogDescription asChild>
						<div className="space-y-2">{children}</div>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={handleCancel} disabled={isLoading}>
						{cancelText}
					</Button>
					<Button
						variant={variant}
						onClick={handleConfirm}
						disabled={isLoading}
					>
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
