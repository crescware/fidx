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

describe("simple functions detection", () => {
	const simpleFixtureDir = resolve(import.meta.dirname, "src");
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
		beforeEach(async () => {
			process.argv = ["node", "fidx", simpleFixtureDir, "--format", "grouped"];
			await main();
		});

		test("should display header and legend", () => {
			const output = consoleOutput.join("\n");
			expect(output).toContain("Extracting functions from TypeScript files...");
			expect(output).toContain("Function extraction complete!");
			expect(output).toContain("\x1b[2mLegend:\x1b[22m");
			expect(output).toContain(
				"\x1b[36mname()\x1b[39m - Functions and arrow functions",
			);
			expect(output).toContain(
				"\x1b[33mname()\x1b[39m - Methods and constructors",
			);
		});

		test("should detect functions in simple.ts", () => {
			const output = consoleOutput.join("\n");
			expect(output).toContain("simple.ts");
			expect(output).toContain(
				"\x1b[2m1\x1b[22m \x1b[36madd\x1b[39m\x1b[2m(\x1b[22m\x1b[36ma\x1b[39m\x1b[2m:\x1b[22m \x1b[36mnumber\x1b[39m\x1b[2m,\x1b[22m \x1b[36mb\x1b[39m\x1b[2m:\x1b[22m \x1b[36mnumber\x1b[39m\x1b[2m)\x1b[22m\x1b[2m:\x1b[22m \x1b[36mnumber\x1b[39m",
			);
			expect(output).toContain(
				"\x1b[2m5\x1b[22m \x1b[36mconcat\x1b[39m\x1b[2m(\x1b[22m\x1b[36mx\x1b[39m\x1b[2m:\x1b[22m \x1b[36mstring\x1b[39m\x1b[2m,\x1b[22m \x1b[36my\x1b[39m\x1b[2m:\x1b[22m \x1b[36mstring\x1b[39m\x1b[2m)\x1b[22m",
			);
		});

		test("should display summary", () => {
			const output = consoleOutput.join("\n");
			expect(output).toContain("Total: 2 functions found in 1 files");
		});

		test("should match snapshot", () => {
			const output = consoleOutput.join("\n");
			expect(output).toMatchSnapshot();
		});
	});

	describe("list format", () => {
		test("should output functions in list format", async () => {
			process.argv = ["node", "fidx", simpleFixtureDir, "--format", "list"];
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toContain("simple.ts:1");
			expect(output).toContain("add");
			expect(output).toContain("simple.ts:5");
			expect(output).toContain("concat");
		});
	});

	describe("tsv format", () => {
		test("should output functions in TSV format", async () => {
			process.argv = ["node", "fidx", simpleFixtureDir, "--format", "tsv"];
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toContain("path\tline\tname");
			expect(output).toContain("simple.ts\t1\tadd");
			expect(output).toContain("simple.ts\t5\tconcat");
		});
	});

	describe("json format", () => {
		test("should output functions in JSON format with parameters and return types", async () => {
			process.argv = ["node", "fidx", simpleFixtureDir, "--format", "json"];
			await main();
			const output = consoleOutput.join("");
			expect(output).toContain('[{"path":"simple.ts","functions":[');
			expect(output).toContain(
				'{"line":1,"name":"add","parameters":[{"name":"a","type":"number"},{"name":"b","type":"number"}],"returnType":"number"}',
			);
			expect(output).toContain(
				'{"line":5,"name":"concat","parameters":[{"name":"x","type":"string"},{"name":"y","type":"string"}],"returnType":null}',
			);
		});
	});
});
