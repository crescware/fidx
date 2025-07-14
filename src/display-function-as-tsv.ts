import { relative } from "node:path";

import { buildParameterList } from "./build-parameter-list";
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

		for (const info of result.functions) {
			const parameterList = buildParameterList(info, {
				dim: (v) => v,
				func: (v) => v,
			});
			const row = [
				path,
				info.line,
				info.name,
				parameterList,
				info.returnType || "",
			];
			console.log(row.join("\t"));
		}
	}
}
