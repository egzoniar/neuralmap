import { auth0 } from "@/lib/auth0";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { FetchError } from "@/types/errors";
import { getPublicEnv } from "@/utils/env-config";
import { redirect } from "next/navigation";

type FetchOptions = Omit<RequestInit, "headers" | "body"> & {
	headers?: Record<string, string>;
	isServer?: boolean;
	internal?: boolean;
	body?: Record<string, unknown> | unknown[] | string | FormData | null;
	responseType?: "json" | "blob";
};

export async function fetchApi<T>(
	endpoint: string,
	options: Omit<FetchOptions, "isServer"> & { isServerOverride?: boolean } = {
		internal: false,
	},
): Promise<T> {
	// Check if we're on the server - token retrival depends on this
	const isServer = options.isServerOverride ?? typeof window === "undefined";

	const {
		headers = {},
		internal = false,
		isServerOverride,
		responseType = "json",
		...init
	} = options;

	// Set the default headers
	let requestHeaders: Record<string, string> = {
		"Content-Type": "application/json",
		...headers,
	};

	let token: string;

	try {
		if (isServer) {
			({ token } = await auth0.getAccessToken());
		} else {
			token = await getAccessToken();
		}
		requestHeaders.Authorization = `Bearer ${token}`;
	} catch (error) {
		redirect("/auth/login");
	}

	const baseUrl = internal
		? getPublicEnv("APP_PUBLIC_URL")
		: getPublicEnv("APP_PUBLIC_SERVER_API_URL");

	const url = `${baseUrl}${endpoint}`;

	// Determine if we need to stringify the body
	let processedBody: BodyInit | null | undefined;
	if (init.body) {
		if (init.body instanceof FormData) {
			processedBody = init.body;
			// FormData sets its own Content-Type header with boundary
			// Create new headers object without Content-Type
			requestHeaders = Object.fromEntries(
				Object.entries(requestHeaders).filter(
					([key]) => key !== "Content-Type",
				),
			);
		} else if (typeof init.body === "string") {
			processedBody = init.body;
		} else if (typeof init.body === "object") {
			processedBody = JSON.stringify(init.body);
		}
	}

	const response = await fetch(url, {
		...init,
		headers: requestHeaders,
		body: processedBody,
	});

	if (!response.ok) {
		const errorData = await response.json();
		console.error(
			`fetchApi error: ${response.status} - ${response.statusText}`,
		);
		throw new FetchError(
			response.statusText,
			response.status,
			errorData.detail,
		);
	}

	// Handle responses based on responseType
	if (responseType === "blob") {
		return response.blob() as Promise<T>;
	}

	// Handle responses that might have no content:
	if (response.status === 204) {
		return {} as T;
	}

	const text = await response.text();
	if (!text) {
		return {} as T;
	}

	try {
		return JSON.parse(text) as T;
	} catch (error) {
		console.error("Failed to parse JSON response", error);
		throw error;
	}
}
