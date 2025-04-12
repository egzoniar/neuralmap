import { memo } from "react";
import {
	Bold,
	Underline,
	Italic,
	Code,
	Link,
	Eraser,
	Pilcrow,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6,
	List,
	ListOrdered,
	Braces,
	Quote,
	Minus,
	WrapText,
	RotateCw,
	RotateCcw,
	ArrowDownToLine,
	Strikethrough,
	X,
	Plus,
	Superscript,
	Subscript,
	ListChecks,
	ImagePlus,
	ArrowDown,
	CircleAlert,
	Bird,
	type LucideIcon,
} from "lucide-react";

// Define a type for all supported icon names
type IconName =
	| "bold"
	| "underline"
	| "italic"
	| "code"
	| "link"
	| "clearMarks"
	| "paragraph"
	| "heading1"
	| "heading2"
	| "heading3"
	| "heading4"
	| "heading5"
	| "heading6"
	| "bulletList"
	| "numberList"
	| "codeBlock"
	| "blockquote"
	| "minus"
	| "break"
	| "redo"
	| "undo"
	| "save"
	| "strike"
	| "delete"
	| "add"
	| "superscript"
	| "subscript"
	| "todo"
	| "addImage"
	| "arrowDown"
	| "admonition"
	| "sandpack";

interface IconProps {
	iconName: IconName;
	iconSize?: number;
}

// Map of icon names to their components
const ICON_MAP: Record<IconName, LucideIcon> = {
	bold: Bold,
	underline: Underline,
	italic: Italic,
	code: Code,
	link: Link,
	clearMarks: Eraser,
	paragraph: Pilcrow,
	heading1: Heading1,
	heading2: Heading2,
	heading3: Heading3,
	heading4: Heading4,
	heading5: Heading5,
	heading6: Heading6,
	bulletList: List,
	numberList: ListOrdered,
	codeBlock: Braces,
	blockquote: Quote,
	minus: Minus,
	break: WrapText,
	redo: RotateCw,
	undo: RotateCcw,
	save: ArrowDownToLine,
	strike: Strikethrough,
	delete: X,
	add: Plus,
	superscript: Superscript,
	subscript: Subscript,
	todo: ListChecks,
	addImage: ImagePlus,
	arrowDown: ArrowDown,
	admonition: CircleAlert,
	sandpack: Bird,
};

const ToolbarIcon = memo(({ iconName, iconSize = 15 }: IconProps) => {
	const IconComponent = ICON_MAP[iconName] || Bold;
	return <IconComponent size={iconSize} />;
});

ToolbarIcon.displayName = "ToolbarIcon";

export default ToolbarIcon;
