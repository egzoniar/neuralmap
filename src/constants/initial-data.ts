export const NODES_INITIAL_DATA = [
	{
		id: "1",
		type: "input",
		data: { label: "Input Node" },
		position: { x: 0, y: 0 },
		sourcePosition: "right",
		targetPosition: "left",
	},
];

export const EDGES_INITIAL_DATA = [
	{
		id: "1",
		source: "1",
		target: "2",
		sourceHandle: "right",
		targetHandle: "left",
	},
];
