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

describe("complex return types detection", () => {
	const complexReturnFixtureDir = resolve(import.meta.dirname, "src");
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
			complexReturnFixtureDir,
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
		test("should detect functions with complex return types", async () => {
			await main();
			const output = consoleOutput.join("\n");

			expect(output).toContain("complex.ts");
			expect(output).toContain("getData");
			expect(output).toContain("createResponse");
			expect(output).toContain("Promise<");
			expect(output).toContain("T[]");
			// Verify multiline object types are normalized to single line
			expect(output).toContain(
				"Promise<{ result: T[]; metadata: { count: number; hasMore: boolean; }; }>",
			);
			expect(output).toContain(
				'{ data: U; status: "success" | "error"; errors?: string[]; }',
			);
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
		test("should output complex return functions in list format", async () => {
			process.argv = [
				"node",
				"fidx",
				complexReturnFixtureDir,
				"--format",
				"list",
			];
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toContain("complex.ts:1");
			expect(output).toContain("getData");
			expect(output).toContain("complex.ts:14");
			expect(output).toContain("createResponse");
		});
	});

	describe("tsv format", () => {
		test("should output complex return functions in TSV format", async () => {
			process.argv = [
				"node",
				"fidx",
				complexReturnFixtureDir,
				"--format",
				"tsv",
			];
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toContain("path\tline\tname");
			expect(output).toContain("complex.ts\t1\tgetData");
			expect(output).toContain("complex.ts\t14\tcreateResponse");
		});
	});

	describe("json format", () => {
		test("should output complex return functions in JSON format with parameters and return types", async () => {
			process.argv = [
				"node",
				"fidx",
				complexReturnFixtureDir,
				"--format",
				"json",
			];
			await main();
			const output = consoleOutput.join("");
			expect(output).toContain('[{"path":"complex.ts","functions":[');
			expect(output).toContain(
				'{"line":1,"name":"getData","parameters":[],"returnType":"Promise<{ result: T[]; metadata: { count: number; hasMore: boolean; }; }>"}',
			);
			expect(output).toContain(
				'{"line":14,"name":"createResponse","parameters":[],"returnType":"{ data: U; status: \\"success\\" | \\"error\\"; errors?: string[]; }"}',
			);
		});
	});
});
