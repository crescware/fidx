import { resolve } from "node:path";
import { Command } from "commander";

import packageJson from "../package.json";

const formatProgressMap: Record<string, boolean> = {
	grouped: true,
	list: true,
	tsv: false,
	json: false,
};

type Return = Readonly<{
	targetDir: string;
	formatType: string;
	showProgress: boolean;
	useAbsolutePaths: boolean;
}>;

export function parseArguments(): Return {
	const program = new Command();

	program
		.name(packageJson.name)
		.description(packageJson.description)
		.version(packageJson.version)
		.usage("<path> [options]")
		.argument(
			"<path>",
			"The directory or file you want to analyze for functions",
		)
		.option("--format <type>", "Specifies the output format", "grouped")
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

	return { targetDir, formatType, showProgress, useAbsolutePaths };
}
