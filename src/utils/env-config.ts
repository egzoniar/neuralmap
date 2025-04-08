const prefix = "APP_PUBLIC_";

declare global {
	interface Window {
		__ENV: NodeJS.ProcessEnv;
	}
}

type PublicEnvKeys = keyof NodeJS.PublicEnvs;

const isBrowser = () => {
	return Boolean(typeof window !== "undefined" && window.__ENV);
};

/**
 * Retrieves "public" runtime environment variables that are accessible in the browser.
 * Only environment variables prefixed with 'APP_PUBLIC_' can be accessed.
 * @param key - The environment variable key to retrieve
 * @param type - Optional type conversion for the value ('string' | 'number' | 'boolean' | 'array')
 * @returns The environment variable value with optional type conversion
 */
export const getPublicEnv = (
	key: PublicEnvKeys,
	type?: "string" | "number" | "boolean" | "array",
) => {
	if (!key.startsWith(prefix)) {
		throw new Error(`Invalid key: ${key}`);
	}

	let source: NodeJS.ProcessEnv | Record<string, string | undefined>;

	if (isBrowser()) {
		source = window.__ENV;
	} else {
		source = process.env;
	}

	const value = source[key];

	if (type === "number") {
		return value ? Number(value) : undefined;
	}

	if (type === "boolean") {
		return value ? Boolean(value.toLowerCase() === "true") : undefined;
	}

	if (type === "array") {
		return value?.split(",");
	}

	return value;
};

export const getAllPublicEnv = (): Partial<NodeJS.PublicEnvs> => {
	return Object.keys(process.env)
		.filter((key) => key.startsWith(prefix))
		.reduce(
			(acc, key) => {
				acc[key as PublicEnvKeys] = process.env[key];
				return acc;
			},
			{} as Partial<NodeJS.PublicEnvs>,
		);
};
