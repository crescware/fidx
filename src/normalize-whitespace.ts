export function normalizeWhitespace(text: string): string {
	return text
		.trim()
		.replace(/\n/g, " ")
		.replace(/\t/g, "")
		.replace(/\s+/g, " ");
}
