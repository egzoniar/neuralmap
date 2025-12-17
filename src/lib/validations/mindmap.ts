import { z } from "zod";

/**
 * Validation schemas for mindmap-related forms
 *
 * Architecture:
 * - Single source of truth for validation rules
 * - Reusable across client and server (if needed)
 * - Type-safe validation with Zod
 *
 * Pattern:
 * - Define schemas with clear error messages
 * - Export both schema and inferred types
 * - Keep validation logic separate from components
 */

/**
 * Schema for creating a new mindmap
 * Validates title, description, and icon
 */
export const createMindmapSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(255, "Title must be 255 characters or less")
		.trim(),
	description: z
		.union([
			z
				.string()
				.trim()
				.min(1)
				.max(255, "Description must be 255 characters or less"),
			z.literal(""),
		])
		.optional(),
	icon: z.string().emoji("Please select a valid emoji").optional(),
});

/**
 * Inferred TypeScript type from the schema
 * Use this for type-safe form data
 */
export type CreateMindmapInput = z.infer<typeof createMindmapSchema>;

/**
 * Schema for updating mindmap metadata (title, description, icon)
 * Same rules as creation
 */
export const updateMindmapMetadataSchema = createMindmapSchema;

/**
 * Inferred type for updating mindmap metadata
 */
export type UpdateMindmapMetadataInput = z.infer<
	typeof updateMindmapMetadataSchema
>;
