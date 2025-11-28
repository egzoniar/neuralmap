"use client";

import { cn } from "@/lib/utils";
import { Handle, useNodeId } from "reactflow";
import type { HandleProps } from "reactflow";
import { useAppStore } from "@/providers/store-provider";

interface BaseHandleProps extends HandleProps {
	selected?: boolean;
}

export function BaseHandle({ id, type, position, selected }: BaseHandleProps) {
	const nodeId = useNodeId();
	const addNodeWithEdge = useAppStore((state) => state.mindmap.addNodeWithEdge);

	const isSource = type === "source";
	const isTarget = type === "target";

	const handleClick = (event: React.MouseEvent) => {
		if (isSource && nodeId && id) {
			event.stopPropagation();
			addNodeWithEdge(nodeId, id, position);
		}
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
				{ "cursor-pointer hover:opacity-100": isSource },
			)}
		/>
	);
}
