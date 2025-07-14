import type { FunctionInfo } from "./function-info";

type Style = Readonly<{
	dim: (v: string) => string;
	func: (v: string, type: FunctionInfo["type"]) => string;
}>;

export function buildParameterList(info: FunctionInfo, style: Style): string {
	const formattedParameters = info.parameters
		.map((v) => {
			const name = style.func(v.name, info.type);
			const type = v.type
				? `${style.dim(":")} ${style.func(v.type, info.type)}`
				: "";
			return `${name}${type}`;
		})
		.join(`${style.dim(",")} `);

	return formattedParameters
		? `${style.dim("(")}${formattedParameters}${style.dim(")")}`
		: `${style.dim("()")}`;
}
