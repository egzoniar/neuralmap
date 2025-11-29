import type { ReactNode, ComponentType } from "react";

/**
 * Configuration for confirm dialogs
 */
export interface ConfirmConfig {
	title: string;
	children?: ReactNode;
	confirmText?: string;
	cancelText?: string;
	variant?: "default" | "destructive";
	icon?: ReactNode;
}

/**
 * Props passed to custom dialog components
 */
export interface CustomDialogProps<T = any> {
	onResolve: (result: T) => void;
	[key: string]: any;
}

/**
 * Configuration for custom dialogs
 */
export interface CustomDialogConfig<T = any> {
	component: ComponentType<CustomDialogProps<T>>;
	props?: Record<string, any>;
}

/**
 * Internal dialog state representation
 */
export type Dialog =
	| { id: string; type: "confirm"; config: ConfirmConfig }
	| { id: string; type: "custom"; config: CustomDialogConfig };
