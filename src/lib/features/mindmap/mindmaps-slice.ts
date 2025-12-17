import { lens } from "@dhmk/zustand-lens";
import type { Mindmap } from "@/types/mindmap";

export type MindmapsSlice = {
	mindmaps: Mindmap[];
	activeMindmapId: string | null;
	setMindmaps: (mindmaps: Mindmap[]) => void;
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

export const createMindmapsSlice = lens<MindmapsSlice>((set) => ({
	mindmaps: [],
	activeMindmapId: null,
	setMindmaps: (mindmaps) =>
		set({
			mindmaps,
		}),
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
