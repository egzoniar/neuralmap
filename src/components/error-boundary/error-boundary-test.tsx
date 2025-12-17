"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

/**
 * Test component to demonstrate error boundary functionality
 *
 * Usage:
 * 1. Add to any page temporarily to test error boundaries
 * 2. Click buttons to trigger different types of errors
 * 3. Observe how error boundaries catch and display errors
 * 4. Remove this component when testing is complete
 *
 * Example usage in page:
 * import { ErrorBoundaryTest } from "@/components/error-boundary/error-boundary-test";
 *
 * <ErrorBoundaryTest />
 *
 * Note: This is a development tool - do not deploy to production
 */
export function ErrorBoundaryTest() {
	const [shouldThrowError, setShouldThrowError] = useState(false);

	// Render error (caught by error boundary)
	if (shouldThrowError) {
		throw new Error("Test error: Component intentionally threw an error");
	}

	const handleRenderError = () => {
		setShouldThrowError(true);
	};

	const handleAsyncError = async () => {
		// Simulate async error (NOT caught by error boundary)
		// This demonstrates that error boundaries only catch render errors
		try {
			throw new Error("Test error: Async operation failed");
		} catch (error) {
			console.error("Async error (not caught by boundary):", error);
			// In Phase 2, this will show a toast notification
		}
	};

	const handleEventHandlerError = () => {
		// Event handler error (NOT caught by error boundary)
		// This demonstrates that error boundaries don't catch event handler errors
		throw new Error("Test error: Event handler threw an error");
	};

	return (
		<Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
			<CardHeader>
				<div className="flex items-center gap-2">
					<AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
					<CardTitle className="text-amber-900 dark:text-amber-100">
						Error Boundary Test Component
					</CardTitle>
				</div>
				<CardDescription>
					Test how error boundaries handle different types of errors. This
					component should be removed before production deployment.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="space-y-2">
					<Button
						onClick={handleRenderError}
						variant="destructive"
						className="w-full"
					>
						Trigger Render Error (Caught by Boundary)
					</Button>
					<p className="text-xs text-muted-foreground">
						This will throw an error during render, which will be caught by the
						error boundary and display a fallback UI.
					</p>
				</div>

				<div className="space-y-2">
					<Button
						onClick={handleAsyncError}
						variant="outline"
						className="w-full"
					>
						Trigger Async Error (Not Caught)
					</Button>
					<p className="text-xs text-muted-foreground">
						Async errors are not caught by error boundaries. Check the console.
						(Will show toast in Phase 2)
					</p>
				</div>

				<div className="space-y-2">
					<Button
						onClick={handleEventHandlerError}
						variant="outline"
						className="w-full"
					>
						Trigger Event Handler Error (Not Caught)
					</Button>
					<p className="text-xs text-muted-foreground">
						Event handler errors are not caught by error boundaries. This will
						log to console but not crash the app.
					</p>
				</div>

				<div className="pt-2 border-t">
					<p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
						⚠️ Testing Guide:
					</p>
					<ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1 mt-1 ml-4 list-disc">
						<li>Render errors show the error boundary fallback UI</li>
						<li>
							Async/event errors log to console (Phase 2 will show toasts)
						</li>
						<li>Check different boundary levels (root, route, feature)</li>
						<li>Test recovery actions (Try Again, Go Home, etc.)</li>
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}
