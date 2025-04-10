import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/routes";

export function NavPublic() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton asChild>
					<Link href={ROUTES.LOGIN}>
						<LogIn />
						<span>Sign In</span>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
			<SidebarMenuItem>
				<SidebarMenuButton asChild>
					<Link href={ROUTES.REGISTER}>
						<UserPlus />
						<span>Create Account</span>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
