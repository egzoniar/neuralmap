"use client";

import {
	QueryClient,
	QueryClientProvider,
	QueryCache,
	MutationCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { ErrorHandler } from "@/lib/error-handler";

interface QueryProviderProps {
	children: React.ReactNode;
}

/**
 * React Query provider with global error handling
 *
 * Phase 2 Enhancement:
 * - Added default error handlers for all queries and mutations
 * - Integrates with centralized ErrorHandler
 * - Provides consistent user feedback via toast notifications
 *
 * Pattern:
 * - Query errors: Logged but typically not toasted (shown in UI)
 * - Mutation errors: Logged and toasted (immediate feedback)
 * - Auth errors: Handled by useQueryAuthError hook (no duplicate toast)
 * - Individual queries/mutations can override with their own onError
 *
 * React Query v5:
 * - Uses queryCache and mutationCache for global error handling
 * - onError in defaultOptions is deprecated in v5
 */
export function QueryProvider({ children }: QueryProviderProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				queryCache: new QueryCache({
					onError: (error, query) => {
						// Handle query errors globally
						// Auth errors are handled by useQueryAuthError, so we filter them out
						const queryKey = query.queryKey[0] as string;
						ErrorHandler.handleQueryError(error as Error, queryKey || "Query");
					},
				}),
				mutationCache: new MutationCache({
					onError: (error, _variables, _context, mutation) => {
						// Check if mutation wants to suppress toast notifications
						const suppressToast = mutation.options.meta?.suppressToast === true;

						if (suppressToast) {
							// Just log the error, don't show toast
							if (process.env.NODE_ENV === "development") {
								const mutationKey = mutation.options.mutationKey?.[0] as string;
								console.error(
									`[${mutationKey || "Mutation"}] (silent) Category: error`,
									error,
								);
							}
							return;
						}

						// Handle mutation errors globally with toast
						const mutationKey = mutation.options.mutationKey?.[0] as string;
						ErrorHandler.handleMutationError(
							error as Error,
							mutationKey || "Mutation",
						);
					},
				}),
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry: 2,
						staleTime: 5 * 60 * 1000, // 5 minutes
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
		</QueryClientProvider>
	);
}
