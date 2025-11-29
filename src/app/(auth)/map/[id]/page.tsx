import { MindmapViewer } from "@/components/mindmap-ui/mindmap-viewer";
import {
	NODES_INITIAL_DATA,
	EDGES_INITIAL_DATA,
} from "@/constants/initial-data";

interface MindmapPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function MindmapPage({ params }: MindmapPageProps) {
	const { id } = await params;

	return (
		<MindmapViewer
			mindmapId={id}
			initialNodes={NODES_INITIAL_DATA}
			initialEdges={EDGES_INITIAL_DATA}
		/>
	);
}
