export interface AuthUser {
	sub?: string;
	name?: string;
	email?: string;
	email_verified?: boolean;
	picture?: string;
	updated_at?: string;
	nickname?: string;
	[key: string]: unknown; // Allow additional Auth0 fields
}

export interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: AuthUser | null;
	error: Error | null;
}

export interface LoginOptions {
	appState?: {
		returnTo?: string;
	};
	authorizationParams?: {
		connection?: string;
		[key: string]: unknown;
	};
}
