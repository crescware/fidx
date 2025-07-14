import { relative } from "node:path";
import { dim } from "yoctocolors";

import { buildParameterList } from "./build-parameter-list";
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

		for (const info of result.functions) {
			const colored = makeColoredName(info.name, info.type);
			const paddedLineNumber = dim(
				String(info.line).padStart(lineNumberWidth, " "),
			);
			const parameterList = buildParameterList(info, {
				dim,
				func: (v, type) => typeMetadata[type].color(v),
			});
			const returnType = info.returnType
				? `${dim(":")} ${typeMetadata[info.type].color(info.returnType)}`
				: "";
			console.log(
				`  ${paddedLineNumber} ${colored}${parameterList}${returnType}`,
			);
			totalFunctions++;
		}

		console.log();
		fileCount++;
	}

	return { totalFunctions, fileCount };
}
