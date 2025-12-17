export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";

			// Auth0 configuration (server-side for validation)
			AUTH0_DOMAIN: string;
			AUTH0_CLIENT_ID: string;
			AUTH0_AUDIENCE: string;

			// Auth0 configuration (client-side - exposed to browser with NEXT_PUBLIC_)
			NEXT_PUBLIC_AUTH0_DOMAIN: string;
			NEXT_PUBLIC_AUTH0_CLIENT_ID: string;
			NEXT_PUBLIC_AUTH0_AUDIENCE: string;
			NEXT_PUBLIC_AUTH0_REDIRECT_URI: string;

			// Server URLs (server-side only)
			SERVER_API_URL: string;

			// Server URLs (client-side - exposed to browser with NEXT_PUBLIC_)
			NEXT_PUBLIC_SERVER_API_URL: string;
			NEXT_PUBLIC_SERVER_WS_URL: string;
			NEXT_PUBLIC_URL: string;

			// Sentry
			NEXT_PUBLIC_SENTRY_ENV: string;
			NEXT_PUBLIC_SENTRY_DSN: string;
			SENTRY_AUTH_TOKEN: string;
			SENTRY_ORG?: string;
			SENTRY_PROJECT?: string;

			[key: string]: string | undefined;
		}
	}
}
