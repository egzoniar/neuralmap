"use client";

import { Button } from "@/components/ui/button";
import { IconPicker } from "@/components/ui/icon-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { InfoIcon } from "lucide-react";

interface NewMindmapFormProps {
	name: string;
	onNameChange: (value: string) => void;
	icon?: string;
	onIconChange: (icon: string | undefined) => void;
	onSubmit: () => void;
	isLoading?: boolean;
}

export function NewMindmapForm({
	name,
	onNameChange,
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
		<div className="space-y-3">
			<div className="space-y-1">
				<h4 className="text-sm font-medium">Create New Mindmap</h4>
				<p className="text-xs text-muted-foreground leading-relaxed">
					Start organizing your thoughts and ideas visually.
				</p>
				<div className="text-muted-foreground flex items-start gap-1">
					<InfoIcon size={16} className="pt-[2px] shrink-0" />
					<p className="text-xs leading-snug">
						You can use the{" "}
						<kbd className="bg-muted text-[10px] text-muted-foreground px-1.5 py-0.5 rounded-md">
							Enter
						</kbd>{" "}
						key to create a new mindmap.
					</p>
				</div>
				<div className="text-muted-foreground flex items-start gap-1">
					<InfoIcon size={16} className="pt-[2px] shrink-0" />
					<p className="text-xs leading-snug">
						The icon is optional, but it's a good way to identify your mindmap.
					</p>
				</div>
			</div>
			<div className="space-y-1.5">
				<Label htmlFor="mindmap-title" className="text-xs">
					Mindmap Title
				</Label>
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
			<div className="flex justify-end">
				<Button
					onClick={onSubmit}
					size="sm"
					disabled={!name.trim() || isLoading}
				>
					{isLoading && <Spinner />}
					{isLoading ? "Creating..." : "Create"}
				</Button>
			</div>
		</div>
	);
}
