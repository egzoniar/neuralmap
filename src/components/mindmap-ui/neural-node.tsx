"use client";

import { BaseNode } from "@/components/mindmap-ui/base-node";
import type { NodeProps } from "reactflow";
import type { MindmapNodeData } from "@/types/mindmap";

export function NeuralNode(props: NodeProps<MindmapNodeData>) {
	return (
		<BaseNode {...props}>
			{props.data.title && (
				<div className="text-lg font-semibold">{props.data.title}</div>
			)}
			{props.data.content && (
				<div className="text-sm font-medium">{props.data.content}</div>
			)}
		</BaseNode>
	);
}
