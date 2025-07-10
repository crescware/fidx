import { resolve } from "node:path";
import arg from "arg";

import packageJson from "../package.json";
import { displayFunctionAsGrouped } from "./display-function-as-grouped";
import { displayFunctionAsJson } from "./display-function-as-json";
import { displayFunctionAsList } from "./display-function-as-list";
import { displayFunctionAsTsv } from "./display-function-as-tsv";
import { displayHeader } from "./display-header";
import { displayLegend } from "./display-legend";
import { displaySummary } from "./display-summary";
import { extractAllFunctions } from "./extract-all-functions";
import { PreconditionError } from "./precondition-error";

const formatProgressMap: Record<string, boolean> = {
	grouped: true,
	list: true,
	tsv: false,
	json: false,
};

export async function main(): Promise<void> {
	const args = arg({
		"--format": String,
		"--absolute": Boolean,
		"--version": Boolean,
	});

	if (args["--version"]) {
		console.log(packageJson.version);
		return;
	}

	const targetPath = args._[0];
	if (!targetPath) {
		throw new PreconditionError("Directory path is required");
	}
	const targetDir = resolve(process.env.INIT_CWD || ".", targetPath);
	const formatType = args["--format"] || "grouped";
	const showProgress = formatProgressMap[formatType] ?? false;
	const useAbsolutePaths = args["--absolute"] || false;

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
		displayFunctionAsJson(targetDir, results, useAbsolutePaths);
		return;
	}

	throw new PreconditionError("invalid config");
}
