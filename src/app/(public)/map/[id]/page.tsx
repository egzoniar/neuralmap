import MindmapViewer from "@/components/mindmap-ui/mindmap-viewer";
import { NODES_INITIAL_DATA, EDGES_INITIAL_DATA } from "@/constants";
import type { Position } from 'reactflow';

// Define the props type with params containing the id
interface MindmapPageProps {
  params: {
    id: string;
  };
}

// This function will be called at request time
export default async function MindmapPage({ params }: MindmapPageProps) {
  // Await the params object to properly handle dynamic route parameters
  const { id } = await Promise.resolve(params);
  
  // Convert string positions to Position enum values
  const typedNodes = NODES_INITIAL_DATA.map(node => ({
    ...node,
    sourcePosition: node.sourcePosition as unknown as Position,
    targetPosition: node.targetPosition as unknown as Position
  }));
  
  return <MindmapViewer mindmapId={id} initialNodes={typedNodes} initialEdges={EDGES_INITIAL_DATA} />
}
