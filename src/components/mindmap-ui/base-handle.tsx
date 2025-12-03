"use client";

import { cn } from "@/lib/utils";
import { Handle, useNodeId } from "reactflow";
import type { HandleProps } from "reactflow";
import { useCreateNode } from "@/hooks/use-create-node";

interface BaseHandleProps extends HandleProps {
	selected?: boolean;
}

export function BaseHandle({ id, type, position, selected }: BaseHandleProps) {
	const nodeId = useNodeId();
	const { createNode, isPending } = useCreateNode();

	const isSource = type === "source";
	const isTarget = type === "target";

	const handleClick = (event: React.MouseEvent) => {
		// Don't create node if mutation is in progress
		if (isSource && nodeId && id && !isPending) {
			event.stopPropagation();
			createNode(nodeId, id, position);
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
				{ "cursor-pointer hover:opacity-100": isSource && !isPending },
				{ "cursor-not-allowed opacity-20": isSource && isPending },
			)}
		/>
	);
}
