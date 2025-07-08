import { divider } from "./divider";

export function displaySummary(
	totalFunctions: number,
	fileCount: number,
	elapsedSeconds: number,
): void {
	console.log(divider());
	console.log(
		`\nTotal: ${totalFunctions} functions found in ${fileCount} files`,
	);
	console.log(`Time: ${elapsedSeconds.toFixed(2)} seconds\n`);
}
