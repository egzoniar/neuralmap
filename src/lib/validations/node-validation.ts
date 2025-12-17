import { updateMindmapMetadataSchema, createMindmapSchema } from "./mindmap";
import { ZodError } from "zod";

/**
 * Validation errors structure for mindmap forms
 */
export interface MindmapValidationErrors {
	title?: string;
	description?: string;
	icon?: string;
}

/**
 * Validates mindmap title (root node title)
 * Returns error message if validation fails, undefined if valid
 */
export function validateMindmapTitle(
	title: string,
	icon?: string,
): string | undefined {
	try {
		updateMindmapMetadataSchema.parse({
			title,
			icon,
		});
		return undefined;
	} catch (error) {
		if (error instanceof ZodError) {
			const titleIssue = error.issues.find(
				(issue) => issue.path[0] === "title",
			);
			return titleIssue?.message;
		}
		return undefined;
	}
}

/**
 * Validates complete mindmap form data (for creation)
 * Returns object with field-specific error messages
 */
export function validateMindmapForm(data: {
	title: string;
	description?: string;
	icon?: string;
}): MindmapValidationErrors {
	try {
		createMindmapSchema.parse(data);
		return {};
	} catch (error) {
		if (error instanceof ZodError) {
			const errors: MindmapValidationErrors = {};
			error.issues.forEach((issue) => {
				const field = issue.path[0] as keyof MindmapValidationErrors;
				errors[field] = issue.message;
			});
			return errors;
		}
		return {};
	}
}

/**
 * Checks if a title is valid without returning the error message
 * Useful for enabling/disabling submit buttons
 */
export function isMindmapTitleValid(title: string, icon?: string): boolean {
	return validateMindmapTitle(title, icon) === undefined;
}

/**
 * Checks if entire mindmap form is valid
 */
export function isMindmapFormValid(data: {
	title: string;
	description?: string;
	icon?: string;
}): boolean {
	const errors = validateMindmapForm(data);
	return Object.keys(errors).length === 0;
}
