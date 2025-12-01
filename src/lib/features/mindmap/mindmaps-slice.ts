import { lens } from "@dhmk/zustand-lens";
import type { Mindmap } from "@/types/mindmap";

export type MindmapsSlice = {
	mindmaps: Mindmap[];
	activeMindmapId: string | null;
	setActiveMindmap: (id: string) => void;
	addMindmap: (mindmap: Mindmap) => void;
	removeMindmap: (id: string) => void;
	createMindmap: (name: string) => string;
};

/**
 * Generate a secure unique ID using the Web Crypto API
 * Falls back to a timestamp-based ID if crypto is not available (rare)
 */
export function generateMindmapId(): string {
	if (typeof crypto !== "undefined" && crypto.randomUUID) {
		return crypto.randomUUID();
	}

	// Fallback for environments without crypto.randomUUID (should not happen in modern browsers/Node)
	console.warn(
		"crypto.randomUUID() not available, using fallback ID generation",
	);
	return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

// Mock initial data for development
// TODO: Remove this once API integration is complete across the app
const MOCK_MINDMAPS: Mindmap[] = [
	{
		id: "550e8400-e29b-41d4-a716-446655440000",
		title: "My First Mindmap",
		description: "A sample mindmap for getting started",
		icon: "🧠",
		visibility: "private",
		user_id: "user-123",
		project_id: null,
		view_count: 0,
		last_viewed_at: new Date().toISOString(),
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
	{
		id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
		title: "Project Planning",
		description: "Planning for upcoming project",
		icon: "📋",
		visibility: "private",
		user_id: "user-123",
		project_id: null,
		view_count: 5,
		last_viewed_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
	{
		id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
		title: "Learning Notes",
		description: "Notes from online courses",
		icon: "📚",
		visibility: "private",
		user_id: "user-123",
		project_id: null,
		view_count: 3,
		last_viewed_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
];

export const createMindmapsSlice = lens<MindmapsSlice>((set) => ({
	mindmaps: MOCK_MINDMAPS,
	activeMindmapId: MOCK_MINDMAPS[0]?.id || null,
	setActiveMindmap: (id) =>
		set((state) => ({
			activeMindmapId: id,
			mindmaps: state.mindmaps.map((m) =>
				m.id === id
					? {
							...m,
							last_viewed_at: new Date().toISOString(),
							updated_at: new Date().toISOString(),
							view_count: m.view_count + 1,
						}
					: m,
			),
		})),
	addMindmap: (mindmap) =>
		set((state) => ({
			mindmaps: [...state.mindmaps, mindmap],
		})),
	removeMindmap: (id) =>
		set((state) => ({
			mindmaps: state.mindmaps.filter((m) => m.id !== id),
			activeMindmapId:
				state.activeMindmapId === id ? null : state.activeMindmapId,
		})),
	createMindmap: (name) => {
		const now = new Date().toISOString();
		const newMindmap: Mindmap = {
			id: generateMindmapId(),
			title: name,
			description: "",
			icon: "🧠",
			visibility: "private",
			user_id: "user-123", // TODO: Use actual user ID from auth
			project_id: null,
			view_count: 0,
			last_viewed_at: now,
			created_at: now,
			updated_at: now,
		};
		set((state) => ({
			mindmaps: [...state.mindmaps, newMindmap],
			activeMindmapId: newMindmap.id,
		}));
		return newMindmap.id;
	},
}));
