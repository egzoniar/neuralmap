/**
 * Auth API service
 * Note: Most auth operations are handled by Auth0Provider hooks
 * This service is for any custom auth-related API calls
 */
export const authApiService = {
	// Placeholder for future custom auth operations
	// Example: Send auth events to analytics, custom user metadata, etc.
	async logAuthEvent(event: string) {
		console.log("Auth event:", event);
		// Could send to analytics service
	},
};
