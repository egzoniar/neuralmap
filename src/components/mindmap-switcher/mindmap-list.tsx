import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/ui/empty-state";
import { MindmapDropdownItem } from "./mindmap-dropdown-item";
import type { Mindmap } from "@/types/mindmap";

interface MindmapListProps {
	mindmaps: Mindmap[] | undefined;
	isLoading: boolean;
	onSelectMindmap: (id: string) => void;
}

export function MindmapList({
	mindmaps,
	isLoading,
	onSelectMindmap,
}: MindmapListProps) {
	if (isLoading) {
		return <LoadingState message="Loading mindmaps..." />;
	}

	if (!mindmaps?.length) {
		return <EmptyState message="No mindmaps yet" />;
	}

	return (
		<>
			{mindmaps.map((mindmap) => (
				<MindmapDropdownItem
					key={mindmap.id}
					mindmap={mindmap}
					onSelect={onSelectMindmap}
				/>
			))}
		</>
	);
}
