import {
	format,
	formatDistanceToNow,
	formatRelative,
	isToday,
	isYesterday,
	parseISO,
} from "date-fns";

/**
 * Format a date string into a human-readable relative time
 * Example: "2 hours ago", "3 days ago"
 */
export function formatTimeAgo(dateString: string): string {
	try {
		const date = parseISO(dateString);
		return formatDistanceToNow(date, { addSuffix: true });
	} catch (error) {
		console.error("Invalid date string:", dateString);
		return "Invalid date";
	}
}

/**
 * Format a date string into a short, readable format
 * Example: "Jan 15, 2024"
 */
export function formatShortDate(dateString: string): string {
	try {
		const date = parseISO(dateString);
		return format(date, "MMM d, yyyy");
	} catch (error) {
		console.error("Invalid date string:", dateString);
		return "Invalid date";
	}
}

/**
 * Format a date string into a full readable format
 * Example: "January 15, 2024 at 3:30 PM"
 */
export function formatFullDate(dateString: string): string {
	try {
		const date = parseISO(dateString);
		return format(date, "MMMM d, yyyy 'at' h:mm a");
	} catch (error) {
		console.error("Invalid date string:", dateString);
		return "Invalid date";
	}
}

/**
 * Format a date string into a smart format based on how recent it is
 * - Today: "Today at 3:30 PM"
 * - Yesterday: "Yesterday at 3:30 PM"
 * - This week: "Monday at 3:30 PM"
 * - Older: "Jan 15, 2024"
 */
export function formatSmartDate(dateString: string): string {
	try {
		const date = parseISO(dateString);

		if (isToday(date)) {
			return `Today at ${format(date, "h:mm a")}`;
		}

		if (isYesterday(date)) {
			return `Yesterday at ${format(date, "h:mm a")}`;
		}

		// For dates within the last week, show relative
		const daysAgo = Math.floor(
			(Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
		);
		if (daysAgo < 7) {
			return formatRelative(date, new Date());
		}

		// For older dates, show short format
		return formatShortDate(dateString);
	} catch (error) {
		console.error("Invalid date string:", dateString);
		return "Invalid date";
	}
}

/**
 * Format a date string for display in lists or cards
 * Shows relative time for recent dates, absolute for older ones
 */
export function formatCreatedDate(dateString: string): string {
	try {
		const date = parseISO(dateString);
		const daysAgo = Math.floor(
			(Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
		);

		// For items created within the last 30 days, show relative time
		if (daysAgo < 30) {
			return formatDistanceToNow(date, { addSuffix: true });
		}

		// For older items, show absolute date
		return format(date, "MMM d, yyyy");
	} catch (error) {
		console.error("Invalid date string:", dateString);
		return "Invalid date";
	}
}
