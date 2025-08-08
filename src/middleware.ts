import { auth0 } from "@/lib/auth0";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	// Check if the path is in the protected routes
	if (request.nextUrl.pathname.startsWith("/app/auth")) {
		try {
			// Verify the session
			await auth0.getSession(request);
			return NextResponse.next();
		} catch (error) {
			// Redirect to login if not authenticated
			return NextResponse.redirect(new URL("/api/auth/login", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/app/auth/:path*"],
};
