import { resolve } from "node:path";
import {
	afterAll,
	afterEach,
	beforeEach,
	describe,
	expect,
	test,
	vi,
} from "vitest";
import { main } from "../../src/main";

describe("complex arguments detection", () => {
	const complexArgsFixtureDir = resolve(import.meta.dirname, "src");
	const originalArgv = process.argv;
	const originalConsoleLog = console.log;
	const originalStdoutWrite = process.stdout.write;
	let consoleOutput: string[] = [];

	beforeEach(() => {
		consoleOutput = [];
		console.log = vi.fn((...args) => {
			consoleOutput.push(args.join(" "));
		});
		process.stdout.write = vi.fn((chunk) => {
			consoleOutput.push(chunk.toString());
			return true;
		});

		let mockTime = 0;
		vi.spyOn(Date, "now").mockImplementation(() => {
			mockTime += 1000;
			return mockTime;
		});

		process.argv = [
			"node",
			"fidx",
			complexArgsFixtureDir,
			"--format",
			"grouped",
		];
	});

	afterEach(() => {
		process.argv = originalArgv;
		console.log = originalConsoleLog;
		process.stdout.write = originalStdoutWrite;
		vi.clearAllMocks();
	});

	afterAll(() => {
		vi.restoreAllMocks();
	});

	describe("grouped format", () => {
		test("should detect functions with complex arguments", async () => {
			await main();
			const output = consoleOutput.join("\n");

			expect(output).toContain("complex.ts");
			expect(output).toContain("processData");
			expect(output).toContain("handleComplexArgs");
			expect(output).toContain("Array");
			expect(output).toContain("Map");
			expect(output).toContain("enabled: boolean; options: string[];");
			expect(output).toContain("timeout: number; retries: number;");
		});

		test("should count functions correctly", async () => {
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toContain("Total: 2 functions found in 1 files");
		});

		test("should match snapshot", async () => {
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toMatchSnapshot();
		});
	});

	describe("list format", () => {
		test("should output complex args functions in list format", async () => {
			process.argv = [
				"node",
				"fidx",
				complexArgsFixtureDir,
				"--format",
				"list",
			];
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toContain("complex.ts:1");
			expect(output).toContain("processData");
			expect(output).toContain("complex.ts:14");
			expect(output).toContain("handleComplexArgs");
		});
	});

	describe("tsv format", () => {
		test("should output complex args functions in TSV format", async () => {
			process.argv = ["node", "fidx", complexArgsFixtureDir, "--format", "tsv"];
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toContain("path\tline\tname");
			expect(output).toContain("complex.ts\t1\tprocessData");
			expect(output).toContain("complex.ts\t14\thandleComplexArgs");
		});
	});

	describe("json format", () => {
		test("should output complex args functions in JSON format with parameters and return types", async () => {
			process.argv = [
				"node",
				"fidx",
				complexArgsFixtureDir,
				"--format",
				"json",
			];
			await main();
			const output = consoleOutput.join("");
			expect(output).toContain('[{"path":"complex.ts","functions":[');
			expect(output).toContain(
				'{"line":1,"name":"processData","parameters":[{"name":"items","type":"Array"},{"name":"config","type":"{ enabled: boolean; options: string[]; }"},{"name":"callback","type":"(value: T) => void"}],"returnType":"void"}',
			);
			expect(output).toContain(
				'{"line":14,"name":"handleComplexArgs","parameters":[{"name":"map","type":"Map"},{"name":"settings","type":"{ timeout: number; retries: number; }"}],"returnType":null}',
			);
		});
	});
});
