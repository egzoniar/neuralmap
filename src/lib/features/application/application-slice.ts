import { lens } from "@dhmk/zustand-lens";

/**
 * Application-level UI state
 * For global app state that doesn't belong to specific features
 */
export type ApplicationSlice = {
	navigatingToMindmapId: string | null;
	setNavigatingToMindmap: (id: string | null) => void;
};

export const createApplicationSlice = lens<ApplicationSlice>((set) => ({
	navigatingToMindmapId: null,
	setNavigatingToMindmap: (id) =>
		set({
			navigatingToMindmapId: id,
		}),
}));
