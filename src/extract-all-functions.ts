import { extractFunctionsFromFiles } from "./extract-functions-from-files";
import { findTypeScriptFiles } from "./find-type-script-files";

export async function extractAllFunctions(
	targetDir: string,
): Promise<ReturnType<typeof extractFunctionsFromFiles>> {
	console.log("Extracting functions from TypeScript files...\n");

	const files = await findTypeScriptFiles(targetDir);
	return extractFunctionsFromFiles(files).toSorted((a, b) =>
		a.filePath.localeCompare(b.filePath),
	);
}
