export type MindmapNodeData = {
	title: string;
	content?: string;
};

export type MindmapEdge = {
	id: string;
	source: string;
	target: string;
};

export type Mindmap = {
	id: string;
	name: string;
	createdAt: string;
	lastAccessedAt?: string;
};
