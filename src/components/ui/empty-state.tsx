import { cn } from "@/lib/utils";

interface EmptyStateProps {
	message: string;
	icon?: React.ReactNode;
	className?: string;
}

export function EmptyState({ message, icon, className }: EmptyStateProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-center gap-2 p-4 text-center text-sm text-muted-foreground",
				className,
			)}
		>
			{icon && <span className="shrink-0">{icon}</span>}
			<span>{message}</span>
		</div>
	);
}
