import { FetchError } from "@/types/errors";

type FetchOptions = Omit<RequestInit, "headers" | "body"> & {
	headers?: Record<string, string>;
	body?: Record<string, unknown> | unknown[] | string | FormData | null;
	responseType?: "json" | "blob";
	token?: string; // Pass token directly for authenticated requests
};

export async function fetchApi<T>(
	endpoint: string,
	options: FetchOptions = {},
): Promise<T> {
	const { headers = {}, responseType = "json", token, ...init } = options;

	// Set the default headers
	let requestHeaders: Record<string, string> = {
		"Content-Type": "application/json",
		...headers,
	};

	// Add authorization header if token is provided
	if (token) {
		requestHeaders.Authorization = `Bearer ${token}`;
	}

	const baseUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;
	const url = `${baseUrl}${endpoint}`;

	// Handle body serialization
	let processedBody: BodyInit | null | undefined;
	if (init.body) {
		if (init.body instanceof FormData) {
			processedBody = init.body;
			// Remove Content-Type for FormData (browser sets it with boundary)
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
		// Handle 401 Unauthorized - token expired
		if (response.status === 401) {
			console.warn("Unauthorized request - token may be expired");
			// Auth0 will handle token refresh automatically
			// Just throw the error and let React Query retry
		}

		const errorData = await response.json().catch(() => ({}));
		console.error(
			`fetchApi error: ${response.status} - ${response.statusText}`,
			errorData,
		);
		throw new FetchError(
			response.statusText,
			response.status,
			errorData.detail || "Request failed",
		);
	}

	// Handle responses based on responseType
	if (responseType === "blob") {
		return response.blob() as Promise<T>;
	}

	// Handle no content
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
