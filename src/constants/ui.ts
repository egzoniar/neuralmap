import {
	Frame,
	PieChart,
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	GalleryVerticalEnd,
	Settings2,
	SquareTerminal,
	Map as MapIcon,
	Home,
	Info,
} from "lucide-react";
import { RootNode } from "@/components/mindmap-ui/root-node";
import { NeuralNode } from "@/components/mindmap-ui/neural-node";
import type { NodeTypes, EdgeTypes } from "reactflow";
import { BaseEdge } from "@/components/mindmap-ui/base-edge";

export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";

/**
 * Minimum screen width required for the app (768px = tablet size)
 * Below this breakpoint, users will see an unsupported screen message
 */
export const MIN_SUPPORTED_WIDTH = 768;

/**
 * Curated emoji list for mindmap icons
 * Easy to extend - just add more emojis to the array
 */
export const MINDMAP_ICONS = [
	// Thinking & Ideas
	"🧠",
	"💡",
	"💭",
	"🤔",
	"✨",
	// Goals & Achievement
	"🎯",
	"⭐",
	"🏆",
	"🚀",
	"🔥",
	// Work & Productivity
	"📝",
	"📚",
	"💼",
	"📊",
	"📈",
	// Creative
	"🎨",
	"🎬",
	"🎵",
	"📸",
	"✏️",
	// Tech & Science
	"💻",
	"🔬",
	"⚡",
	"🔮",
	"🛠️",
	// Nature & Life
	"🌟",
	"🌱",
	"🌍",
	"💎",
	"🌈",
	// Communication
	"💬",
	"📣",
	"🔔",
	"💌",
	"🤝",
] as const;

export const UI = {
	BUTTON: {
		PRIMARY: "primary",
		SECONDARY: "secondary",
	},
};

/**
 * Node type constants - Single source of truth for node types
 * Use these instead of hardcoded strings throughout the codebase
 */
export const NODE_TYPE = {
	ROOT: "root",
	NEURAL: "neural",
} as const;

/**
 * Type helper for node types
 */
export type NodeType = (typeof NODE_TYPE)[keyof typeof NODE_TYPE];

export const NODE_TYPES: NodeTypes = {
	[NODE_TYPE.ROOT]: RootNode,
	[NODE_TYPE.NEURAL]: NeuralNode,
};

export const EDGE_TYPES: EdgeTypes = {
	baseEdge: BaseEdge,
};

export const APP_SIDEBAR_DATA = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "https://avatars.githubusercontent.com/u/124599?v=4shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Playground",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "History",
					url: "#",
				},
				{
					title: "Starred",
					url: "#",
				},
				{
					title: "Settings",
					url: "#",
				},
			],
		},
		{
			title: "Models",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
					url: "#",
				},
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
					url: "#",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "General",
					url: "#",
				},
				{
					title: "Team",
					url: "#",
				},
				{
					title: "Billing",
					url: "#",
				},
				{
					title: "Limits",
					url: "#",
				},
			],
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: MapIcon,
		},
	],
};

export const PUBLIC_SIDEBAR_DATA = {
	teams: [
		{
			name: "MindMap App",
			logo: Home,
			plan: "Public Access",
		},
	],
	navMain: [
		{
			title: "Home",
			url: "/",
			icon: Home,
			isActive: true,
		},
		{
			title: "About",
			url: "/about",
			icon: Info,
		},
		{
			title: "Documentation",
			url: "/docs",
			icon: BookOpen,
			items: [
				{
					title: "Getting Started",
					url: "/docs/getting-started",
				},
				{
					title: "Features",
					url: "/docs/features",
				},
			],
		},
	],
};
