/**
 * Upgrade prompt messages for different tiers and limit types
 * These constants define all the text content shown when users hit their limits
 */

// Demo tier messages
export const DEMO_TITLE = "Sign Up to Continue";
export const DEMO_NODES_DESCRIPTION =
	"You've reached the demo limit of 40 nodes. Sign up for free to get full mindmap experience!";
export const DEMO_ACTION = "Sign Up for Free";

// Free tier messages
export const FREE_TITLE = "Upgrade to Pro";
export const FREE_DESCRIPTION =
	"You've reached your free tier limit. Upgrade to Pro for 600+ nodes per mindmap and unlimited mindmaps!";
export const FREE_ACTION = "Upgrade to Pro";

// Default/fallback messages
export const DEFAULT_TITLE = "Limit Reached";
export const DEFAULT_DESCRIPTION = "You've reached the maximum limit.";
export const DEFAULT_ACTION = "OK";
