import type { User } from "@auth0/auth0-react";
import type { LoginOptions } from "@/types/auth";

/**
 * Auth API service
 * Encapsulates Auth0 SDK operations for consistency with other service patterns
 */
export const authApiService = {
	/**
	 * Get access token from Auth0
	 */
	async getAccessToken(params: {
		getAccessTokenSilently: () => Promise<string>;
		isAuthenticated: boolean;
	}): Promise<string | null> {
		if (!params.isAuthenticated) return null;
		return await params.getAccessTokenSilently();
	},

	/**
	 * Get authenticated user from Auth0
	 */
	async getAuthUser(params: {
		user: User | undefined;
		isAuthenticated: boolean;
	}): Promise<User | undefined> {
		if (!params.isAuthenticated || !params.user) return undefined;
		return params.user;
	},

	/**
	 * Login with Auth0 (redirects to Google OAuth)
	 */
	async login(params: {
		loginWithRedirect: (options?: LoginOptions) => Promise<void>;
		options?: LoginOptions;
	}): Promise<void> {
		await this.logAuthEvent("login_initiated");

		// Merge options with Google connection
		const loginOptions = {
			...params.options,
			authorizationParams: {
				...params.options?.authorizationParams,
				connection: "google-oauth2", // Skip Auth0 screen, go directly to Google
			},
		};

		await params.loginWithRedirect(loginOptions);
	},

	/**
	 * Logout from Auth0
	 */
	async logout(params: {
		logout: (options?: { logoutParams?: { returnTo?: string } }) => void;
	}): Promise<void> {
		await this.logAuthEvent("logout_initiated");
		params.logout({
			logoutParams: {
				returnTo: window.location.origin + "/login",
			},
		});
	},

	/**
	 * Log auth events for analytics/monitoring
	 */
	async logAuthEvent(event: string): Promise<void> {
		console.log("Auth event:", event);
		// Could send to analytics service
	},
};
