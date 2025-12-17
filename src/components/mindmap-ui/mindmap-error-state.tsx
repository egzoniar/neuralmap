"use client";

import { FetchError } from "@/types/errors";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface MindmapErrorStateProps {
	error: Error;
}

export function MindmapErrorState({ error }: MindmapErrorStateProps) {
	const router = useRouter();

	const isAuthError =
		error.message?.includes("Missing Refresh Token") ||
		error.message?.includes("Login required");

	const { title, message } = getUserFriendlyErrorMessage(error, isAuthError);

	const handleGoHome = () => {
		router.push(ROUTES.HOME);
	};

	const handleReload = () => {
		window.location.reload();
	};

	return (
		<div className="flex h-full w-full items-center justify-center p-6">
			<Empty className="max-w-md">
				<EmptyHeader>
					<EmptyTitle>{title}</EmptyTitle>
					<EmptyDescription>{message}</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button onClick={handleReload}>Try Again</Button>
						<Button onClick={handleGoHome} variant="outline">
							Go to Home
						</Button>
					</div>
					<EmptyDescription>
						Need help?{" "}
						<a href="#" className="underline">
							Contact support
						</a>
					</EmptyDescription>
				</EmptyContent>
			</Empty>
		</div>
	);
}

function getUserFriendlyErrorMessage(
	error: Error,
	isAuthError: boolean,
): { title: string; message: string } {
	if (isAuthError) {
		return {
			title: "Session Expired",
			message: "Your session has expired. Redirecting to login...",
		};
	}

	if (error instanceof FetchError) {
		switch (error.status) {
			case 404:
				return {
					title: "Mindmap Not Found",
					message:
						"This mindmap doesn't exist or has been deleted. Try searching for it on your home page.",
				};
			case 422:
				return {
					title: "Invalid Mindmap",
					message:
						"The mindmap URL is invalid. Please check the link and try again.",
				};
			case 403:
				return {
					title: "Access Denied",
					message:
						"You don't have permission to view this mindmap. Contact the owner for access.",
				};
			case 500:
			case 502:
			case 503:
			case 504:
				return {
					title: "Server Error",
					message:
						"We're experiencing technical difficulties. Please try again in a few moments.",
				};
			default:
				return {
					title: "Failed to Load Mindmap",
					message:
						"We couldn't load your mindmap. Check your connection and try again.",
				};
		}
	}

	if (
		error.message?.includes("fetch") ||
		error.message?.includes("network") ||
		error.message?.includes("Failed to fetch")
	) {
		return {
			title: "Connection Error",
			message:
				"Unable to connect to the server. Check your internet connection and try again.",
		};
	}

	return {
		title: "Failed to Load Mindmap",
		message:
			"An unexpected error occurred. Try reloading or contact support if the problem persists.",
	};
}
