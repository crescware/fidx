import { displayFunctionAsGrouped } from "./display-function-as-grouped";
import { displayFunctionAsJson } from "./display-function-as-json";
import { displayFunctionAsList } from "./display-function-as-list";
import { displayFunctionAsTsv } from "./display-function-as-tsv";
import { displayHeader } from "./display-header";
import { displayLegend } from "./display-legend";
import { displaySummary } from "./display-summary";
import { extractAllFunctions } from "./extract-all-functions";
import { parseArguments } from "./parse-arguments";
import { PreconditionError } from "./precondition-error";

export async function main(): Promise<void> {
	const { targetDir, formatType, showProgress, useAbsolutePaths } =
		parseArguments();

	const startTime = Date.now();
	const results = await extractAllFunctions(targetDir, showProgress);
	const endTime = Date.now();
	const elapsedSeconds = (endTime - startTime) / 1000;

	if (formatType === "grouped") {
		displayHeader();
		displayLegend();
		const { totalFunctions, fileCount } = displayFunctionAsGrouped(
			targetDir,
			results,
			useAbsolutePaths,
		);

		displaySummary(totalFunctions, fileCount, elapsedSeconds);
		return;
	}

	if (formatType === "list") {
		displayHeader();
		displayLegend();
		const { totalFunctions, fileCount } = displayFunctionAsList(
			targetDir,
			results,
			useAbsolutePaths,
		);

		displaySummary(totalFunctions, fileCount, elapsedSeconds);
		return;
	}

	if (formatType === "tsv") {
		displayFunctionAsTsv(targetDir, results, useAbsolutePaths);
		return;
	}

	if (formatType === "json") {
		await displayFunctionAsJson(targetDir, results, useAbsolutePaths);
		return;
	}

	throw new PreconditionError("invalid format type");
}
