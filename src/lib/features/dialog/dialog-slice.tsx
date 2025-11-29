import { lens } from "@dhmk/zustand-lens";
import type {
	Dialog,
	ConfirmConfig,
	CustomDialogConfig,
} from "@/lib/features/dialog/types";

/**
 * Store for dialog promise resolvers
 * We keep this outside Zustand state since Promises aren't serializable
 */
const dialogResolvers = new Map<string, (value: any) => void>();

export type DialogSlice = {
	/**
	 * Currently active dialog (null if no dialog is shown)
	 */
	current: Dialog | null;

	/**
	 * Show a confirmation dialog
	 * @returns Promise that resolves to true if confirmed, false if cancelled
	 */
	confirm: (config: ConfirmConfig) => Promise<boolean>;

	/**
	 * Show a custom dialog component
	 * @returns Promise that resolves to whatever the dialog component passes to onResolve
	 */
	show: <T = any>(config: CustomDialogConfig<T>) => Promise<T>;

	/**
	 * Internal method to resolve the current dialog
	 * Called by DialogRenderer when user interacts with dialog
	 */
	_resolve: (result: any) => void;

	/**
	 * Internal method to dismiss dialog without resolving
	 * Called when dialog is closed via escape or backdrop click
	 */
	_dismiss: () => void;
};

export const createDialogSlice = lens<DialogSlice>((set, get) => ({
	current: null,

	confirm: (config: ConfirmConfig) => {
		return new Promise<boolean>((resolve) => {
			// Guard: Don't allow concurrent dialogs (prevent race conditions)
			const existingDialog = get().current;
			if (existingDialog) {
				console.warn(
					"Dialog already open. Rejecting new dialog to prevent race condition.",
				);
				// Resolve immediately with false (cancelled)
				resolve(false);
				return;
			}

			const dialogId = crypto.randomUUID();

			// Store the resolver
			dialogResolvers.set(dialogId, resolve);

			// Set the current dialog
			set({
				current: {
					id: dialogId,
					type: "confirm",
					config,
				},
			});
		});
	},

	show: <T = any>(config: CustomDialogConfig<T>) => {
		return new Promise<T>((resolve) => {
			// Guard: Don't allow concurrent dialogs (prevent race conditions)
			const existingDialog = get().current;
			if (existingDialog) {
				console.warn(
					"Dialog already open. Rejecting new dialog to prevent race condition.",
				);
				// Resolve immediately with undefined (dismissed)
				resolve(undefined as T);
				return;
			}

			const dialogId = crypto.randomUUID();

			// Store the resolver
			dialogResolvers.set(dialogId, resolve);

			// Set the current dialog
			set({
				current: {
					id: dialogId,
					type: "custom",
					config,
				},
			});
		});
	},

	_resolve: (result: any) => {
		const current = get().current;
		if (!current) return;

		// Get and call the resolver
		const resolver = dialogResolvers.get(current.id);
		if (resolver) {
			resolver(result);
			dialogResolvers.delete(current.id);
		}

		// Clear the current dialog
		set({ current: null });
	},

	_dismiss: () => {
		const current = get().current;
		if (!current) return;

		// Get and call the resolver
		const resolver = dialogResolvers.get(current.id);
		if (resolver) {
			// For confirm dialogs, dismissing is the same as cancelling (resolve false)
			// For custom dialogs, resolve with undefined to prevent memory leak
			if (current.type === "confirm") {
				resolver(false);
			} else {
				resolver(undefined);
			}
			dialogResolvers.delete(current.id);
		}

		// Clear the current dialog
		set({ current: null });
	},
}));
