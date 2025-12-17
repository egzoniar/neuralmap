"use client";

import { Component, type ReactNode } from "react";

interface AppErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface AppErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: { componentStack?: string } | null;
}

/**
 * Root-level error boundary that catches all unhandled React errors
 *
 * Architecture:
 * - Wraps the entire application in app/layout.tsx
 * - Prevents full app crashes from propagating to browser
 * - Provides fallback UI with recovery options
 * - Logs errors to console (will be sent to Sentry in Phase 3)
 *
 * Pattern:
 * - Must be class component (only way to use componentDidCatch)
 * - Resets on navigation via key prop
 * - Separate presentational fallback component for clean separation
 *
 * Recovery:
 * - Full page reload (clears all state)
 * - User can also navigate away manually
 *
 * Note: Error boundaries don't catch:
 * - Async errors (use global error handler)
 * - Event handler errors (use try-catch)
 * - Server-side errors (use Next.js error.tsx)
 */
export class AppErrorBoundary extends Component<
	AppErrorBoundaryProps,
	AppErrorBoundaryState
> {
	constructor(props: AppErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(
		error: Error,
	): Partial<AppErrorBoundaryState> {
		// Update state so the next render will show the fallback UI
		return {
			hasError: true,
			error,
		};
	}

	componentDidCatch(error: Error, errorInfo: { componentStack?: string }) {
		// Log error details for debugging
		console.error("🔴 App Error Boundary caught an error:", error);
		console.error("Component Stack:", errorInfo.componentStack);

		// Store error info in state
		this.setState({
			errorInfo,
		});

		// TODO: Send to error monitoring service (Phase 3)
		// Sentry.captureException(error, {
		//   contexts: {
		//     react: {
		//       componentStack: errorInfo.componentStack,
		//     },
		//   },
		//   tags: {
		//     boundary: 'app-root',
		//   },
		// });
	}

	private handleReset = () => {
		// Clear error state and reload page
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			// Use custom fallback if provided, otherwise use default
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default fallback UI (full-page error)
			return (
				<div className="flex min-h-screen items-center justify-center p-4 bg-background">
					<div className="w-full max-w-md text-center space-y-6">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold text-destructive">
								Something went wrong
							</h1>
							<p className="text-muted-foreground">
								We encountered an unexpected error. Please reload the page to
								continue.
							</p>
						</div>

						{/* Show error details in development */}
						{process.env.NODE_ENV === "development" && this.state.error && (
							<div className="rounded-lg bg-muted p-4 text-left">
								<p className="text-sm font-medium mb-2">Error Details:</p>
								<pre className="text-xs text-muted-foreground overflow-auto max-h-48">
									{this.state.error.toString()}
								</pre>
								{this.state.errorInfo?.componentStack && (
									<pre className="text-xs text-muted-foreground overflow-auto max-h-48 mt-2">
										{this.state.errorInfo.componentStack}
									</pre>
								)}
							</div>
						)}

						<div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
							<button
								onClick={this.handleReset}
								className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
							>
								Reload Page
							</button>
							<a
								href="/"
								className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
							>
								Go to Home
							</a>
						</div>

						<p className="text-xs text-muted-foreground">
							If this problem persists, please contact support.
						</p>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
