import { extractFunctionsFromFile } from "./extract-functions-from-file";
import type { findTypeScriptFiles } from "./find-type-script-files";
import type { FunctionInfo } from "./function-info";

type FileResult = Readonly<{
	filePath: string;
	functions: FunctionInfo[];
}>;

export function extractFunctionsFromFiles(
	files: Awaited<ReturnType<typeof findTypeScriptFiles>>,
	showProgress: boolean,
): readonly FileResult[] {
	const start = Date.now();
	const results: FileResult[] = [];

	for (const filePath of files) {
		const functions = extractFunctionsFromFile(filePath);
		if (functions.length === 0) {
			continue;
		}
		results.push({ filePath, functions });
	}

	const end = Date.now();
	if (showProgress) {
		console.log(`Parse time: ${(end - start) / 1000}s`);
	}

	return results;
}
