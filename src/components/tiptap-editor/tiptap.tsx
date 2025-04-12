"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "@/components/tiptap-editor/toolbar";
import { useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";

import Lowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import { cn } from "@/lib/utils";
import { handleTiptapShortcuts } from "@/utils/tiptap-shortcuts";
// Built-in Highlight.js Themes
// import "highlight.js/styles/default.css"; // Default
import "highlight.js/styles/atom-one-dark.css"; // Atom One Dark
// import "highlight.js/styles/atom-one-light.css"; // Atom One Light
// import "highlight.js/styles/monokai.css"; // Monokai
// import 'highlight.js/styles/github.css';           // GitHub
// import "highlight.js/styles/github-dark.css"; // GitHub Dark
// import "highlight.js/styles/github-dark-dimmed.css"; // GitHub Dark Dimmed
// import "highlight.js/styles/nord.css"; // Nord
// import "highlight.js/styles/vs2015.css"; // VS Code Dark
// import "highlight.js/styles/vs.css"; // VS Code Light
// import "highlight.js/styles/an-old-hope.css"; // An Old Hope

// Create a Lowlight instance and register languages
const lowlight = createLowlight();
lowlight.register("javascript", javascript);
lowlight.register("html", html);
lowlight.register("css", css);

interface TiptapEditorProps {
	content: string;
	onChange: (richText: string) => void;
	onSave?: (richText: string) => void;
	autoSaveInterval?: number; // in milliseconds
	placeholder?: string;
	onImageUpload?: (file: File) => Promise<string>;
}

export function TiptapEditor({
	content,
	onChange,
	onSave,
	autoSaveInterval = 3000,
	placeholder = "Start typing or use the toolbar to format your content...",
	onImageUpload,
}: TiptapEditorProps) {
	// Create a debounced save function with proper dependencies
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSave = useCallback(
		debounce((html: string) => {
			onSave?.(html);
		}, autoSaveInterval),
		[], // Empty dependency array since we're using the eslint-disable comment
	);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Lowlight.configure({
				lowlight: lowlight,
			}),
			Placeholder.configure({
				placeholder,
			}),
			Image.configure({
				inline: true,
				allowBase64: true,
			}),
		],
		content: content,
		editorProps: {
			attributes: {
				class: cn("focus-visible:outline-none p-2 min-h-[200px]"),
			},
			handleKeyDown: (view, event) => {
				// Handle tab key directly in the editor
				if (event.key === "Tab") {
					event.preventDefault();
					view.dispatch(view.state.tr.insertText(""));
					return true;
				}
				return false;
			},
			handleDrop: (view, event, slice, moved) => {
				if (
					!moved &&
					event.dataTransfer &&
					event.dataTransfer.files &&
					event.dataTransfer.files[0] &&
					onImageUpload
				) {
					const file = event.dataTransfer.files[0];
					const isImage = file.type.startsWith("image/");

					if (isImage) {
						event.preventDefault();

						// Handle the image upload
						onImageUpload(file)
							.then((url) => {
								editor?.chain().focus().setImage({ src: url }).run();
							})
							.catch((error) => {
								console.error("Failed to upload image:", error);
							});

						return true;
					}
				}
				return false;
			},
		},
		onUpdate({ editor }: { editor: ReturnType<typeof useEditor> }) {
			if (editor) {
				const html = editor.getHTML();
				onChange(html);
				if (onSave) {
					debouncedSave(html);
				}
			}
		},
	});

	// Clean up the debounced function on unmount
	useEffect(() => {
		return () => {
			debouncedSave.cancel();
		};
	}, [debouncedSave]);

	const handleManualSave = useCallback(() => {
		if (editor && onSave) {
			onSave(editor.getHTML());
		}
	}, [editor, onSave]);

	return (
		<div className="flex flex-col gap-2">
			<Toolbar editor={editor} onSave={onSave ? handleManualSave : undefined} />
			<EditorContent
				className="border rounded-md p-1"
				editor={editor}
				onKeyDown={(event) =>
					handleTiptapShortcuts({ editor, event, handleManualSave })
				}
			/>
		</div>
	);
}
