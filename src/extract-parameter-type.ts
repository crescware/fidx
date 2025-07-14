import type { FunctionInfo } from "./function-info";
import type { ParameterNode } from "./function-node";
import { normalizeWhitespace } from "./normalize-whitespace";

export function extractParameterType(
	param: ParameterNode,
	source: string,
): FunctionInfo["parameters"][number]["type"] {
	if (!("typeAnnotation" in param) || !param.typeAnnotation?.typeAnnotation) {
		return null;
	}

	const node = param.typeAnnotation.typeAnnotation;
	if (node.type === "TSNullKeyword") {
		return "null";
	}
	if (node.type === "TSStringKeyword") {
		return "string";
	}
	if (node.type === "TSNumberKeyword") {
		return "number";
	}
	if (node.type === "TSBooleanKeyword") {
		return "boolean";
	}
	if (
		node.type === "TSTypeReference" &&
		node.typeName &&
		typeof node.typeName === "object" &&
		"name" in node.typeName &&
		typeof node.typeName.name === "string"
	) {
		return node.typeName.name;
	}

	const start = node.start;
	const end = node.end;
	if (start !== undefined && end !== undefined) {
		return normalizeWhitespace(source.slice(start, end));
	}
	return null;
}
