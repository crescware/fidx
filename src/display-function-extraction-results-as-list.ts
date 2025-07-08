import { relative } from "node:path";
import { dim } from "yoctocolors";

import { displayLegend } from "./display-legend";
import type { extractAllFunctions } from "./extract-all-functions";
import { makeColoredName } from "./make-colored-name";

export function displayFunctionExtractionResultsAsList(
	targetDir: string,
	results: Awaited<ReturnType<typeof extractAllFunctions>>,
): { totalFunctions: number; fileCount: number } {
	let totalFunctions = 0;
	let fileCount = 0;

	displayLegend();

	for (const result of results) {
		const relativePath = relative(targetDir, result.filePath);

		for (const func of result.functions) {
			const colored = makeColoredName(func.name, func.type);
			const location = dim(`${relativePath}:${func.line}`);
			console.log(`${location} ${colored}`);
			totalFunctions++;
		}

		fileCount++;
	}

	return { totalFunctions, fileCount };
}
