import { Spinner } from "@/components/ui/spinner";
import type { Mindmap } from "@/types/mindmap";
import { cn } from "@/lib/utils";

interface MindmapIconProps {
	mindmap: Mindmap | undefined;
	isLoading: boolean;
	spinnerStrokeWidth?: number;
	spinnerWidth?: number;
	iconClassName?: string;
}

export function MindmapIcon({
	mindmap,
	isLoading,
	spinnerStrokeWidth = 2,
	spinnerWidth = 20,
	iconClassName,
}: MindmapIconProps) {
	if (isLoading) {
		return <Spinner strokeWidth={spinnerStrokeWidth} width={spinnerWidth} />;
	}

	if (mindmap?.icon) {
		return (
			<span className={cn("text-base", iconClassName)}>{mindmap.icon}</span>
		);
	}

	return null;
}
