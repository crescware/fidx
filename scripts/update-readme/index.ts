import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const projectRoot = join(import.meta.dirname, "..", "..");
const readmePath = join(projectRoot, "README.md");
const exampleDir = join(projectRoot, "example");

function runFidx(format: string): string {
	const command =
		format === "json"
			? `node dist/index.js ${exampleDir} --format ${format} | jq`
			: `node dist/index.js ${exampleDir} --format ${format}`;
	const output = execSync(command, { cwd: projectRoot, encoding: "utf-8" });

	// biome-ignore lint/suspicious/noControlCharactersInRegex: Required for ANSI escape code removal
	return output.replace(/\x1b\[[0-9;]*m/g, "");
}

function updateSection(
	content: string,
	sectionName: string,
	newContent: string,
): string {
	const startMarker = `<!-- ${sectionName}-start -->`;
	const endMarker = `<!-- ${sectionName}-end -->`;

	const startIndex = content.indexOf(startMarker);
	const endIndex = content.indexOf(endMarker);

	if (startIndex === -1 || endIndex === -1) {
		console.error(`Section markers not found for: ${sectionName}`);
		return content;
	}

	const before = content.substring(0, startIndex + startMarker.length);
	const after = content.substring(endIndex);

	const codeBlockStart = sectionName.includes("json") ? "```json" : "```";

	return [before, codeBlockStart, newContent.trim(), "```", after].join("\n");
}

function extractListOutput(output: string): string {
	const lines = output.split("\n");
	const functionLines: string[] = [];
	let inFunctionSection = false;

	for (const line of lines) {
		if (line.match(/^(auth|utils|components)\//)) {
			inFunctionSection = true;
			functionLines.push(line);
		} else if (inFunctionSection && line.startsWith("=")) {
			break;
		}
	}

	const groups: { [key: string]: string[] } = {};
	for (const line of functionLines) {
		const match = line.match(/^([^:]+):(\d+)\s+(.+)$/);
		if (match) {
			const [, path, lineNum, funcDef] = match;
			if (!groups[path]) {
				groups[path] = [];
			}
			groups[path].push(`  ${lineNum.padStart(3)} ${funcDef}`);
		}
	}

	const result: string[] = [];
	for (const [path, funcs] of Object.entries(groups)) {
		result.push(`path/to/${path}`);
		result.push(...funcs);
		result.push("");
	}

	if (result[result.length - 1] === "") {
		result.pop();
	}

	return result.join("\n");
}

function extractGroupedOutput(output: string): string {
	const lines = output.split("\n");
	const result: string[] = [];
	let inFileSection = false;
	let skipNext = false;

	for (const line of lines) {
		if (line.includes("Legend:")) {
			skipNext = true;
			continue;
		}

		if (skipNext) {
			if (line.trim() === "") {
				skipNext = false;
			}
			continue;
		}

		if (line.match(/^(auth|utils|components)\//)) {
			inFileSection = true;
			result.push(line);
		} else if (inFileSection && line.match(/^\s+\d+\s+/)) {
			result.push(line);
		} else if (inFileSection && line.startsWith("=")) {
			break;
		} else if (inFileSection && line.trim() === "") {
			result.push("");
		}
	}

	return result.join("\n").trim();
}

function extractTsvOutput(output: string): string {
	const lines = output.split("\n");
	const result: string[] = [];
	let headerFound = false;

	for (const line of lines) {
		if (line.startsWith("path\tline\tname")) {
			headerFound = true;
			result.push(line);
			continue;
		}

		if (headerFound && line.includes("\t")) {
			result.push(line.replace(/^(auth|components|utils)\//, "path/to/$1/"));
		} else if (headerFound && line.trim() === "") {
			break;
		}
	}

	return result.join("\n");
}

function extractJsonOutput(output: string): string {
	const jsonStart = output.indexOf("[");
	const jsonEnd = output.lastIndexOf("]") + 1;
	if (jsonStart === -1 || jsonEnd === 0) {
		return "[]";
	}

	return output.substring(jsonStart, jsonEnd).trim();
}

function main() {
	console.log("Reading README.md...");
	let readme = readFileSync(readmePath, "utf-8");

	console.log("Running fidx with list format...");
	const listOutput = runFidx("list");
	const listExample = extractListOutput(listOutput);
	readme = updateSection(readme, "list-example", listExample);

	console.log("Running fidx with grouped format...");
	const groupedOutput = runFidx("grouped");
	const groupedExample = extractGroupedOutput(groupedOutput);
	readme = updateSection(readme, "grouped-example", groupedExample);

	console.log("Running fidx with tsv format...");
	const tsvOutput = runFidx("tsv");
	const tsvExample = extractTsvOutput(tsvOutput);
	readme = updateSection(readme, "tsv-example", tsvExample);

	console.log("Running fidx with json format...");
	const jsonOutput = runFidx("json");
	const jsonExample = extractJsonOutput(jsonOutput);
	readme = updateSection(readme, "json-example", jsonExample);

	console.log("Writing updated README.md...");
	writeFileSync(readmePath, readme);

	console.log("README.md updated successfully!");
}

main();
