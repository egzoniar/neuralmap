"use client";

import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

export function UserProfile() {
	const { user, isLoading } = useAuth();

	if (isLoading) return <div>Loading...</div>;

	if (!user) return null;

	return (
		<div className="flex items-center space-x-3">
			{user.picture && (
				<Image
					src={user.picture}
					alt={user.name || "User"}
					width={40}
					height={40}
					className="rounded-full"
				/>
			)}
			<div>
				<p className="font-medium">{user.name}</p>
				<p className="text-sm text-gray-500">{user.email}</p>
			</div>
		</div>
	);
}
