import { extractFunctionsFromFiles } from "./extract-functions-from-files";
import { findTypeScriptFiles } from "./find-type-script-files";

export async function extractAllFunctions(
	targetDir: string,
	showProgress: boolean,
): Promise<ReturnType<typeof extractFunctionsFromFiles>> {
	if (showProgress) {
		console.log("Extracting functions from TypeScript files...\n");
	}

	const files = await findTypeScriptFiles(targetDir, showProgress);
	return extractFunctionsFromFiles(files, showProgress).toSorted((a, b) =>
		a.filePath.localeCompare(b.filePath),
	);
}
