"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarTooltip } from "@/components/ui/sidebar-tooltip";

export function NewMindmapButton() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");

	const handleCreate = () => {
		if (name.trim()) {
			// TODO: Handle mindmap creation
			console.log("Creating mindmap:", name);
			setName("");
			setOpen(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleCreate();
		}
	};

	return (
		<SidebarMenuItem>
			<Popover open={open} onOpenChange={setOpen}>
				<SidebarTooltip
					content={<span className="font-medium">New Mindmap</span>}
				>
					<PopoverTrigger asChild>
						<SidebarMenuButton>
							<div className="flex aspect-square size-6 items-center justify-center rounded-md border bg-background">
								<Plus className="size-4" />
							</div>
							<span className="font-medium">New Mindmap</span>
						</SidebarMenuButton>
					</PopoverTrigger>
				</SidebarTooltip>
				<PopoverContent
					className="w-80 p-3"
					align="start"
					side="right"
					sideOffset={15}
				>
					<div className="space-y-2">
						<h4 className="text-sm font-medium">Create New Mindmap</h4>
						<p className="text-xs text-muted-foreground leading-relaxed">
							Start organizing your thoughts and ideas visually.
						</p>
						<div className="space-y-1.5">
							<Label htmlFor="mindmap-title" className="text-xs">
								Mindmap Title
							</Label>
							<Input
								id="mindmap-title"
								placeholder="Enter title..."
								value={name}
								onChange={(e) => setName(e.target.value)}
								onKeyDown={handleKeyDown}
								className="h-8 text-sm"
								autoFocus
							/>
						</div>
						<div className="flex justify-end">
							<Button onClick={handleCreate} size="sm" disabled={!name.trim()}>
								Create
							</Button>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</SidebarMenuItem>
	);
}
