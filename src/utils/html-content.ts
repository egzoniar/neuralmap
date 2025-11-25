import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";

// Register languages for syntax highlighting
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);

/**
 * Check if HTML content has actual text (not just empty HTML tags)
 * @param content - HTML string to check
 * @returns true if content has non-empty text, false otherwise
 */
export function hasActualContent(content: string | undefined): boolean {
	if (!content) return false;

	// Use DOMParser to properly extract text content from HTML
	const parser = new DOMParser();
	const doc = parser.parseFromString(content, "text/html");
	const textContent = doc.body.textContent || "";
	return textContent.trim().length > 0;
}

/**
 * Sanitize HTML content and apply syntax highlighting to code blocks
 * @param content - HTML string to process
 * @returns Sanitized and syntax-highlighted HTML string
 */
export function processHtmlContent(content: string | undefined): string {
	if (!content || !hasActualContent(content)) return "";

	// First, sanitize the HTML to prevent XSS attacks
	const sanitized = DOMPurify.sanitize(content, {
		ALLOWED_TAGS: [
			"p",
			"br",
			"strong",
			"em",
			"u",
			"s",
			"code",
			"pre",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"ul",
			"ol",
			"li",
			"blockquote",
			"hr",
			"a",
			"img",
			"span",
			"div",
		],
		ALLOWED_ATTR: ["href", "src", "alt", "class", "target", "rel"],
		ALLOW_DATA_ATTR: false,
	});

	// Parse the sanitized HTML to apply syntax highlighting
	const parser = new DOMParser();
	const doc = parser.parseFromString(sanitized, "text/html");
	const codeBlocks = doc.querySelectorAll("pre code");

	// Apply highlight.js to each code block
	codeBlocks.forEach((block) => {
		hljs.highlightElement(block as HTMLElement);
	});

	// Return the processed HTML
	return doc.body.innerHTML;
}
