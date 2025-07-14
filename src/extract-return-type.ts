import type { FunctionNode } from "./function-node";
import { normalizeWhitespace } from "./normalize-whitespace";

export function extractReturnType(
	node: FunctionNode,
	source: string,
): string | null {
	if (node.returnType?.typeAnnotation) {
		const typeNode = node.returnType.typeAnnotation;
		return normalizeWhitespace(source.slice(typeNode.start, typeNode.end));
	}
	return null;
}
