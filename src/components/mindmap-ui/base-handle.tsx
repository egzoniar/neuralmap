"use client";

import { cn } from "@/lib/utils";
import { Handle, useNodeId } from "reactflow";
import type { HandleProps } from "reactflow";
import { useMindmapActions } from "@/contexts/mindmap-actions-context";

interface BaseHandleProps extends HandleProps {
	selected?: boolean;
}

export function BaseHandle({ id, type, position, selected }: BaseHandleProps) {
	const nodeId = useNodeId();
	const { createNode, isCreateNodePending } = useMindmapActions();

	const isSource = type === "source";
	const isTarget = type === "target";

	const handleClick = (event: React.MouseEvent) => {
		// Only source handles create nodes (targets just receive connections)
		if (!isSource) return;

		// Guard: Don't create node if mutation is in progress
		if (isCreateNodePending) return;

		// Guard: Ensure we have required data (defensive programming)
		if (!nodeId || !id) return;

		event.stopPropagation();
		createNode(nodeId, id, position);
	};

	return (
		<Handle
			id={id}
			type={type}
			position={position}
			onClick={handleClick}
			className={cn(
				"transition-opacity duration-200 opacity-30",
				{ invisible: isTarget },
				{ "source-handle-scale": isSource },
				{
					"cursor-pointer hover:opacity-100": isSource && !isCreateNodePending,
				},
				{ "cursor-not-allowed opacity-20": isSource && isCreateNodePending },
			)}
		/>
	);
}
