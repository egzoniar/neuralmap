import { Clock } from "lucide-react";

export function RecentEmptyState() {
	return (
		<div className="flex items-center gap-2 px-2 text-sm text-muted-foreground/70 group-data-[collapsible=icon]:hidden">
			<Clock size={16} className="shrink-0" />
			<span className="text-xs leading-relaxed">
				No recent mindmaps viewed yet
			</span>
		</div>
	);
}
