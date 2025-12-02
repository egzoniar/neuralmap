"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { withLenses } from "@dhmk/zustand-lens";
import { useStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
	createMindmapSlice,
	type MindmapSlice,
} from "@/lib/features/mindmap/mindmap-slice";
import {
	createMindmapsSlice,
	type MindmapsSlice,
} from "@/lib/features/mindmap/mindmaps-slice";
import {
	createDialogSlice,
	type DialogSlice,
} from "@/lib/features/dialog/dialog-slice";
import {
	createApplicationSlice,
	type ApplicationSlice,
} from "@/lib/features/application/application-slice";

export interface Store {
	mindmap: MindmapSlice;
	mindmaps: MindmapsSlice;
	dialog: DialogSlice;
	application: ApplicationSlice;
}

export type StoreApi = ReturnType<typeof createStore>;

const createStore = (initialProps?: Partial<Store>) =>
	create(
		immer(
			withLenses({
				mindmap: createMindmapSlice,
				mindmaps: createMindmapsSlice,
				dialog: createDialogSlice,
				application: createApplicationSlice,
				...initialProps,
			}),
		),
	);

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
	children: ReactNode;
	initialProps?: Partial<Store>;
}

export function StoreProvider({ children, initialProps }: StoreProviderProps) {
	const storeRef = useRef<StoreApi | undefined>(undefined);
	if (!storeRef.current) {
		storeRef.current = createStore(initialProps);
	}

	return (
		<StoreContext.Provider value={storeRef.current}>
			{children}
		</StoreContext.Provider>
	);
}

export function useAppStore<T>(selector: (store: Store) => T): T {
	const storeContext = useContext(StoreContext);

	if (!storeContext) {
		throw new Error("useAppStore must be used within StoreProvider");
	}

	return useStore(storeContext, selector);
}
