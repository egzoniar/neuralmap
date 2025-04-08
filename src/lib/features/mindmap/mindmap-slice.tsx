import { lens } from "@dhmk/zustand-lens";
import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
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
};

export const createMindmapSlice = lens<MindmapSlice>((set) => ({
  nodes: NODES_INITIAL_DATA as Node[],
  edges: EDGES_INITIAL_DATA as Edge[],
  onNodesChange: (changes) => set((state) => ({ 
    nodes: applyNodeChanges(changes, state.nodes) 
  })),
  onEdgesChange: (changes) => set((state) => ({ 
    edges: applyEdgeChanges(changes, state.edges) 
  })),
  onConnect: (connection) => set((state) => {
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
            targetHandle: connection.targetHandle
          }
        ]
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
}));
