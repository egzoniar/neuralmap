"use client";

import { Component, type ReactNode } from "react";

interface RouteErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	routeName: string;
}

interface RouteErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

/**
 * Route-level error boundary for layout/page errors
 *
 * Architecture:
 * - Wraps route groups ((auth) and (public))
 * - Catches errors in page components and their children
 * - Preserves app structure when possible
 * - Provides route-specific recovery options
 *
 * Pattern:
 * - Must be class component (only way to use componentDidCatch)
 * - Takes routeName for logging context
 * - More lenient than app boundary (shows route fallback)
 * - Less lenient than feature boundary (more severe errors)
 *
 * Usage:
 * <RouteErrorBoundary routeName="Auth Routes">
 *   {children}
 * </RouteErrorBoundary>
 *
 * Recovery:
 * - Return to home page (safe navigation)
 * - Reload page (full recovery)
 */
export class RouteErrorBoundary extends Component<
	RouteErrorBoundaryProps,
	RouteErrorBoundaryState
> {
	constructor(props: RouteErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
		};
	}

	static getDerivedStateFromError(
		error: Error,
	): Partial<RouteErrorBoundaryState> {
		return {
			hasError: true,
			error,
		};
	}

	componentDidCatch(error: Error, errorInfo: { componentStack?: string }) {
		// Log error with route context
		console.error(
			`🔴 Route Error Boundary caught an error in ${this.props.routeName}:`,
			error,
		);
		console.error("Component Stack:", errorInfo.componentStack);

		// TODO: Send to error monitoring service (Phase 3)
		// Sentry.captureException(error, {
		//   contexts: {
		//     react: {
		//       componentStack: errorInfo.componentStack,
		//     },
		//   },
		//   tags: {
		//     boundary: 'route',
		//     route: this.props.routeName,
		//   },
		// });
	}

	private handleGoHome = () => {
		// Navigate to home page
		window.location.href = "/";
	};

	private handleReload = () => {
		// Reload current page
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			// Use custom fallback if provided
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default fallback UI (route-level error)
			return (
				<div className="flex min-h-screen items-center justify-center p-4 bg-background">
					<div className="w-full max-w-md text-center space-y-6">
						<div className="space-y-2">
							<h1 className="text-2xl font-semibold text-destructive">
								Page Error
							</h1>
							<p className="text-muted-foreground">
								We encountered an error while loading this page. Please try
								again or return to the home page.
							</p>
						</div>

						{/* Show error details in development */}
						{process.env.NODE_ENV === "development" && this.state.error && (
							<div className="rounded-lg bg-muted p-4 text-left">
								<p className="text-sm font-medium mb-2">Error Details:</p>
								<pre className="text-xs text-muted-foreground overflow-auto max-h-40">
									{this.state.error.toString()}
								</pre>
							</div>
						)}

						<div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
							<button
								onClick={this.handleReload}
								className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
							>
								Reload Page
							</button>
							<button
								onClick={this.handleGoHome}
								className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
							>
								Go to Home
							</button>
						</div>

						<p className="text-xs text-muted-foreground">
							Route: {this.props.routeName}
						</p>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
