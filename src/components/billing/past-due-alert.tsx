"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { SUBSCRIPTION_DISPLAY } from "@/constants/subscription";

export function PastDueAlert() {
	return (
		<Alert variant="warning" className="mb-6">
			<AlertTriangle className="h-5 w-5" />
			<AlertTitle className="text-base font-semibold mb-2">
				{SUBSCRIPTION_DISPLAY.PAST_DUE_TITLE}
			</AlertTitle>
			<AlertDescription>
				<p className="leading-relaxed">
					{SUBSCRIPTION_DISPLAY.PAST_DUE_DESCRIPTION}
				</p>
			</AlertDescription>
		</Alert>
	);
}
