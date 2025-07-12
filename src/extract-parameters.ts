import { extractParameterName } from "./extract-parameter-name";
import { extractParameterType } from "./extract-parameter-type";
import type { FunctionInfo } from "./function-info";
import type { ParameterNode } from "./function-node";

export function extractParameters(
	params: ParameterNode[],
	source: string,
): FunctionInfo["parameters"] {
	return params.map((param) => ({
		name: extractParameterName(param),
		type: extractParameterType(param, source),
	}));
}
