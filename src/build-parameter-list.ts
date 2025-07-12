import { dim } from "yoctocolors";

import type { FunctionInfo } from "./function-info";
import { typeMetadata } from "./type-metadata";

export function buildParameterList(func: FunctionInfo): string {
	const formattedParameters = func.parameters
		.map((param) => {
			const name = typeMetadata[func.type].color(param.name);
			const type = param.type
				? `${dim(":")} ${typeMetadata[func.type].color(param.type)}`
				: "";
			return `${name}${type}`;
		})
		.join(`${dim(",")} `);

	return formattedParameters
		? `${dim("(")}${formattedParameters}${dim(")")}`
		: `${dim("()")}`;
}
