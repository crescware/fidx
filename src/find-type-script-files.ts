import { Glob } from "glob";

export async function findTypeScriptFiles(
	targetDir: string,
): Promise<readonly string[]> {
	const start = Date.now();
	const glob = new Glob("**/*.{ts,tsx}", {
		ignore: "**/node_modules/**",
		cwd: targetDir,
		absolute: true,
	});
	const files: string[] = [];
	for await (const file of glob) {
		files.push(file);
	}
	const end = Date.now();
	console.log(`Glob execution time: ${(end - start) / 1000}s`);

	return files;
}
