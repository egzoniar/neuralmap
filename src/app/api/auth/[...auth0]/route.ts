import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

// Note: The Next.js 15 "params should be awaited" warning is expected with @auth0/nextjs-auth0 v3.5.0
// This is a known compatibility issue that doesn't affect functionality

// Auth0 requires both GET and POST handlers
const auth = handleAuth({
	login: handleLogin({
		returnTo: '/map/default'
	}),
	logout: handleLogout({
		returnTo: '/login'
	})
});

export const GET = auth;
export const POST = auth;

