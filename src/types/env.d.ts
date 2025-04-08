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
			NODE_ENV: "development" | "production" | "test";

			// Auth0
			AUTH0_DOMAIN: string;
			AUTH0_CLIENT_ID: string;
			AUTH0_CLIENT_SECRET: string;
			AUTH0_SECRET: string;
			AUTH0_AUDIENCE: string;
			AUTH0_SCOPE: string;

			// Backend API Server
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
