import { fetchApi } from "@/lib/fetch-api";
import type { UserProfile } from "@/types/user";

export const userApiService = {
	async getUser() {
		return await fetchApi("/api/user");
	},
	async getUserProfile() {
		return await fetchApi("/api/user/profile");
	},
	async updateUserProfile(profile: UserProfile) {
		return await fetchApi("/api/user/profile", {
			method: "PUT",
			body: profile,
		});
	},
};
