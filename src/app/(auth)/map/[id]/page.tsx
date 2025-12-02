"use client";

import { use } from "react";
import { MindmapViewer } from "@/components/mindmap-ui/mindmap-viewer";

interface MindmapPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default function MindmapPage({ params }: MindmapPageProps) {
	const { id } = use(params);

	return <MindmapViewer mindmapId={id} />;
}
