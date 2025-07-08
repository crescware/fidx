import type { FilterByType } from "./filter-by-type";
import type { Node } from "./node";

export function isProperty(node: Node): node is FilterByType<Node, "Property"> {
	return node.type === "Property";
}
