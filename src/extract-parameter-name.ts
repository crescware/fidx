import type { ParameterNode } from "./function-node";

export function extractParameterName(param: ParameterNode): string {
	if ("name" in param && typeof param.name === "string") {
		return param.name;
	}
	if (
		"pattern" in param &&
		param.pattern &&
		typeof param.pattern === "object" &&
		"name" in param.pattern &&
		typeof param.pattern.name === "string"
	) {
		return param.pattern.name;
	}
	return "unknown";
}
