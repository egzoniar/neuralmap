export const NODES_INITIAL_DATA = [
	{
		id: "1",
		type: "rootNode",
		data: {
			title: "Root Node",
		},
		position: { x: 0, y: 0 },
		// sourcePosition: "right",
		// targetPosition: "left",
	},
	{
		id: "2",
		type: "neuralNode",
		data: {
			title: "Neural Node",
			content: "This is the neural node",
		},
		position: { x: 300, y: 0 },
		// sourcePosition: "right",
		// targetPosition: "left",
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
