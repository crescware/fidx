import { relative } from "node:path";
import { dim } from "yoctocolors";

import type { extractAllFunctions } from "./extract-all-functions";
import { makeColoredName } from "./make-colored-name";

export function displayFunctionAsList(
	targetDir: string,
	results: Awaited<ReturnType<typeof extractAllFunctions>>,
	useAbsolutePaths: boolean,
): { totalFunctions: number; fileCount: number } {
	let totalFunctions = 0;
	let fileCount = 0;

	for (const result of results) {
		const path = useAbsolutePaths
			? result.filePath
			: relative(targetDir, result.filePath);

		for (const func of result.functions) {
			const location = `${path}:${func.line}`;
			const colored = makeColoredName(func.name, func.type);
			console.log(`${dim(location)} ${colored}`);
			totalFunctions++;
		}

		fileCount++;
	}

	return { totalFunctions, fileCount };
}
