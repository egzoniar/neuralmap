import { cn } from "@/lib/utils";
import { Handle, Position } from "reactflow";
import type { HandleProps } from "reactflow";

interface BaseHandleProps extends HandleProps {
	selected?: boolean;
}

export function BaseHandle({ id, type, position, selected }: BaseHandleProps) {
	return (
		<Handle
			id={id}
			type={type}
			position={position}
			className={cn("transition-opacity opacity-30", { "opacity-0": selected })}
		/>
	);
}
