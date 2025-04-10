import { Sidebar, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { DynamicSidebarContent } from "@/components/app-sidebar/dynamic-sidebar-content";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	pathname: string;
}

export function AppSidebar({ pathname, ...props }: AppSidebarProps) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<DynamicSidebarContent pathname={pathname} />
			<SidebarRail />
			<SidebarTrigger className="absolute z-10 top-1 -right-8 [&_svg]:w-5 [&_svg]:h-5" />
		</Sidebar>
	);
}
