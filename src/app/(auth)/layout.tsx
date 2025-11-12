import { AppSidebarProvider } from "@/providers/app-sidebar-provider";
import { MindmapSheet } from "@/components/mindmap-ui/mindmap-sheet";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check
  const session = await getSession();

  // Redirect to login if not authenticated
  if (!session || !session.user) {
    redirect("/api/auth/login");
  }

  return (
    <>
      <MindmapSheet />
      <AppSidebarProvider>{children}</AppSidebarProvider>
    </>
  );
}

