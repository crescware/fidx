import type { FunctionInfo } from "./function-info";
import { typeMetadata } from "./type-metadata";

export function makeColoredName(
	name: string,
	type: FunctionInfo["type"],
): string {
	const funcWithParens = `${name}()`;
	return typeMetadata[type].color(funcWithParens);
}
