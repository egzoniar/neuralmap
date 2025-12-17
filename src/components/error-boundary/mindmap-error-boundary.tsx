"use client";

import { FeatureErrorBoundary } from "./feature-error-boundary";
import { MindmapErrorFallback } from "./mindmap-error-fallback";
import type { ReactNode } from "react";

interface MindmapErrorBoundaryProps {
	children: ReactNode;
	mindmapId?: string;
	onReset?: () => void;
}

/**
 * Mindmap-specific error boundary wrapper
 *
 * Architecture:
 * - Extends FeatureErrorBoundary with mindmap-specific fallback
 * - Wraps MindmapViewer component
 * - Provides mindmap-specific recovery options
 * - Preserves sidebar and navigation on error
 *
 * Pattern:
 * - Composition over inheritance (wraps FeatureErrorBoundary)
 * - Separate presentational fallback component
 * - Passes mindmapId for context in fallback
 *
 * Usage:
 * <MindmapErrorBoundary mindmapId={mindmapId}>
 *   <MindmapViewer mindmapId={mindmapId} />
 * </MindmapErrorBoundary>
 *
 * Recovery:
 * - Reload mindmap (re-render)
 * - Return to dashboard
 * - Try different mindmap
 */
export function MindmapErrorBoundary({
	children,
	mindmapId,
	onReset,
}: MindmapErrorBoundaryProps) {
	return (
		<FeatureErrorBoundary
			featureName="Mindmap"
			fallback={<MindmapErrorFallback mindmapId={mindmapId} />}
			onReset={onReset}
		>
			{children}
		</FeatureErrorBoundary>
	);
}
