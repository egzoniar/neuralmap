export const ROUTES = {
	HOME: "/",
	LOGIN: "/login",
	MAP: (id: string) => `/map/${id}`,
	API_AUTH_LOGIN: "/api/auth/login",
	API_AUTH_LOGOUT: "/api/auth/logout",
	API_AUTH_CALLBACK: "/api/auth/callback",
} as const;
