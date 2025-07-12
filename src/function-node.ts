import type { FilterByType } from "./filter-by-type";
import type { Node } from "./node";

export type FunctionNode =
	| FilterByType<Node, "FunctionDeclaration">
	| FilterByType<Node, "FunctionExpression">
	| FilterByType<Node, "ArrowFunctionExpression">;

export type ParameterNode = FunctionNode["params"][number];
