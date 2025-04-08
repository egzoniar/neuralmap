"use client";

import { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  type NodeTypes,
  type EdgeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useAppStore } from "@/providers/store-provider";
import { NODE_TYPES, EDGE_TYPES } from "@/constants";

interface MindmapViewerProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  mindmapId: string;
}

export default function MindmapViewer({ 
  initialNodes, 
  initialEdges,
  mindmapId 
}: MindmapViewerProps) {
  // Use your Zustand store instead of ReactFlow's hooks
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange,
    onConnect,
    onSelectionChange
  } = useAppStore((state) => state.mindmap);
  
  // Memoize nodeTypes and edgeTypes to prevent recreation on each render
  const nodeTypes = useMemo<NodeTypes>(() => ({
    // Empty object for now, will add custom nodes later if needed
  }), []);

  const edgeTypes = useMemo<EdgeTypes>(() => ({
    // Empty object for now, will add custom edges later if needed
  }), []);
  
  return (
    <div className="h-[600px] w-full border rounded-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
} 