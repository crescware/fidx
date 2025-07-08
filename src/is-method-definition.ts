import type { FilterByType } from "./filter-by-type";
import type { Node } from "./node";

export function isMethodDefinition(
	node: Node,
): node is FilterByType<Node, "MethodDefinition"> {
	return node.type === "MethodDefinition";
}
