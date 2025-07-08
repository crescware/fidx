import { resolve } from "node:path";
import arg from "arg";

import { displayFunctionExtractionResults } from "./display-function-extraction-results";
import { displayFunctionExtractionResultsAsList } from "./display-function-extraction-results-as-list";
import { displaySummary } from "./display-summary";
import { divider } from "./divider";
import { extractAllFunctions } from "./extract-all-functions";
import { PreconditionError } from "./precondition-error";

export async function main(): Promise<void> {
	const args = arg({
		"--report": String,
	});

	const targetPath = args._[0];
	if (!targetPath) {
		throw new PreconditionError("Directory path is required");
	}
	const targetDir = resolve(process.env.INIT_CWD || ".", targetPath);
	const startTime = Date.now();
	const results = await extractAllFunctions(targetDir);
	const endTime = Date.now();
	const elapsedSeconds = (endTime - startTime) / 1000;

	console.log("Function extraction complete!\n");
	console.log(divider());

	const reportType = args["--report"] || "table";

	if (reportType === "table") {
		const { totalFunctions, fileCount } = displayFunctionExtractionResults(
			targetDir,
			results,
		);

		displaySummary(totalFunctions, fileCount, elapsedSeconds);
		return;
	}

	if (reportType === "list") {
		const { totalFunctions, fileCount } =
			displayFunctionExtractionResultsAsList(targetDir, results);

		displaySummary(totalFunctions, fileCount, elapsedSeconds);
		return;
	}

	throw new PreconditionError("invalid config");
}
