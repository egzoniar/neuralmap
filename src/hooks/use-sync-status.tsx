"use client";

import { useEffect, useState, useRef } from "react";
import { useMutationState } from "@tanstack/react-query";

/**
 * Sync status states for mindmap operations
 */
export type SyncStatus = "idle" | "syncing" | "synced" | "error";

/**
 * Hook to track the sync status of all mindmap mutations
 * Tracks both content updates (nodes, edges) and metadata updates (title, description)
 *
 * Status lifecycle:
 * - idle: No operations happening, nothing shown
 * - syncing: Any mutation in progress
 * - synced: Briefly shown after successful save
 * - error: Shown when any mutation fails
 */
export function useSyncStatus() {
	const [status, setStatus] = useState<SyncStatus>("idle");
	const savedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Use useMutationState to observe all mutations globally by their keys
	const contentMutations = useMutationState({
		filters: { mutationKey: ["updateMindmapContent"] },
		select: (mutation) => mutation.state,
	});

	const metadataMutations = useMutationState({
		filters: { mutationKey: ["updateMindmapMetadata"] },
		select: (mutation) => mutation.state,
	});

	// Get the latest mutation state (most recent one)
	const latestContentState = contentMutations[contentMutations.length - 1];
	const latestMetadataState = metadataMutations[metadataMutations.length - 1];

	// Track if ANY mutation is pending or has errors
	const isPending =
		latestContentState?.status === "pending" ||
		latestMetadataState?.status === "pending";
	const isError =
		latestContentState?.status === "error" ||
		latestMetadataState?.status === "error";
	const isSuccess =
		(latestContentState?.status === "success" ||
			latestMetadataState?.status === "success") &&
		!isPending &&
		!isError;

	useEffect(() => {
		// Clear any existing timeout
		if (savedTimeoutRef.current) {
			clearTimeout(savedTimeoutRef.current);
			savedTimeoutRef.current = null;
		}

		// Syncing: any mutation is pending
		if (isPending) {
			setStatus("syncing");
			return;
		}

		// Error: any mutation failed
		if (isError) {
			setStatus("error");
			return;
		}

		// Success: show "synced" briefly then return to idle
		if (isSuccess && status === "syncing") {
			setStatus("synced");
			const timeout = setTimeout(() => {
				setStatus("idle");
			}, 2000); // Show "Synced" for 2 seconds
			savedTimeoutRef.current = timeout;
		}

		// Cleanup timeout on unmount or re-run
		return () => {
			if (savedTimeoutRef.current) {
				clearTimeout(savedTimeoutRef.current);
				savedTimeoutRef.current = null;
			}
		};
	}, [isPending, isError, isSuccess, status]);

	return {
		status,
		isPending,
		isError,
		error: latestContentState?.error || latestMetadataState?.error || null,
	};
}
