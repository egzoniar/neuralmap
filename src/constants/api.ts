/**
 * External Backend API Endpoints
 *
 * Note: These are routes for your external backend server, NOT Next.js API routes.
 * The base URL is configured via NEXT_PUBLIC_SERVER_API_URL environment variable.
 * Base URL already includes /api/v1, so endpoints are relative to that.
 *
 * Auth0 handles authentication client-side, but these endpoints expect
 * Bearer token authorization for protected routes.
 */
export const API_ENDPOINTS = {
	AUTH: {
		ONBOARDING: "/auth/onboarding",
	},
	USER: {
		ME: "/users/me",
	},
	MINDMAPS: {
		LIST: "/mindmaps/",
		DETAIL: (id: string) => `/mindmaps/${id}`,
	},
};

export const API_STATUS = {
	SUCCESS: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	SERVER_ERROR: 500,
};
