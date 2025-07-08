import type { FilterByType } from "./filter-by-type";
import type { Node } from "./node";

export function isArrowFunctionExpression(
	node: Node,
): node is FilterByType<Node, "ArrowFunctionExpression"> {
	return node.type === "ArrowFunctionExpression";
}
