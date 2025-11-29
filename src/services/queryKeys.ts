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
	},
} as const;
