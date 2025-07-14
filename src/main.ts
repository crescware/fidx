import { resolve } from "node:path";
import { Command } from "commander";

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
	const program = new Command();

	program
		.name("fidx")
		.description(
			"A tool that scans TypeScript/TSX files and lists the locations of all function definitions.",
		)
		.version(packageJson.version)
		.argument(
			"<path>",
			"The directory or file you want to analyze for functions",
		)
		.option(
			"--format <type>",
			"Specifies the output format (default: grouped)",
			"grouped",
		)
		.option(
			"--absolute",
			"Displays absolute file paths instead of relative paths",
			false,
		)
		.parse();

	const options = program.opts();
	const targetPath = program.args[0];

	if (!targetPath) {
		program.error("Directory path is required");
	}

	// Validate format type
	const validFormats = ["grouped", "list", "tsv", "json"];
	if (!validFormats.includes(options.format)) {
		program.error(
			`Invalid format '${options.format}'. Valid formats are: ${validFormats.join(", ")}`,
		);
	}

	const targetDir = resolve(process.env.INIT_CWD || ".", targetPath);
	const formatType = options.format;
	const showProgress = formatProgressMap[formatType] ?? false;
	const useAbsolutePaths = options.absolute;

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

	throw new PreconditionError("invalid config");
}
