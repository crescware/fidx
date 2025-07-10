import { relative } from "node:path";

import type { extractAllFunctions } from "./extract-all-functions";

export function displayFunctionAsJson(
	targetDir: string,
	results: Awaited<ReturnType<typeof extractAllFunctions>>,
	useAbsolutePaths: boolean,
): void {
	const output = results.map((result) => {
		const path = useAbsolutePaths
			? result.filePath
			: relative(targetDir, result.filePath);

		return {
			path,
			functions: result.functions.map((func) => ({
				line: func.line,
				name: func.name,
				returnType: func.returnType,
			})),
		};
	});

	console.log(JSON.stringify(output));
}
