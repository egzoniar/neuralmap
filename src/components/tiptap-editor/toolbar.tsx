"use client";

import { Toggle } from "@/components/ui/toggle";
import ToolbarIcon from "@/components/tiptap-editor/toolbar-icon";
import type { useEditor } from "@tiptap/react";

type ToolbarProps = {
	editor: ReturnType<typeof useEditor> | null;
	onSave?: () => void;
};

export function Toolbar({ editor, onSave }: ToolbarProps) {
	if (!editor) return null;

	return (
		<div className="bg-transparent flex flex-wrap border border-transparent p-2 pb-3">
			<Toggle
				pressed={editor.isActive("bold")}
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
			>
				<ToolbarIcon iconName="bold" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("italic")}
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
			>
				<ToolbarIcon iconName="italic" />
			</Toggle>
			<Toggle disabled>
				<ToolbarIcon iconName="underline" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("strike")}
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
			>
				<ToolbarIcon iconName="strike" />
			</Toggle>
			<Toggle disabled>
				<ToolbarIcon iconName="superscript" />
			</Toggle>
			<Toggle disabled>
				<ToolbarIcon iconName="subscript" />
			</Toggle>
			<Toggle disabled>
				<ToolbarIcon iconName="link" />
			</Toggle>
			<Toggle disabled>
				<ToolbarIcon iconName="clearMarks" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("paragraph")}
				onClick={() => editor.chain().focus().setParagraph().run()}
			>
				<ToolbarIcon iconName="paragraph" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("heading", { level: 1 })}
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			>
				<ToolbarIcon iconName="heading1" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("heading", { level: 2 })}
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			>
				<ToolbarIcon iconName="heading2" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("heading", { level: 3 })}
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
			>
				<ToolbarIcon iconName="heading3" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("heading", { level: 4 })}
				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
			>
				<ToolbarIcon iconName="heading4" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("heading", { level: 5 })}
				onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
			>
				<ToolbarIcon iconName="heading5" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("heading", { level: 6 })}
				onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
			>
				<ToolbarIcon iconName="heading6" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("bulletList")}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
			>
				<ToolbarIcon iconName="bulletList" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("orderedList")}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<ToolbarIcon iconName="numberList" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("codeBlock")}
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
			>
				<ToolbarIcon iconName="codeBlock" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("code")}
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
			>
				<ToolbarIcon iconName="code" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("blockquote")}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
			>
				<ToolbarIcon iconName="blockquote" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("horizontalRule")}
				onClick={() => editor.chain().focus().setHorizontalRule().run()}
			>
				<ToolbarIcon iconName="minus" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("hardBreak")}
				onClick={() => editor.chain().focus().setHardBreak().run()}
			>
				<ToolbarIcon iconName="break" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("redo")}
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
			>
				<ToolbarIcon iconName="redo" />
			</Toggle>
			<Toggle
				pressed={editor.isActive("undo")}
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
			>
				<ToolbarIcon iconName="undo" />
			</Toggle>
			<Toggle onClick={onSave} disabled={!onSave}>
				<ToolbarIcon iconName="save" />
			</Toggle>
		</div>
	);
}
