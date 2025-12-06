"use client";

import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { Position } from "reactflow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMindmapActions } from "@/contexts/mindmap-actions-context";

interface NodeDirectionButtonsProps {
	nodeId: string;
	isRootNode?: boolean;
}

export function NodeDirectionButtons({
	nodeId,
	isRootNode = false,
}: NodeDirectionButtonsProps) {
	const { createNode, isCreateNodePending } = useMindmapActions();

	const handleIds = {
		top: isRootNode ? "root-top" : "f",
		right: isRootNode ? "b" : "d",
		bottom: isRootNode ? "root-bottom" : "e",
		left: isRootNode ? "a" : "c",
	};

	const handleCreateNode = (handleId: string, position: Position) => {
		createNode(nodeId, handleId, position, true);
	};

	return (
		<div className="relative w-full max-w-[240px] h-[200px] mx-auto">
			<Button
				variant="outline"
				size="sm"
				onClick={() => handleCreateNode(handleIds.top, Position.Top)}
				disabled={isCreateNodePending}
				className="absolute top-[24px] left-1/2 -translate-x-1/2 w-8 h-8 p-0"
				title="Add node above"
			>
				<ArrowUp className="h-3.5 w-3.5" />
			</Button>

			<Button
				variant="outline"
				size="sm"
				onClick={() => handleCreateNode(handleIds.left, Position.Left)}
				disabled={isCreateNodePending}
				className="absolute left-[12px] top-1/2 -translate-y-1/2 w-8 h-8 p-0"
				title="Add node to the left"
			>
				<ArrowLeft className="h-3.5 w-3.5" />
			</Button>

			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<div
					className={cn(
						"w-28 h-14 rounded-lg flex items-center justify-center",
						"border-2 border-dashed",
						{
							"bg-orange-600/10 border-orange-600/30": isRootNode,
							"bg-gray-100 border-gray-300": !isRootNode,
						},
					)}
				>
					<div className="flex flex-col items-center gap-0.5">
						<Plus className="h-3.5 w-3.5 text-muted-foreground" />
						<span className="text-[10px] text-muted-foreground font-medium">
							Current Node
						</span>
					</div>
				</div>
			</div>

			<Button
				variant="outline"
				size="sm"
				onClick={() => handleCreateNode(handleIds.right, Position.Right)}
				disabled={isCreateNodePending}
				className="absolute right-[12px] top-1/2 -translate-y-1/2 w-8 h-8 p-0"
				title="Add node to the right"
			>
				<ArrowRight className="h-3.5 w-3.5" />
			</Button>

			<Button
				variant="outline"
				size="sm"
				onClick={() => handleCreateNode(handleIds.bottom, Position.Bottom)}
				disabled={isCreateNodePending}
				className="absolute bottom-[24px] left-1/2 -translate-x-1/2 w-8 h-8 p-0"
				title="Add node below"
			>
				<ArrowDown className="h-3.5 w-3.5" />
			</Button>
		</div>
	);
}
