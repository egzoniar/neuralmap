import { NODE_TYPE } from "./ui";

export const NODES_INITIAL_DATA = [
	{
		id: "1",
		type: NODE_TYPE.ROOT,
		data: {
			title: "Root Node",
			// Note: Root nodes don't have content property
		},
		position: { x: 0, y: 0 },
	},
	{
		id: "2",
		type: NODE_TYPE.NEURAL,
		data: {
			title: "Neural Node",
			content: "This is the neural node",
		},
		position: { x: 300, y: 0 },
	},
];

export const EDGES_INITIAL_DATA = [
	{
		id: "1",
		source: "1",
		target: "2",
		sourceHandle: "b",
		targetHandle: "i",
	},
];
