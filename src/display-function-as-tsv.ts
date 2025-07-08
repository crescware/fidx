import { relative } from "node:path";

import type { extractAllFunctions } from "./extract-all-functions";

export function displayFunctionAsTsv(
	targetDir: string,
	results: Awaited<ReturnType<typeof extractAllFunctions>>,
	useAbsolutePaths: boolean,
): void {
	console.log("path\tline\tname");

	for (const result of results) {
		const path = useAbsolutePaths
			? result.filePath
			: relative(targetDir, result.filePath);

		for (const func of result.functions) {
			console.log(`${path}\t${func.line}\t${func.name}`);
		}
	}
}
