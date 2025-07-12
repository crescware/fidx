import type { FunctionInfo } from "./function-info";

export function buildParameterListPlain(func: FunctionInfo): string {
	const formattedParameters = func.parameters
		.map((param) => {
			const name = param.name;
			const type = param.type ? `: ${param.type}` : "";
			return `${name}${type}`;
		})
		.join(", ");

	return formattedParameters ? `(${formattedParameters})` : "()";
}
