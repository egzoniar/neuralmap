export const ROUTES = {
	HOME: "/",
	LOGIN: "/login",
	DEMO: "/demo",
	PRICING: "/pricing",
	BILLING: "/settings/billing",
	CHECKOUT_RETURN: "/checkout/return",
	MAP: (id: string) => `/map/${id}`,
	API_AUTH_LOGIN: "/api/auth/login",
	API_AUTH_LOGOUT: "/api/auth/logout",
	API_AUTH_CALLBACK: "/api/auth/callback",
} as const;

export type RouteType = "home" | "mindmap" | "other";

export function getRouteType(pathname: string): RouteType {
	if (pathname === "/") return "home";
	if (/^\/map\/[^/]+$/.test(pathname)) return "mindmap";
	return "other";
}
