"use client";

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
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && name.trim() && !isLoading) {
			e.preventDefault();
			onSubmit();
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
						<IconPicker value={icon} onChange={onIconChange} />
						<Input
							id="mindmap-title"
							placeholder="Enter title..."
							value={name}
							onChange={(e) => onNameChange(e.target.value)}
							onKeyDown={handleKeyDown}
							className="h-8 text-sm flex-1"
							autoFocus
						/>
					</div>
				</div>
				<div className="space-y-1">
					<Label htmlFor="mindmap-description" className="text-xs">
						Description (optional)
					</Label>
					<Textarea
						id="mindmap-description"
						placeholder="Enter description..."
						value={description}
						onChange={(e) => onDescriptionChange(e.target.value)}
						className="text-sm min-h-[60px] resize-none"
					/>
				</div>
				<div className="flex justify-end">
					<Button
						onClick={onSubmit}
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
