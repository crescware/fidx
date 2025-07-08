import type { FilterByType } from "./filter-by-type";
import type { Node } from "./node";

export function isIdentifier(
	node: Node,
): node is FilterByType<Node, "Identifier"> {
	return node.type === "Identifier";
}
