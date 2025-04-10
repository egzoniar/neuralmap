import { MindmapSheet } from "@/components/mindmap-ui/mindmap-sheet";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen">
			{/* Public navigation */}
			{/* <header className="border-b p-4">
				<nav className="container mx-auto flex items-center justify-between">
					<h1 className="text-xl font-bold">Your App</h1>
					<div className="flex gap-4">
						<a href="/about" className="hover:underline">
							About
						</a>
						<a href="/login" className="text-primary hover:underline">
							Login
						</a>
						<a
							href="/register"
							className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
						>
							Sign Up
						</a>
					</div>
				</nav>
			</header> */}

			<MindmapSheet />
			<main className="container w-full">{children}</main>

			{/* <footer className="border-t p-4">
				<div className="container mx-auto text-center text-muted-foreground">
					© {new Date().getFullYear()} Your App
				</div>
			</footer> */}
		</div>
	);
}
