import type { FilterByType } from "./filter-by-type";
import type { Node } from "./node";

export function isFunctionExpression(
	node: Node,
): node is FilterByType<Node, "FunctionExpression"> {
	return node.type === "FunctionExpression";
}
