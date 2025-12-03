"use client";

import { ImageOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MINDMAP_ICONS } from "@/constants/ui";

interface IconPickerProps {
	value?: string;
	onChange: (icon: string | undefined) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
	const [open, setOpen] = useState(false);

	const handleSelect = (icon: string) => {
		onChange(icon);
		setOpen(false);
	};

	const handleClear = () => {
		onChange(undefined);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 w-10 text-base p-0">
					{value ? (
						value
					) : (
						<ImageOff size={16} className="text-muted-foreground" />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-64 p-2" align="start">
				<div className="grid grid-cols-8 gap-1">
					{MINDMAP_ICONS.map((icon) => (
						<button
							key={icon}
							type="button"
							onClick={() => handleSelect(icon)}
							className={cn(
								"h-8 w-8 flex items-center justify-center rounded text-base",
								"hover:bg-accent transition-colors",
								value === icon && "bg-accent ring-1 ring-accent-foreground/20",
							)}
						>
							{icon}
						</button>
					))}
				</div>
				{value && (
					<Button
						variant="ghost"
						size="sm"
						onClick={handleClear}
						className="w-full mt-2 h-7 text-xs text-muted-foreground"
					>
						Clear selection
					</Button>
				)}
			</PopoverContent>
		</Popover>
	);
}
