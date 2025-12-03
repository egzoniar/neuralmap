"use client";

import { useCallback, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUpdateMindmapMetadata as useUpdateMindmapMetadataMutation } from "@/services/mindmap/mutations";
import type { MindmapUpdate } from "@/types/mindmap";

interface UseDebouncedMindmapMetadataReturn {
	queueUpdate: (update: MindmapUpdate) => void;
	flushUpdate: () => void;
	isPending: boolean;
	isError: boolean;
	error: Error | null;
}

/**
 * Hook to update mindmap metadata (title, icon, description, visibility)
 * with debouncing
 *
 * This hook handles debounced updates to mindmap-level properties.
 * Content updates (nodes, edges) should use useUpdateMindmapContent instead.
 *
 * @param debounceMs - Debounce time in milliseconds (default: 1500ms)
 */
export function useDebouncedMindmapMetadata(
	debounceMs: number = 1500,
): UseDebouncedMindmapMetadataReturn {
	const params = useParams();
	const mindmapId = params?.id as string;
	const updateMutation = useUpdateMindmapMetadataMutation();
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	// Track pending update to send
	const pendingUpdateRef = useRef<MindmapUpdate | null>(null);

	/**
	 * Queue a metadata update with debouncing
	 * Multiple calls within the debounce window will be merged
	 */
	const queueUpdate = useCallback(
		(update: MindmapUpdate) => {
			if (!mindmapId) return;

			// Merge with any existing pending update
			pendingUpdateRef.current = {
				...pendingUpdateRef.current,
				...update,
			};

			// Clear existing timer
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}

			// Set new timer
			debounceTimerRef.current = setTimeout(() => {
				const updateToSend = pendingUpdateRef.current;
				if (updateToSend) {
					updateMutation.mutate({
						mindmapId,
						update: updateToSend,
					});
					pendingUpdateRef.current = null;
				}
			}, debounceMs);
		},
		[mindmapId, updateMutation, debounceMs],
	);

	/**
	 * Flush any pending updates immediately
	 * Useful when component unmounts or user navigates away
	 */
	const flushUpdate = useCallback(() => {
		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
			debounceTimerRef.current = null;
		}

		if (pendingUpdateRef.current && mindmapId) {
			updateMutation.mutate({
				mindmapId,
				update: pendingUpdateRef.current,
			});
			pendingUpdateRef.current = null;
		}
	}, [mindmapId, updateMutation]);

	// Cleanup on unmount - flush any pending updates
	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
			// Note: We don't flush on unmount to avoid issues with React 18 strict mode
			// and to prevent sending incomplete updates during navigation
		};
	}, []);

	return {
		queueUpdate,
		flushUpdate,
		isPending: updateMutation.isPending,
		isError: updateMutation.isError,
		error: updateMutation.error,
	};
}
