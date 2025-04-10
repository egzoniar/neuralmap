"use client";

import { BaseNode } from "@/components/mindmap-ui/base-node";
import type { NodeProps } from "reactflow";
import type { MindmapNodeData } from "@/types/mindmap";

export function RootNode(props: NodeProps<MindmapNodeData>) {
	return (
		<BaseNode {...props}>
			{props.data.title ? (
				<div className="text-2xl font-bold mx-3">{props.data.title}</div>
			) : (
				<div className="text-2xl text-muted-foreground font-bold mx-3">
					What do you have in mind?
				</div>
			)}
		</BaseNode>
	);
}
