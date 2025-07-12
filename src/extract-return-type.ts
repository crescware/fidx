import type { FunctionNode } from "./function-node";

export function extractReturnType(
	node: FunctionNode,
	source: string,
): string | null {
	if (node.returnType?.typeAnnotation) {
		const typeNode = node.returnType.typeAnnotation;
		return source
			.slice(typeNode.start, typeNode.end)
			.trim()
			.replace(/\n/g, " ")
			.replace(/\t/g, "")
			.replace(/\s+/g, " ");
	}
	return null;
}
