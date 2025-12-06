"use client";

import { createContext, useContext } from "react";
import type { Connection, Position } from "reactflow";

/**
 * Context for mindmap actions (CRUD operations on nodes/edges)
 * Allows components to work in both demo and auth contexts
 * without knowing which implementation they're using
 */
interface MindmapActionsContextValue {
	createNode: (
		sourceNodeId: string,
		sourceHandleId: string,
		handlePosition: Position,
		shouldNewNodeBeSelected?: boolean,
	) => void;
	createEdge: (connection: Connection) => void;
	deleteNodes: (nodeIds: string[]) => void;
	deleteEdges: (edgeIds: string[]) => void;
	isCreateNodePending: boolean;
}

const MindmapActionsContext = createContext<
	MindmapActionsContextValue | undefined
>(undefined);

export function MindmapActionsProvider({
	children,
	value,
}: {
	children: React.ReactNode;
	value: MindmapActionsContextValue;
}) {
	return (
		<MindmapActionsContext.Provider value={value}>
			{children}
		</MindmapActionsContext.Provider>
	);
}

export function useMindmapActions() {
	const context = useContext(MindmapActionsContext);
	if (!context) {
		throw new Error(
			"useMindmapActions must be used within MindmapActionsProvider",
		);
	}
	return context;
}
