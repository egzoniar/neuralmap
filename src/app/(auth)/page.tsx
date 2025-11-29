"use client";

import { useAppStore } from "@/providers/store-provider";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Brain, Plus, ArrowRight } from "lucide-react";
import { formatShortDate } from "@/utils/date";

export default function HomePage() {
	const router = useRouter();
	const mindmaps = useAppStore((state) => state.mindmaps.mindmaps);
	const setActiveMindmap = useAppStore(
		(state) => state.mindmaps.setActiveMindmap,
	);
	const createMindmap = useAppStore((state) => state.mindmaps.createMindmap);

	const handleOpenMindmap = (id: string) => {
		setActiveMindmap(id);
		router.push(ROUTES.MAP(id));
	};

	const handleCreateMindmap = () => {
		const name = `New Mindmap ${mindmaps.length + 1}`;
		const newId = createMindmap(name);
		router.push(ROUTES.MAP(newId));
	};

	if (mindmaps.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center p-6 min-h-0">
				<div className="mx-auto w-full max-w-md space-y-6 text-center">
					<div className="flex justify-center">
						<div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10">
							<Brain className="size-10 text-primary" />
						</div>
					</div>

					<div className="space-y-2">
						<h1 className="text-2xl font-semibold">Welcome to NeuralMap</h1>
						<p className="text-sm text-muted-foreground">
							Get started by creating your first mind map
						</p>
					</div>

					<Button
						size="default"
						className="w-full"
						onClick={handleCreateMindmap}
					>
						<Plus className="mr-2 size-4" />
						<span className="text-sm">Create Your First Mind Map</span>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-1 items-center justify-center p-6 min-h-0">
			<div className="mx-auto w-full max-w-2xl space-y-6">
				<div className="space-y-2 text-center">
					<h1 className="text-2xl font-semibold">Your Mind Maps</h1>
					<p className="text-sm text-muted-foreground">
						Select a mind map to continue working
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					{mindmaps.map((mindmap) => (
						<Button
							key={mindmap.id}
							variant="outline"
							className="h-auto flex-col items-start p-4 text-left"
							onClick={() => handleOpenMindmap(mindmap.id)}
						>
							<div className="flex w-full items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Brain className="size-5 text-primary" />
									</div>
									<div>
										<div className="text-sm font-semibold">{mindmap.name}</div>
										<div className="text-xs text-muted-foreground">
											{formatShortDate(mindmap.createdAt)}
										</div>
									</div>
								</div>
								<ArrowRight className="size-4 opacity-50" />
							</div>
						</Button>
					))}
				</div>

				<Button
					className="w-full text-sm"
					variant="secondary"
					onClick={handleCreateMindmap}
				>
					<Plus className="mr-2 size-4" />
					Create New Mind Map
				</Button>
			</div>
		</div>
	);
}
