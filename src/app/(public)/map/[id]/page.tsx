import MindmapViewer from "@/components/mindmap-ui/mindmap-viewer";
import { NODES_INITIAL_DATA, EDGES_INITIAL_DATA } from "@/constants";

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

	return (
		<MindmapViewer
			mindmapId={id}
			initialNodes={NODES_INITIAL_DATA}
			initialEdges={EDGES_INITIAL_DATA}
		/>
	);
}
