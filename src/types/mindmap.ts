import type { Node, Edge } from "reactflow";

/**
 * Node data structure for mindmap nodes
 * - title: Required for all node types
 * - content: Optional, only present for neural nodes (not root nodes)
 */
export type MindmapNodeData = {
	title: string;
	content?: string;
};

/**
 * Mindmap node with proper ReactFlow typing
 * Backend always provides: id, type, data, position
 */
export type MindmapNode = Node<MindmapNodeData>;

/**
 * Mindmap edge with proper ReactFlow typing
 * Includes optional handle IDs for multi-handle connections
 */
export type MindmapEdge = Edge & {
	sourceHandle?: string;
	targetHandle?: string;
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
 * Mindmap content structure stored in the content field
 * Backend guarantees all nodes have required properties (id, type, data, position)
 */
export type MindmapContent = {
	nodes: MindmapNode[];
	edges: MindmapEdge[];
};

/**
 * Full mindmap response matching backend MindmapResponse schema
 * Used for single mindmap views with complete content
 */
export type MindmapResponse = {
	id: string;
	title: string;
	description?: string | null;
	icon?: string | null;
	visibility: MindmapVisibility;
	user_id: string;
	project_id?: string | null;
	content: MindmapContent;
	view_count: number;
	last_viewed_at?: string | null;
	created_at: string;
	updated_at: string;
};

/**
 * Request body for creating a new mindmap
 * Only title is required - backend generates root node automatically
 */
export type MindmapCreate = {
	title: string;
	description?: string;
	icon?: string;
	visibility?: MindmapVisibility;
};

/**
 * Request body for updating a mindmap
 * All fields are optional - only send what needs to be updated
 * Content updates are validated by backend (e.g., root node must exist)
 */
export type MindmapUpdate = {
	title?: string;
	description?: string;
	icon?: string;
	visibility?: MindmapVisibility;
	content?: MindmapContent;
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
