import { NODE_TYPE } from "./ui";

/**
 * Initial demo mindmap data
 * Provides a pre-populated experience for unauthenticated users
 */
export const DEMO_MINDMAP_ID = "demo-mindmap";

export const DEMO_NODES = [
	{
		id: "demo-root",
		type: NODE_TYPE.ROOT,
		data: {
			title: "Welcome to NeuralMap",
		},
		position: { x: 0, y: 0 },
	},
	{
		id: "demo-1",
		type: NODE_TYPE.NEURAL,
		data: {
			title: "Try adding nodes",
			content: "Click on a node and press Tab to create a connected node",
		},
		position: { x: 300, y: -100 },
	},
	{
		id: "demo-2",
		type: NODE_TYPE.NEURAL,
		data: {
			title: "Edit content",
			content: "Click any node to edit its title and content",
		},
		position: { x: 300, y: 100 },
	},
];

export const DEMO_EDGES = [
	{
		id: "demo-edge-1",
		source: "demo-root",
		target: "demo-1",
		sourceHandle: "b", // Right handle of root node
		targetHandle: "i", // Left TARGET handle of neural node
	},
	{
		id: "demo-edge-2",
		source: "demo-root",
		target: "demo-2",
		sourceHandle: "b", // Right handle of root node
		targetHandle: "i", // Left TARGET handle of neural node
	},
];
