import { fetchApi } from "@/lib/fetch-api";
import type { UserProfile } from "@/types/user";

export const userApiService = {
	async getUser(token: string) {
		return await fetchApi("/api/user", { token });
	},
	async getUserProfile(token: string) {
		return await fetchApi("/api/user/profile", { token });
	},
	async updateUserProfile(token: string, profile: UserProfile) {
		return await fetchApi("/api/user/profile", {
			method: "PUT",
			body: profile,
			token,
		});
	},
};
