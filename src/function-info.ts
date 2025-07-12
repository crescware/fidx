export type FunctionInfo = Readonly<{
	name: string;
	type: "function" | "arrow" | "method" | "constructor";
	line: number;
	returnType: string | null;
	parameters: readonly { name: string; type: string | null }[];
}>;
