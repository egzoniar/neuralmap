"use client";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface MindmapErrorFallbackProps {
	mindmapId?: string;
}

export function MindmapErrorFallback({ mindmapId }: MindmapErrorFallbackProps) {
	const router = useRouter();

	const handleTryAgain = () => {
		window.location.reload();
	};

	const handleGoHome = () => {
		router.push(ROUTES.HOME);
	};

	return (
		<div className="flex h-full w-full items-center justify-center p-6">
			<Empty className="max-w-md">
				<EmptyHeader>
					<EmptyTitle>Failed to Load Mindmap</EmptyTitle>
					<EmptyDescription>
						We encountered an unexpected error while loading your mindmap.
						Please try reloading or return home.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button onClick={handleTryAgain}>Try Again</Button>
						<Button onClick={handleGoHome} variant="outline">
							Go to Home
						</Button>
					</div>
					<EmptyDescription>
						Need help?{" "}
						<a href="#" className="underline">
							Contact support
						</a>
					</EmptyDescription>
				</EmptyContent>
			</Empty>
		</div>
	);
}
