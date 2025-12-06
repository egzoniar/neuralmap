"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTooltip } from "@/components/ui/sidebar-tooltip";
import { ROUTES } from "@/constants/routes";
import { useCreateMindmap } from "@/services/mindmap/mutations";
import { useCheckMindmapLimit } from "@/hooks/use-check-mindmap-limit";
import { NewMindmapForm } from "./new-mindmap-form";

export function NewMindmapButton() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [icon, setIcon] = useState<string | undefined>(undefined);
	const router = useRouter();
	const createMindmap = useCreateMindmap();
	const checkMindmapLimit = useCheckMindmapLimit();

	const handleCreate = async () => {
		if (name.trim() && !createMindmap.isPending) {
			// Check limit first (shows prompt if at limit)
			const canCreate = await checkMindmapLimit();

			// If limit reached, stop here
			if (!canCreate) return;

			// Under limit - proceed with backend creation
			createMindmap.mutate(
				{
					title: name.trim(),
					description: description.trim() || undefined,
					icon,
				},
				{
					onSuccess: (mindmap) => {
						setName("");
						setDescription("");
						setIcon(undefined);
						setOpen(false);
						router.push(ROUTES.MAP(mindmap.id));
					},
				},
			);
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<SidebarTooltip content="Create new mindmap" side="right">
				<PopoverTrigger asChild>
					<Button
						size="sm"
						variant="ghost"
						className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-0"
					>
						<Plus size={18} className="shrink-0" />
						<span className="group-data-[collapsible=icon]:hidden">
							Create new mindmap
						</span>
					</Button>
				</PopoverTrigger>
			</SidebarTooltip>
			<PopoverContent
				className="w-80 p-3"
				align="start"
				side="right"
				sideOffset={15}
			>
				<NewMindmapForm
					name={name}
					onNameChange={setName}
					description={description}
					onDescriptionChange={setDescription}
					icon={icon}
					onIconChange={setIcon}
					onSubmit={handleCreate}
					isLoading={createMindmap.isPending}
				/>
			</PopoverContent>
		</Popover>
	);
}
