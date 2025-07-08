import { relative } from "node:path";
import { dim } from "yoctocolors";

import type { extractAllFunctions } from "./extract-all-functions";
import { makeColoredName } from "./make-colored-name";
import { typeMetadata } from "./type-metadata";

export function displayFunctionAsGrouped(
	targetDir: string,
	results: Awaited<ReturnType<typeof extractAllFunctions>>,
	useAbsolutePaths: boolean,
): { totalFunctions: number; fileCount: number } {
	let totalFunctions = 0;
	let fileCount = 0;

	const maxLineNumber = Math.max(
		...results.flatMap((r) => r.functions.map((f) => f.line)),
	);
	const lineNumberWidth = String(maxLineNumber).length;

	for (const result of results) {
		const path = useAbsolutePaths
			? result.filePath
			: relative(targetDir, result.filePath);
		console.log(dim(path));

		for (const func of result.functions) {
			const colored = makeColoredName(func.name, func.type);
			const paddedLineNumber = dim(
				String(func.line).padStart(lineNumberWidth, " "),
			);
			const returnType = func.returnType
				? `${dim(":")} ${typeMetadata[func.type].color(func.returnType)}`
				: "";
			console.log(`  ${paddedLineNumber} ${colored}${returnType}`);
			totalFunctions++;
		}

		console.log();
		fileCount++;
	}

	return { totalFunctions, fileCount };
}
