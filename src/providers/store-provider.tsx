"use client";
import { withLenses } from "@dhmk/zustand-lens";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { CounterSlice } from "@/lib/features/counter/counter-slice";
import { createCounterSlice } from "@/lib/features/counter/counter-slice";
export interface Store {
	// TODO: Add store types here
	counter: CounterSlice;
}

export type StoreApi = ReturnType<typeof createStore>;

const createStore = (initialProps?: Partial<Store>) =>
	create(
		immer(
			withLenses({
				// TODO: Add slices here
				counter: createCounterSlice,
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
