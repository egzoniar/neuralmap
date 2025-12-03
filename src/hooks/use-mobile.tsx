import * as React from "react";
import { MIN_SUPPORTED_WIDTH } from "@/constants/ui";

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
		undefined,
	);

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MIN_SUPPORTED_WIDTH - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MIN_SUPPORTED_WIDTH);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MIN_SUPPORTED_WIDTH);
		return () => mql.removeEventListener("change", onChange);
	}, []);

	return !!isMobile;
}
