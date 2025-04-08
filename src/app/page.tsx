"use client";

import { useAppStore } from "@/providers/store-provider";
import { Button } from "@/components/ui/button";

export default function Home() {
	const { count, increment, decrement } = useAppStore((state) => state.counter);

	return (
		<div>
			<h1>Count: {count}</h1>
			<Button onClick={increment}>Increment</Button>
			<Button variant="outline" onClick={decrement}>
				Decrement
			</Button>
		</div>
	);
}
