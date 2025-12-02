"use client";

import { useRouter } from "next/navigation";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
} from "@/components/ui/sidebar";
import { NewMindmapButton } from "./new-mindmap-button";
import { useAppStore } from "@/providers/store-provider";

export function NavQuickActions() {
	const router = useRouter();
	const mindmaps = useAppStore((state) => state.mindmaps.mindmaps);
	const createMindmap = useAppStore((state) => state.mindmaps.createMindmap);

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					<NewMindmapButton />
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
