import { NextResponse } from "next/server";

/**
 * Sentry tunnel endpoint
 * Prevents ad blockers from blocking Sentry requests
 * Forwards requests to Sentry's ingest API
 */
export async function POST(request: Request) {
	try {
		const envelope = await request.text();
		const pieces = envelope.split("\n");
		const header = JSON.parse(pieces[0]);

		// Extract DSN from header
		const dsn = header.dsn;
		if (!dsn) {
			return NextResponse.json(
				{ error: "Missing DSN in envelope header" },
				{ status: 400 },
			);
		}

		// Extract project ID from DSN
		const dsnUrl = new URL(dsn);
		const projectId = dsnUrl.pathname.replace("/", "");

		// Construct Sentry ingest URL
		const sentryIngestUrl = `https://${dsnUrl.host}/api/${projectId}/envelope/`;

		// Forward the envelope to Sentry
		const response = await fetch(sentryIngestUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-sentry-envelope",
			},
			body: envelope,
		});

		if (!response.ok) {
			console.error(
				"Failed to forward to Sentry:",
				response.status,
				response.statusText,
			);
		}

		return new NextResponse(null, { status: response.status });
	} catch (error) {
		console.error("Error in Sentry tunnel:", error);
		return NextResponse.json(
			{ error: "Failed to forward request to Sentry" },
			{ status: 500 },
		);
	}
}

