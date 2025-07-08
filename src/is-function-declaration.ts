import type { FilterByType } from "./filter-by-type";
import type { Node } from "./node";

export function isFunctionDeclaration(
	node: Node,
): node is FilterByType<Node, "FunctionDeclaration"> {
	return node.type === "FunctionDeclaration";
}
