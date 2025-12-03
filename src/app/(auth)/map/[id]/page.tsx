"use client";

import { use } from "react";
import { MindmapViewer } from "@/components/mindmap-ui/mindmap-viewer";
import { useTrackMindmapView } from "@/hooks/use-track-mindmap-view";

interface MindmapPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function MindmapPage({ params }: MindmapPageProps) {
	const { id } = use(params);
	useTrackMindmapView(id);

	return <MindmapViewer mindmapId={id} />;
}
