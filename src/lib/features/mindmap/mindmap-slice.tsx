import { lens } from "@dhmk/zustand-lens";
import { applyNodeChanges, applyEdgeChanges, Position } from "reactflow";
import type { Node, Edge, NodeChange, EdgeChange, Connection } from "reactflow";
import { NODES_INITIAL_DATA, EDGES_INITIAL_DATA } from "@/constants";
type Selection = {
	nodes: Node[];
	edges: Edge[];
};

export type MindmapSlice = {
	nodes: Node[];
	edges: Edge[];
	selection?: Selection;
	onNodesChange: (changes: NodeChange[]) => void;
	onEdgesChange: (changes: EdgeChange[]) => void;
	onConnect: (connection: Connection) => void;
	onSelectionChange: (selection: Selection) => void;
	onSelectionStart: (selection: Selection) => void;
	onSelectionEnd: (selection: Selection) => void;
	onSelectionDragStart: (selection: Selection) => void;
	onSelectionDrag: (selection: Selection) => void;
	onSelectionDragEnd: (selection: Selection) => void;
	removeSelection: () => void;
	updateNodeData: (nodeId: string, data: Partial<Node["data"]>) => void;
	addNodeWithEdge: (sourceNodeId: string, sourceHandleId: string, handlePosition: Position) => void;
	deleteNode: (nodeId: string) => void;
};

export const createMindmapSlice = lens<MindmapSlice>((set) => ({
	nodes: NODES_INITIAL_DATA as Node[],
	edges: EDGES_INITIAL_DATA as Edge[],
	onNodesChange: (changes) =>
		set((state) => ({
			nodes: applyNodeChanges(changes, state.nodes),
		})),
	onEdgesChange: (changes) =>
		set((state) => ({
			edges: applyEdgeChanges(changes, state.edges),
		})),
	onConnect: (connection) =>
		set((state) => {
			// Only create an edge if source and target are valid strings
			if (connection.source && connection.target) {
				return {
					edges: [
						...state.edges,
						{
							id: `edge-${state.edges.length}`,
							source: connection.source,
							target: connection.target,
							sourceHandle: connection.sourceHandle,
							targetHandle: connection.targetHandle,
						},
					],
				};
			}
			return {}; // Return empty object if source or target is null
		}),
	onSelectionChange: (selection) => set({ selection }),
	onSelectionStart: (selection) => set({ selection }),
	onSelectionEnd: (selection) => set({ selection }),
	onSelectionDragStart: (selection) => set({ selection }),
	onSelectionDrag: (selection) => set({ selection }),
	onSelectionDragEnd: (selection) => set({ selection }),
	removeSelection: () =>
		set((state) => {
			const selection = state.selection;
			const nodes = selection?.nodes;
			const edges = selection?.edges;

			if (!nodes && !edges) {
				return state;
			}

			let updatedNodes = state.nodes;
			let updatedEdges = state.edges;

			if (nodes && nodes.length > 0) {
				updatedNodes = updatedNodes.map((node) => {
					if (nodes[0].id === node.id) {
						return { ...node, selected: false };
					}
					return node;
				});
			}

			if (edges && edges.length > 0) {
				updatedEdges = updatedEdges.map((edge) => {
					if (edges[0].id === edge.id) {
						return { ...edge, selected: false };
					}
					return edge;
				});
			}

			return {
				nodes: updatedNodes,
				edges: updatedEdges,
				selection: undefined,
			};
		}),
	updateNodeData: (nodeId, data) =>
		set((state) => ({
			nodes: state.nodes.map((node) =>
				node.id === nodeId
					? { ...node, data: { ...node.data, ...data } }
					: node,
			),
		})),
	addNodeWithEdge: (sourceNodeId, sourceHandleId, handlePosition) =>
		set((state) => {
			// Find the source node to get its position
			const sourceNode = state.nodes.find((node) => node.id === sourceNodeId);
			if (!sourceNode) return {};

			// Get the actual dimensions of the source node, with fallback values
			// ReactFlow measures and stores width/height after initial render
			const sourceWidth = sourceNode.width ?? 250; // Default node width
			const sourceHeight = sourceNode.height ?? 150; // Default node height

			// New nodes always start with default dimensions
			const newNodeWidth = 250;
			const newNodeHeight = 150;

			// Calculate spacing between nodes (padding to prevent collision)
			const padding = 100;

			// Calculate new node position based on handle position and node dimensions
			let newPosition = { x: sourceNode.position.x, y: sourceNode.position.y };

			switch (handlePosition) {
				case Position.Right:
					// Place new node to the right: sourceRight + padding
					newPosition = {
						x: sourceNode.position.x + sourceWidth + padding,
						y: sourceNode.position.y
					};
					break;
				case Position.Left:
					// Place new node to the left: sourceLeft - newNodeWidth - padding
					newPosition = {
						x: sourceNode.position.x - newNodeWidth - padding,
						y: sourceNode.position.y
					};
					break;
				case Position.Bottom:
					// Place new node below: sourceBottom + padding
					newPosition = {
						x: sourceNode.position.x,
						y: sourceNode.position.y + sourceHeight + padding
					};
					break;
				case Position.Top:
					// Place new node above: sourceTop - newNodeHeight - padding
					newPosition = {
						x: sourceNode.position.x,
						y: sourceNode.position.y - newNodeHeight - padding
					};
					break;
			}

			// Generate new IDs using crypto
			const newNodeId = crypto.randomUUID();
			const newEdgeId = crypto.randomUUID();

			// Determine target handle based on source handle position
			let targetHandleId = "i"; // default to left target
			switch (handlePosition) {
				case Position.Right:
					targetHandleId = "i"; // left target
					break;
				case Position.Left:
					targetHandleId = "j"; // right target
					break;
				case Position.Bottom:
					targetHandleId = "h"; // top target
					break;
				case Position.Top:
					targetHandleId = "g"; // bottom target
					break;
			}

			// Create new node
			const newNode: Node = {
				id: newNodeId,
				type: "neuralNode",
				data: {
					title: "New Node",
					content: "",
				},
				position: newPosition,
			};

			// Create new edge
			const newEdge: Edge = {
				id: newEdgeId,
				source: sourceNodeId,
				target: newNodeId,
				sourceHandle: sourceHandleId,
				targetHandle: targetHandleId,
			};

			return {
				nodes: [...state.nodes, newNode],
				edges: [...state.edges, newEdge],
			};
		}),
	deleteNode: (nodeId) =>
		set((state) => {
			// Don't allow deletion of root node
			const nodeToDelete = state.nodes.find((node) => node.id === nodeId);
			if (!nodeToDelete || nodeToDelete.type === "rootNode") {
				return {};
			}

			// Find parent edges (where this node is the target)
			const parentEdges = state.edges.filter((edge) => edge.target === nodeId);

			// Find child edges (where this node is the source)
			const childEdges = state.edges.filter((edge) => edge.source === nodeId);

			// Create new edges to reconnect children to parents
			const reconnectionEdges: Edge[] = [];
			parentEdges.forEach((parentEdge) => {
				childEdges.forEach((childEdge) => {
					reconnectionEdges.push({
						id: crypto.randomUUID(),
						source: parentEdge.source,
						target: childEdge.target,
						sourceHandle: childEdge.sourceHandle,
						targetHandle: childEdge.targetHandle,
					});
				});
			});

			// Remove the node and all edges connected to it
			const updatedNodes = state.nodes.filter((node) => node.id !== nodeId);
			const updatedEdges = state.edges
				.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
				.concat(reconnectionEdges);

			return {
				nodes: updatedNodes,
				edges: updatedEdges,
			};
		}),
}));
