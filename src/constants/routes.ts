export const ROUTES = {
	HOME: "/",
	LOGIN: "/auth/login",
	REGISTER: "/auth/register",
	DASHBOARD: "/dashboard",
	PROFILE: "/profile",
	SETTINGS: "/settings",
	MINDMAP: (id: string) => `/mindmap/${id}`,
};
