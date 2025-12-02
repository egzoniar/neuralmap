import { Skeleton } from "@/components/ui/skeleton";

export function RecentLoadingSkeleton() {
	return (
		<div className="space-y-2 px-2 group-data-[collapsible=icon]:hidden">
			{[...Array(3)].map((_, i) => (
				<div key={i} className="flex items-center gap-2.5">
					<Skeleton className="size-7 shrink-0 rounded-md" />
					<div className="flex-1 space-y-1.5">
						<Skeleton className="h-3 w-3/4" />
						<Skeleton className="h-2.5 w-1/2" />
					</div>
				</div>
			))}
		</div>
	);
}
