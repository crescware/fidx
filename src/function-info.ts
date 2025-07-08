export type FunctionInfo = Readonly<{
	name: string;
	type: "function" | "arrow" | "method" | "constructor";
	line: number;
}>;
