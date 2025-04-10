import { lens } from "@dhmk/zustand-lens";

export type AppSidebarSlice = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};

export const createAppSidebarSlice = lens<AppSidebarSlice>((set) => ({
	isOpen: false,
	setIsOpen: (isOpen) => set({ isOpen }),
}));
