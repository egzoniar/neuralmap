"use client";

import { useAppStore } from "@/providers/store-provider";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GoogleSignInButton } from "@/components/auth/google-signin-button";

export function DemoBanner() {
	const nodes = useAppStore((state) => state.mindmap.nodes);
	const limits = useAppStore((state) => state.application.limits);

	const nodeCount = nodes.length;
	const maxNodes = limits.maxNodesPerMindmap;

	return (
		<Alert className="border-yellow-500/50 bg-orange-50 dark:bg-yellow-950/10">
			<div className="flex items-center gap-4">
				<AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
				<AlertDescription className="flex items-center justify-between gap-4 w-full">
					<div className="flex items-center gap-2 text-sm">
						<span className="text-yellow-800 dark:text-yellow-200">
							Demo Mode • {nodeCount}/{maxNodes} nodes used
						</span>
						<span className="text-xs text-yellow-600 dark:text-yellow-400">
							(Changes will be lost on refresh)
						</span>
					</div>
					<GoogleSignInButton size="sm" returnTo="/" className="shrink-0" />
				</AlertDescription>
			</div>
		</Alert>
	);
}
