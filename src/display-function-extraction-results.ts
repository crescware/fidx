import { relative } from "node:path";
import { dim } from "yoctocolors";

import { displayLegend } from "./display-legend";
import type { extractAllFunctions } from "./extract-all-functions";
import { makeColoredName } from "./make-colored-name";

export function displayFunctionExtractionResults(
	targetDir: string,
	results: Awaited<ReturnType<typeof extractAllFunctions>>,
): { totalFunctions: number; fileCount: number } {
	let totalFunctions = 0;
	let fileCount = 0;

	displayLegend();

	const maxLineNumber = Math.max(
		...results.flatMap((r) => r.functions.map((f) => f.line)),
	);
	const lineNumberWidth = String(maxLineNumber).length;

	for (const result of results) {
		const relativePath = relative(targetDir, result.filePath);
		console.log(dim(relativePath));

		for (const func of result.functions) {
			const colored = makeColoredName(func.name, func.type);
			const paddedLineNumber = dim(
				String(func.line).padStart(lineNumberWidth, " "),
			);
			console.log(`  ${paddedLineNumber} ${colored}`);
			totalFunctions++;
		}

		console.log();
		fileCount++;
	}

	return { totalFunctions, fileCount };
}
