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

describe("class methods detection", () => {
	const classFixtureDir = resolve(import.meta.dirname, "src");
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

		process.argv = ["node", "fidx", classFixtureDir, "--format", "grouped"];
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
		test("should detect constructor and methods", async () => {
			await main();
			const output = consoleOutput.join("\n");

			expect(output).toContain("class.ts");
			// Constructor should be yellow
			expect(output).toContain(
				"\x1b[2m 2\x1b[22m \x1b[33mconstructor\x1b[39m\x1b[2m(\x1b[22m\x1b[33ma\x1b[39m\x1b[2m:\x1b[22m \x1b[33mstring\x1b[39m\x1b[2m,\x1b[22m \x1b[33mb\x1b[39m\x1b[2m:\x1b[22m \x1b[33mnumber\x1b[39m\x1b[2m)\x1b[22m",
			);
			// Methods should be yellow
			expect(output).toContain(
				"\x1b[2m 7\x1b[22m \x1b[33mmethodOne\x1b[39m\x1b[2m(\x1b[22m\x1b[33mx\x1b[39m\x1b[2m:\x1b[22m \x1b[33mstring\x1b[39m\x1b[2m)\x1b[22m\x1b[2m:\x1b[22m \x1b[33mvoid\x1b[39m",
			);
			expect(output).toContain(
				"\x1b[2m11\x1b[22m \x1b[33mmethodTwo\x1b[39m\x1b[2m(\x1b[22m\x1b[33my\x1b[39m\x1b[2m:\x1b[22m \x1b[33mnumber\x1b[39m\x1b[2m,\x1b[22m \x1b[33mz\x1b[39m\x1b[2m:\x1b[22m \x1b[33mboolean\x1b[39m\x1b[2m)\x1b[22m\x1b[2m:\x1b[22m \x1b[33mstring\x1b[39m",
			);
			expect(output).toContain(
				"\x1b[2m17\x1b[22m \x1b[33mstaticMethod\x1b[39m\x1b[2m(\x1b[22m\x1b[33mparam\x1b[39m\x1b[2m:\x1b[22m \x1b[33mstring[]\x1b[39m\x1b[2m)\x1b[22m\x1b[2m:\x1b[22m \x1b[33mnumber\x1b[39m",
			);
		});

		test("should count methods correctly", async () => {
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toContain("Total: 4 functions found in 1 files");
		});

		test("should match snapshot", async () => {
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toMatchSnapshot();
		});
	});

	describe("list format", () => {
		test("should output class methods in list format", async () => {
			process.argv = ["node", "fidx", classFixtureDir, "--format", "list"];
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toContain("class.ts:2");
			expect(output).toContain("constructor");
			expect(output).toContain("class.ts:7");
			expect(output).toContain("methodOne");
			expect(output).toContain("class.ts:11");
			expect(output).toContain("methodTwo");
			expect(output).toContain("class.ts:17");
			expect(output).toContain("staticMethod");
		});
	});

	describe("tsv format", () => {
		test("should output class methods in TSV format", async () => {
			process.argv = ["node", "fidx", classFixtureDir, "--format", "tsv"];
			await main();
			const output = consoleOutput.join("\n");
			expect(output).toContain("path\tline\tname");
			expect(output).toContain("class.ts\t2\tconstructor");
			expect(output).toContain("class.ts\t7\tmethodOne");
			expect(output).toContain("class.ts\t11\tmethodTwo");
			expect(output).toContain("class.ts\t17\tstaticMethod");
		});
	});

	describe("json format", () => {
		test("should output class methods in JSON format with parameters and return types", async () => {
			process.argv = ["node", "fidx", classFixtureDir, "--format", "json"];
			await main();
			const output = consoleOutput.join("");
			expect(output).toContain('[{"path":"class.ts","functions":[');
			expect(output).toContain(
				'{"line":2,"name":"constructor","parameters":[{"name":"a","type":"string"},{"name":"b","type":"number"}],"returnType":null}',
			);
			expect(output).toContain(
				'{"line":7,"name":"methodOne","parameters":[{"name":"x","type":"string"}],"returnType":"void"}',
			);
			expect(output).toContain(
				'{"line":11,"name":"methodTwo","parameters":[{"name":"y","type":"number"},{"name":"z","type":"boolean"}],"returnType":"string"}',
			);
			expect(output).toContain(
				'{"line":17,"name":"staticMethod","parameters":[{"name":"param","type":"string[]"}],"returnType":"number"}',
			);
		});
	});
});
