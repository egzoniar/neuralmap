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
		detail: (id: string) => ["mindmaps", "detail", id] as const,
	},
} as const;
