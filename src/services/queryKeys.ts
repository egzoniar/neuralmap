// Add all query keys here
// Using factory pattern for consistent, type-safe query keys

export const queryKeys = {
	user: {
		all: ["user"] as const,
		profile: ["user", "profile"] as const,
	},
	auth: {
		user: ["auth", "user"] as const,
		accessToken: ["auth", "accessToken"] as const,
		onboarding: ["auth", "onboarding"] as const,
	},
	mindmaps: {
		all: ["mindmaps"] as const,
		list: ["mindmaps", "list"] as const,
		recent: (limit: number) => ["mindmaps", "recent", limit] as const,
		detail: (id: string) => ["mindmaps", "detail", id] as const,
	},
	billing: {
		all: ["billing"] as const,
		config: ["billing", "config"] as const,
		status: ["billing", "status"] as const,
	},
} as const;
