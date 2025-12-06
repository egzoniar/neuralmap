import { fetchApi } from "@/lib/fetch-api";
import { API_ENDPOINTS } from "@/constants/api";

export const userApiService = {
	async getUser(token: string) {
		return await fetchApi(API_ENDPOINTS.USER.ME, { token });
	},
	// Not implemented yet
	// async getUserProfile(token: string) {
	// 	return await fetchApi(API_ENDPOINTS.USER.ME, { token });
	// },
	// async updateUserProfile(token: string, profile: UserProfile) {
	// 	return await fetchApi(API_ENDPOINTS.USER.ME, {
	// 		method: "PUT",
	// 		body: profile,
	// 		token,
	// 	});
	// },
};
