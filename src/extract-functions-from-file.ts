import { readFileSync } from "node:fs";
import oxc from "oxc-parser";
import { walk } from "oxc-walker";

import type { FunctionInfo } from "./function-info";
import { isArrowFunctionExpression } from "./is-arrow-function-expression";
import { isFunctionDeclaration } from "./is-function-declaration";
import { isFunctionExpression } from "./is-function-expression";
import { isIdentifier } from "./is-identifier";
import { isMethodDefinition } from "./is-method-definition";
import { isProperty } from "./is-property";
import { isVariableDeclarator } from "./is-variable-declarator";

export function extractFunctionsFromFile(filePath: string): FunctionInfo[] {
	try {
		const source = readFileSync(filePath, "utf8");
		const result = oxc.parseSync(filePath, source);

		if (!result.program) {
			return [];
		}

		const functions: /* mut */ FunctionInfo[] = [];

		const lines = source.split("\n");
		const lineStarts: number[] = [0];
		for (let i = 0; i < lines.length - 1; i++) {
			const currentLineStart = lineStarts[i];
			const currentLine = lines[i];
			if (currentLineStart !== undefined && currentLine !== undefined) {
				lineStarts.push(currentLineStart + currentLine.length + 1);
			}
		}

		const getLineNumber = (position: number): number => {
			for (let i = lineStarts.length - 1; i >= 0; i--) {
				const lineStart = lineStarts[i];
				if (lineStart !== undefined && position >= lineStart) {
					return i + 1;
				}
			}
			return 1;
		};

		walk(result.program, {
			enter(node) {
				if (isFunctionDeclaration(node) && node.id?.name) {
					functions.push({
						name: node.id.name,
						type: "function",
						line: getLineNumber(node.start),
					});
					return;
				}

				if (isVariableDeclarator(node) && isIdentifier(node.id) && node.init) {
					if (isArrowFunctionExpression(node.init)) {
						functions.push({
							name: node.id.name,
							type: "arrow",
							line: getLineNumber(node.start),
						});
						return;
					}
					if (isFunctionExpression(node.init)) {
						functions.push({
							name: node.id.name,
							type: "function",
							line: getLineNumber(node.start),
						});
						return;
					}
					return;
				}

				if (isMethodDefinition(node) && isIdentifier(node.key)) {
					if (node.key.name === "constructor") {
						functions.push({
							name: "constructor",
							type: "constructor",
							line: getLineNumber(node.start),
						});
						return;
					}
					functions.push({
						name: node.key.name,
						type: "method",
						line: getLineNumber(node.start),
					});
					return;
				}

				if (isProperty(node) && isIdentifier(node.key)) {
					if (isArrowFunctionExpression(node.value)) {
						functions.push({
							name: node.key.name,
							type: "arrow",
							line: getLineNumber(node.start),
						});
						return;
					}
					if (isFunctionExpression(node.value)) {
						functions.push({
							name: node.key.name,
							type: "function",
							line: getLineNumber(node.start),
						});
						return;
					}
				}
			},
		});

		return functions;
	} catch (error) {
		console.error(`Error parsing ${filePath}:`, error);
		return [];
	}
}
