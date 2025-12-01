export type MindmapNodeData = {
	title: string;
	content?: string;
};

export type MindmapEdge = {
	id: string;
	source: string;
	target: string;
};

/**
 * Visibility options for mindmaps (matches backend VisibilityEnum)
 */
export type MindmapVisibility = "private" | "public";

/**
 * Mindmap type matching backend MindmapListResponse schema
 * Used for list views without heavy content field
 */
export type Mindmap = {
	id: string;
	title: string;
	description?: string | null;
	icon?: string | null;
	visibility: MindmapVisibility;
	user_id: string;
	project_id?: string | null;
	view_count: number;
	last_viewed_at?: string | null;
	created_at: string;
	updated_at: string;
};

/**
 * Legacy type for backward compatibility with local store
 * @deprecated Use Mindmap type instead
 */
export type MindmapLegacy = {
	id: string;
	title: string;
	createdAt: string;
	lastAccessedAt?: string;
};
