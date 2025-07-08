import { cyan, yellow } from "yoctocolors";

import type { FunctionInfo } from "./function-info";

export type ColorFunction = (text: string) => string;

type TypeMetadata = Record<
	FunctionInfo["type"],
	{
		label: string;
		color: ColorFunction;
	}
>;

export const typeMetadata = {
	function: {
		label: "functions",
		color: cyan,
	},
	arrow: {
		label: "arrow functions",
		color: cyan,
	},
	method: {
		label: "methods",
		color: yellow,
	},
	constructor: {
		label: "constructors",
		color: yellow,
	},
} as const satisfies TypeMetadata;
