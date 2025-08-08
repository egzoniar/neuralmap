"use client";

import { useAuth } from "@/hooks/use-auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { UserProfile } from "@/components/auth/user-profile";
import { redirect } from "next/navigation";

export default function DashboardPage() {
	const { user, isLoading } = useAuth();

	if (isLoading) return <div>Loading...</div>;

	if (!user) {
		redirect("/api/auth/login");
		return null;
	}

	return (
		<div>
			<h1>Dashboard</h1>
			<UserProfile />
			<LogoutButton />

			{/* Your protected content here */}
		</div>
	);
}
