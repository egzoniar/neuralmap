import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { StoreProvider } from "@/providers/store-provider";
import { AppSidebarProvider } from "@/providers/app-sidebar-provider";
import { Auth0Provider } from "@/providers/auth0-provider";

import "@/app/globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Your App",
	description: "Your app description",
};

// const [meResponse] = await Promise.all([
//   tryCatch(authServerActions.getMe()),
// ]);

// if (meResponse.error) {
//   console.error(meResponse.error);
//   return redirect('/auth/login');
// }

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Auth0Provider>
					<StoreProvider>
						<QueryProvider>
							<AppSidebarProvider>{children}</AppSidebarProvider>
							<Toaster richColors />
						</QueryProvider>
					</StoreProvider>
				</Auth0Provider>
			</body>
		</html>
	);
}
