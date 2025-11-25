"use client";

import { BaseNode } from "@/components/mindmap-ui/base-node";
import type { NodeProps } from "reactflow";
import type { MindmapNodeData } from "@/types/mindmap";
import { useMemo } from "react";
import { hasActualContent, processHtmlContent } from "@/utils/html-content";
import "highlight.js/styles/atom-one-dark.css";

export function NeuralNode(props: NodeProps<MindmapNodeData>) {
	// Check if content has actual text (not just empty HTML tags)
	const contentExists = useMemo(() => {
		return hasActualContent(props.data.content);
	}, [props.data.content]);

	// Sanitize and apply syntax highlighting to HTML content
	const processedContent = useMemo(() => {
		return processHtmlContent(props.data.content);
	}, [props.data.content]);

	return (
		<BaseNode {...props}>
			{props.data.title && (
				<div className="text-lg font-semibold leading-tight">
					{props.data.title}
				</div>
			)}
			{contentExists ? (
				<div
					className="text-sm node-content"
					dangerouslySetInnerHTML={{ __html: processedContent }}
				/>
			) : (
				<div className="text-sm text-muted-foreground italic opacity-70">
					Click to add content...
				</div>
			)}
		</BaseNode>
	);
}
