import type { useEditor } from "@tiptap/react";
import type { KeyboardEvent } from "react";

interface TiptapShortcutsProps {
	editor: ReturnType<typeof useEditor>;
	handleManualSave: () => void;
	event: KeyboardEvent;
}

export function handleTiptapShortcuts({
	editor,
	event,
	handleManualSave,
}: TiptapShortcutsProps) {
	if (event.key === "Enter" && event.shiftKey) {
		// Shift + Enter: Insert a hard break
		event.preventDefault();
		editor?.chain().focus().setHardBreak().run();
	} else if (event.key === "Tab") {
		// Prevent tab from moving focus
		event.preventDefault();

		// Insert 2 spaces and ensure focus is maintained
		if (editor) {
			// Using insertContent with focus() to ensure focus is maintained
			editor.chain().focus().insertContent("  ").run();

			// Additional focus call to ensure editor stays focused
			setTimeout(() => editor.commands.focus(), 0);
		}
	} else if (event.metaKey || event.ctrlKey) {
		// Handle common keyboard shortcuts
		if (event.key === "b") {
			event.preventDefault();
			editor?.chain().focus().toggleBold().run();
		} else if (event.key === "i") {
			event.preventDefault();
			editor?.chain().focus().toggleItalic().run();
		} else if (event.key === "`") {
			event.preventDefault();
			editor?.chain().focus().toggleCode().run();
		} else if (event.key === "1" && event.ctrlKey) {
			event.preventDefault();
			editor?.chain().focus().toggleHeading({ level: 1 }).run();
		} else if (event.key === "2" && event.ctrlKey) {
			event.preventDefault();
			editor?.chain().focus().toggleHeading({ level: 2 }).run();
		} else if (event.key === "3" && event.ctrlKey) {
			event.preventDefault();
			editor?.chain().focus().toggleHeading({ level: 3 }).run();
		} else if (event.key === "4" && event.ctrlKey) {
			event.preventDefault();
			editor?.chain().focus().toggleHeading({ level: 4 }).run();
		} else if (event.key === "5" && event.ctrlKey) {
			event.preventDefault();
			editor?.chain().focus().toggleHeading({ level: 5 }).run();
		} else if (event.key === "6" && event.ctrlKey) {
			event.preventDefault();
			editor?.chain().focus().toggleHeading({ level: 6 }).run();
		}
	}

	// Add Ctrl+S / Cmd+S for save
	if ((event.metaKey || event.ctrlKey) && event.key === "s") {
		event.preventDefault();
		handleManualSave();
	}
}
