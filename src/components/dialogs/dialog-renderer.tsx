"use client";

import { useAppStore } from "@/providers/store-provider";
import { BaseDialog } from "@/components/ui/base-dialog";

/**
 * DialogRenderer component
 * 
 * This component should be mounted once in your root layout.
 * It listens to the dialog store and renders the appropriate dialog when needed.
 * 
 * Usage:
 *   const { confirm } = useAppStore((state) => state.dialog);
 *   const result = await confirm({ title: "...", ... });
 */
export function DialogRenderer() {
	const { current, _resolve, _dismiss } = useAppStore((state) => state.dialog);

	// No dialog to show
	if (!current) {
		return null;
	}

	// Render confirm dialog
	if (current.type === "confirm") {
		return (
			<BaseDialog
				open={true}
				onOpenChange={(open) => {
					// When dialog is closed (via backdrop/escape), dismiss it
					if (!open) {
						_dismiss();
					}
				}}
				onConfirm={() => _resolve(true)}
				onCancel={() => _resolve(false)}
				title={current.config.title}
				confirmText={current.config.confirmText}
				cancelText={current.config.cancelText}
				variant={current.config.variant}
				icon={current.config.icon}
			>
				{current.config.children}
			</BaseDialog>
		);
	}

	// Render custom dialog
	if (current.type === "custom") {
		const CustomComponent = current.config.component;
		return (
			<CustomComponent
				{...current.config.props}
				onResolve={_resolve}
			/>
		);
	}

	return null;
}

