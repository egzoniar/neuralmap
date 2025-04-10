import type { EdgeProps } from "reactflow";

export function BaseEdge({ id, source, target, ...props }: EdgeProps) {
	return <BaseEdge id={id} source={source} target={target} {...props} />;
}
