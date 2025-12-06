"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { UnsupportedScreenMessage } from "./unsupported-screen-message";

interface ScreenSizeGuardProps {
	children: React.ReactNode;
}

export function ScreenSizeGuard({ children }: ScreenSizeGuardProps) {
	const isMobile = useIsMobile();

	// Don't render anything until we know the screen size (prevents hydration mismatch)
	if (isMobile === undefined) {
		return null;
	}

	if (isMobile) {
		return <UnsupportedScreenMessage />;
	}

	return <>{children}</>;
}
