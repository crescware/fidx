import { relative } from "node:path";

import { buildParameterListPlain } from "./build-parameter-list-plain";
import type { extractAllFunctions } from "./extract-all-functions";

export function displayFunctionAsTsv(
	targetDir: string,
	results: Awaited<ReturnType<typeof extractAllFunctions>>,
	useAbsolutePaths: boolean,
): void {
	const headers = ["path", "line", "name", "parameters", "returnType"];
	console.log(headers.join("\t"));

	for (const result of results) {
		const path = useAbsolutePaths
			? result.filePath
			: relative(targetDir, result.filePath);

		for (const func of result.functions) {
			const parameterList = buildParameterListPlain(func);
			const row = [
				path,
				func.line,
				func.name,
				parameterList,
				func.returnType || "",
			];
			console.log(row.join("\t"));
		}
	}
}
