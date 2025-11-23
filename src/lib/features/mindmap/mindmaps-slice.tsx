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
const MOCK_MINDMAPS: Mindmap[] = [
	{
		id: "550e8400-e29b-41d4-a716-446655440000",
		name: "My First Mindmap",
		createdAt: new Date().toISOString(),
	},
	{
		id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
		name: "Project Planning",
		createdAt: new Date().toISOString(),
	},
	{
		id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
		name: "Learning Notes",
		createdAt: new Date().toISOString(),
	},
];

export const createMindmapsSlice = lens<MindmapsSlice>((set) => ({
	mindmaps: MOCK_MINDMAPS,
	activeMindmapId: MOCK_MINDMAPS[0]?.id || null,
	setActiveMindmap: (id) => set({ activeMindmapId: id }),
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
		const newMindmap: Mindmap = {
			id: generateMindmapId(),
			name,
			createdAt: new Date().toISOString(),
		};
		set((state) => ({
			mindmaps: [...state.mindmaps, newMindmap],
			activeMindmapId: newMindmap.id,
		}));
		return newMindmap.id;
	},
}));
