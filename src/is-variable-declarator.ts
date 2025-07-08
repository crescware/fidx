import type { FilterByType } from "./filter-by-type";
import type { Node } from "./node";

export function isVariableDeclarator(
	node: Node,
): node is FilterByType<Node, "VariableDeclarator"> {
	return node.type === "VariableDeclarator";
}
