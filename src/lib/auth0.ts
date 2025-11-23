export const auth0Config = {
	domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string,
	clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string,
	authorizationParams: {
		redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI as string,
		audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE as string,
		scope: "openid profile email offline_access",
	},
	// Use refresh tokens for better security
	useRefreshTokens: true,
	cacheLocation: "localstorage" as const,
};
