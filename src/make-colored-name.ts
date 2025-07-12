import type { FunctionInfo } from "./function-info";
import { typeMetadata } from "./type-metadata";

export function makeColoredName(
	name: string,
	type: FunctionInfo["type"],
): string {
	return typeMetadata[type].color(name);
}
