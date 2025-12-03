"use client";

import { MonitorIcon, SmartphoneIcon } from "lucide-react";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Kbd } from "../ui/kbd";
import { Separator } from "../ui/separator";

export function UnsupportedScreenMessage() {
	return (
		<div className="flex h-screen w-full items-center justify-center bg-background p-6">
			<Empty className="max-w-2xl">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<SmartphoneIcon />
					</EmptyMedia>
					<EmptyTitle>Desktop Experience Required</EmptyTitle>
					<EmptyDescription>
						NeuralMap is optimized for desktop and larger screens. <br />
						We require a minimum screen width of{" "}
						<Kbd className="text-xs font-extrabold text-muted-foreground bg-muted-foreground/20">
							768px
						</Kbd>{" "}
						to function properly.
					</EmptyDescription>
				</EmptyHeader>
				<Separator />
				<EmptyContent>
					<div className="flex flex-col items-center gap-4">
						<div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
							<MonitorIcon className="h-5 w-5 shrink-0 pt-0.5" />
							<span>
								Please switch to a desktop or tablet device to continue.
							</span>
						</div>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
