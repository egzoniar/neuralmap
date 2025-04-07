import { lens } from '@dhmk/zustand-lens';


export type CounterSlice = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const createCounterSlice = lens<CounterSlice>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));


