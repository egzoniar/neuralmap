import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
	message?: string;
	className?: string;
}

export function LoadingState({
	message = "Loading...",
	className,
}: LoadingStateProps) {
	return (
		<div
			className={cn("flex items-center justify-center gap-2 p-4", className)}
		>
			<Spinner className="text-muted-foreground" />
			<span className="text-sm text-muted-foreground">{message}</span>
		</div>
	);
}
