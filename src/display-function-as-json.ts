import { relative } from "node:path";
import { JsonStreamStringify } from "json-stream-stringify";

import type { extractAllFunctions } from "./extract-all-functions";

export async function displayFunctionAsJson(
	targetDir: string,
	results: Awaited<ReturnType<typeof extractAllFunctions>>,
	useAbsolutePaths: boolean,
): Promise<void> {
	const output = results.map((result) => {
		const path = useAbsolutePaths
			? result.filePath
			: relative(targetDir, result.filePath);

		return {
			path,
			functions: result.functions.map((v) => ({
				line: v.line,
				name: v.name,
				returnType: v.returnType,
			})),
		};
	});

	const stream = new JsonStreamStringify(output);

	return new Promise<void>((resolve, reject) => {
		stream.on("data", (v) => process.stdout.write(v));
		stream.on("error", (e) => reject(e));

		stream.on("end", () => {
			process.stdout.write("\n");
			resolve();
		});
	});
}
