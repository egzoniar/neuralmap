"use client";

import { Component, type ReactNode } from "react";

interface FeatureErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	featureName: string;
	onReset?: () => void;
}

interface FeatureErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

/**
 * Feature-level error boundary for granular error isolation
 *
 * Architecture:
 * - Wraps individual features (mindmap, billing, settings)
 * - Prevents feature errors from crashing entire page
 * - Preserves surrounding UI (sidebar, navigation, other features)
 * - Provides feature-specific recovery options
 *
 * Pattern:
 * - Must be class component (only way to use componentDidCatch)
 * - Takes featureName for logging context
 * - Optional onReset callback for custom recovery
 * - Can provide custom fallback UI per feature
 *
 * Usage:
 * <FeatureErrorBoundary featureName="Mindmap Viewer">
 *   <MindmapViewer />
 * </FeatureErrorBoundary>
 *
 * Recovery:
 * - Try again (re-render component)
 * - Custom recovery action (via onReset prop)
 * - Navigation to safe page
 */
export class FeatureErrorBoundary extends Component<
	FeatureErrorBoundaryProps,
	FeatureErrorBoundaryState
> {
	constructor(props: FeatureErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
		};
	}

	static getDerivedStateFromError(
		error: Error,
	): Partial<FeatureErrorBoundaryState> {
		return {
			hasError: true,
			error,
		};
	}

	componentDidCatch(error: Error, errorInfo: { componentStack?: string }) {
		// Log error with feature context
		console.error(
			`🔴 Feature Error Boundary caught an error in ${this.props.featureName}:`,
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
		//     boundary: 'feature',
		//     feature: this.props.featureName,
		//   },
		// });
	}

	private handleReset = () => {
		// Clear error state and trigger custom reset if provided
		this.setState({
			hasError: false,
			error: null,
		});

		// Call custom reset handler if provided
		if (this.props.onReset) {
			this.props.onReset();
		}
	};

	render() {
		if (this.state.hasError) {
			// Use custom fallback if provided
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default fallback UI (feature-level error)
			return (
				<div className="flex h-full w-full items-center justify-center p-6">
					<div className="w-full max-w-md text-center space-y-4">
						<div className="space-y-2">
							<h2 className="text-xl font-semibold text-destructive">
								Failed to load {this.props.featureName}
							</h2>
							<p className="text-sm text-muted-foreground">
								We encountered an error while loading this feature. Please try
								again.
							</p>
						</div>

						{/* Show error details in development */}
						{process.env.NODE_ENV === "development" && this.state.error && (
							<div className="rounded-lg bg-muted p-3 text-left">
								<p className="text-xs font-medium mb-1">Error Details:</p>
								<pre className="text-xs text-muted-foreground overflow-auto max-h-32">
									{this.state.error.toString()}
								</pre>
							</div>
						)}

						<div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
							<button
								onClick={this.handleReset}
								className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
							>
								Try Again
							</button>
							<a
								href="/"
								className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
							>
								Go to Dashboard
							</a>
						</div>

						<p className="text-xs text-muted-foreground">
							If this continues, please refresh the page or contact support.
						</p>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
