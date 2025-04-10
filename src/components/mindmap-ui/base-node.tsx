"use client";

import type { NodeProps } from "reactflow";
import type { MindmapNodeData } from "@/types/mindmap";
import { cn } from "@/lib/utils";
import { Position } from "reactflow";
import { BaseHandle } from "@/components/mindmap-ui/base-handle";

interface BaseNodeProps extends NodeProps<MindmapNodeData> {
	children?: React.ReactNode;
	className?: string;
}

export function BaseNode({
	type,
	className,
	selected,
	children,
}: BaseNodeProps) {
	const isRootNode = type === "rootNode";

	return (
		<div
			className={cn(
				"transform transition-all duration-200",
				"bg-white text-black rounded-md p-3 shadow-md",
				{
					"bg-orange-600 text-white": isRootNode,
					"border border-gray-300": !isRootNode,
					"ring-4 border-transparent shadow-none ring-orange-600 ring-offset-4":
						selected,
					className,
				},
			)}
		>
			<div className="flex items-center justify-between">
				<div className="flex flex-col items-center gap-2">
					{children}
					{isRootNode && (
						<>
							<BaseHandle
								type="source"
								position={Position.Left}
								id="a"
								selected={selected}
							/>
							<BaseHandle
								type="source"
								position={Position.Right}
								id="b"
								selected={selected}
							/>
						</>
					)}
					{!isRootNode && (
						<>
							<BaseHandle
								type="source"
								position={Position.Left}
								id="c"
								selected={selected}
							/>
							<BaseHandle
								type="source"
								position={Position.Right}
								id="d"
								selected={selected}
							/>
							<BaseHandle
								type="source"
								position={Position.Bottom}
								id="e"
								selected={selected}
							/>
							<BaseHandle
								type="source"
								position={Position.Top}
								id="f"
								selected={selected}
							/>
							<BaseHandle
								type="target"
								position={Position.Bottom}
								id="g"
								selected={selected}
							/>
							<BaseHandle
								type="target"
								position={Position.Top}
								id="h"
								selected={selected}
							/>
							<BaseHandle
								type="target"
								position={Position.Left}
								id="i"
								selected={selected}
							/>
							<BaseHandle
								type="target"
								position={Position.Right}
								id="j"
								selected={selected}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
