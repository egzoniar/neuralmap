export {};

declare global {
	namespace NodeJS {
		interface PublicEnvs {
			APP_PUBLIC_SERVER_API_URL: string;
			APP_PUBLIC_SERVER_WS_URL: string;
			APP_PUBLIC_URL: string;
			APP_PUBLIC_SENTRY_ENV: string;
			APP_PUBLIC_SENTRY_DSN: string;
		}
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

			// Server URLs
			SERVER_API_URL: string;
			APP_PUBLIC_SERVER_API_URL: string;
			APP_PUBLIC_SERVER_WS_URL: string;
			APP_PUBLIC_URL: string;

			// Sentry
			APP_PUBLIC_SENTRY_ENV: string;
			APP_PUBLIC_SENTRY_DSN: string;
			SENTRY_AUTH_TOKEN: string;

			[key: string]: string | undefined;
		}
	}
}
