export const API_ENDPOINTS = {
	AUTH: {
		LOGIN: "/api/auth/login",
		LOGOUT: "/api/auth/logout",
		CALLBACK: "/api/auth/callback",
	},
	USER: {
		PROFILE: "/api/user/profile",
		SETTINGS: "/api/user/settings",
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
