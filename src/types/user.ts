export type UserProfile = {
	name: string;
	email: string;
	avatar: string;
};

export type User = {
	id: string;
	email: string;
	emailVerified: boolean;
	image: string;
};

/**
 * User response from backend API
 * Matches the UserResponse schema from the backend
 */
export interface UserResponse {
	email: string;
	name: string;
	picture: string | null;
	id: string;
	auth0_id: string;
	email_verified: boolean;
	is_active: boolean;
	subscription_tier: "demo" | "free" | "pro";
	subscription_status: string | null;
	subscription_ends_at: string | null;
	created_at: string;
	last_login_at: string | null;
}

/**
 * Response from the onboarding endpoint
 */
export interface UserOnboardingResponse {
	user: UserResponse;
	is_new_user: boolean;
	message: string;
}
