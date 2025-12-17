import { lens } from "@dhmk/zustand-lens";
import type { UserTier, UserLimits } from "@/types/subscription";
import { TIER_LIMITS, USER_TIERS } from "@/types/subscription";

/**
 * Application-level UI state
 * For global app state that doesn't belong to specific features
 */
export type ApplicationSlice = {
	tier: UserTier;
	limits: UserLimits;
	navigatingToMindmapId: string | null;
	setTier: (tier: UserTier) => void;
	setNavigatingToMindmap: (id: string | null) => void;
};

export const createApplicationSlice = lens<ApplicationSlice>((set) => ({
	// Default to demo tier
	tier: USER_TIERS.DEMO,
	limits: TIER_LIMITS[USER_TIERS.DEMO],
	navigatingToMindmapId: null,
	setTier: (tier) =>
		set({
			tier,
			limits: TIER_LIMITS[tier],
		}),
	setNavigatingToMindmap: (id) =>
		set({
			navigatingToMindmapId: id,
		}),
}));
