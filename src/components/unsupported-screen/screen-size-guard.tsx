"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { UnsupportedScreenMessage } from "./unsupported-screen-message";

interface ScreenSizeGuardProps {
	children: React.ReactNode;
}

export function ScreenSizeGuard({ children }: ScreenSizeGuardProps) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return <UnsupportedScreenMessage />;
	}

	return <>{children}</>;
}
