"use client";

import { BaseNode } from "@/components/mindmap-ui/base-node";
import type { NodeProps } from "reactflow";
import type { MindmapNodeData } from "@/types/mindmap";

export function RootNode(props: NodeProps<MindmapNodeData>) {
	return (
		<BaseNode {...props}>
			{props.data.title ? (
				<div className="text-base font-semibold mx-3 break-words">
					{props.data.title}
				</div>
			) : (
				<div className="text-base text-white/80 font-semibold mx-3">
					What do you have in mind?
				</div>
			)}
		</BaseNode>
	);
}
