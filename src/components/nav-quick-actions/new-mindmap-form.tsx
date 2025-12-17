"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconPicker } from "@/components/ui/icon-picker";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { validateMindmapForm } from "@/lib/validations/node-validation";
import type { MindmapValidationErrors } from "@/lib/validations/node-validation";

interface NewMindmapFormProps {
	name: string;
	onNameChange: (value: string) => void;
	description: string;
	onDescriptionChange: (value: string) => void;
	icon?: string;
	onIconChange: (icon: string | undefined) => void;
	onSubmit: () => void;
	isLoading?: boolean;
}

export function NewMindmapForm({
	name,
	onNameChange,
	description,
	onDescriptionChange,
	icon,
	onIconChange,
	onSubmit,
	isLoading = false,
}: NewMindmapFormProps) {
	const [errors, setErrors] = useState<MindmapValidationErrors>({});

	/**
	 * Handle form submission with validation
	 */
	const handleSubmit = () => {
		const validationErrors = validateMindmapForm({
			title: name,
			description: description || undefined,
			icon: icon || undefined,
		});

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		// Clear errors and submit
		setErrors({});
		onSubmit();
	};

	/**
	 * Handle Enter key press for quick submit
	 */
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !isLoading) {
			e.preventDefault();
			handleSubmit();
		}
	};

	/**
	 * Clear error for a field when user starts typing
	 */
	const handleNameChange = (value: string) => {
		onNameChange(value);
		if (errors.title) {
			setErrors((prev) => ({ ...prev, title: undefined }));
		}
	};

	const handleDescriptionChange = (value: string) => {
		onDescriptionChange(value);
		if (errors.description) {
			setErrors((prev) => ({ ...prev, description: undefined }));
		}
	};

	const handleIconChange = (value: string | undefined) => {
		onIconChange(value);
		if (errors.icon) {
			setErrors((prev) => ({ ...prev, icon: undefined }));
		}
	};

	return (
		<TooltipProvider delayDuration={300}>
			<div className="space-y-2">
				<div className="space-y-1">
					<h4 className="text-sm font-medium">Create New Mindmap</h4>
					<p className="text-xs text-muted-foreground leading-relaxed">
						Start organizing your thoughts and ideas visually.
					</p>
				</div>
				<div className="space-y-1">
					<div className="flex items-center gap-1">
						<Label htmlFor="mindmap-title" className="text-xs">
							Title
						</Label>
						<Tooltip>
							<TooltipTrigger asChild>
								<InfoIcon
									size={14}
									className="text-muted-foreground cursor-help"
								/>
							</TooltipTrigger>
							<TooltipContent side="right" className="max-w-[260px]">
								<p className="text-xs leading-snug">The icon is optional.</p>
							</TooltipContent>
						</Tooltip>
					</div>
					<div className="flex gap-2">
						<IconPicker
							value={icon}
							onChange={handleIconChange}
							aria-invalid={!!errors.icon}
						/>
						<Input
							id="mindmap-title"
							placeholder="Enter title..."
							value={name}
							onChange={(e) => handleNameChange(e.target.value)}
							onKeyDown={handleKeyDown}
							className="h-8 text-sm flex-1"
							autoFocus
							aria-invalid={!!errors.title}
							aria-describedby={errors.title ? "title-error" : undefined}
						/>
					</div>
					{errors.title && (
						<p id="title-error" className="text-xs text-destructive">
							{errors.title}
						</p>
					)}
					{errors.icon && (
						<p className="text-xs text-destructive">{errors.icon}</p>
					)}
				</div>
				<div className="space-y-1">
					<Label htmlFor="mindmap-description" className="text-xs">
						Description (optional)
					</Label>
					<Textarea
						id="mindmap-description"
						placeholder="Enter description..."
						value={description}
						onChange={(e) => handleDescriptionChange(e.target.value)}
						className="text-sm min-h-[60px] resize-none"
						aria-invalid={!!errors.description}
						aria-describedby={
							errors.description ? "description-error" : undefined
						}
					/>
					{errors.description && (
						<p id="description-error" className="text-xs text-destructive">
							{errors.description}
						</p>
					)}
				</div>
				<div className="flex justify-end">
					<Button
						onClick={handleSubmit}
						size="sm"
						variant="outline"
						disabled={!name.trim() || isLoading}
						className="pr-2"
					>
						{isLoading && <Spinner />}
						{isLoading ? "Creating..." : "Create"}
						{!isLoading && (
							<Kbd className="font-extrabold text-muted-foreground">⏎</Kbd>
						)}
					</Button>
				</div>
			</div>
		</TooltipProvider>
	);
}
