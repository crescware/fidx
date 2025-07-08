#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/main.ts
var import_node_path3 = require("path");
var import_arg = __toESM(require("arg"), 1);

// src/display-function-extraction-results.ts
var import_node_path = require("path");
var import_yoctocolors3 = require("yoctocolors");

// src/display-legend.ts
var import_yoctocolors2 = require("yoctocolors");

// src/type-metadata.ts
var import_yoctocolors = require("yoctocolors");
var typeMetadata = {
  function: {
    label: "functions",
    color: import_yoctocolors.cyan
  },
  arrow: {
    label: "arrow functions",
    color: import_yoctocolors.cyan
  },
  method: {
    label: "methods",
    color: import_yoctocolors.yellow
  },
  constructor: {
    label: "constructors",
    color: import_yoctocolors.yellow
  }
};

// src/display-legend.ts
function displayLegend() {
  console.log((0, import_yoctocolors2.dim)("Legend:"));
  const colorMap = Object.entries(typeMetadata).reduce((acc, [_, metadata]) => {
    const labels = acc.get(metadata.color) || [];
    labels.push(metadata.label);
    acc.set(metadata.color, labels);
    return acc;
  }, /* @__PURE__ */ new Map());
  for (const [colorFn, labels] of colorMap) {
    const description = labels.join(" and ");
    const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
    console.log(`  ${colorFn("name()")} - ${capitalizedDescription}`);
  }
  console.log();
}

// src/make-colored-name.ts
function makeColoredName(name, type) {
  const funcWithParens = `${name}()`;
  return typeMetadata[type].color(funcWithParens);
}

// src/display-function-extraction-results.ts
function displayFunctionExtractionResults(targetDir, results) {
  let totalFunctions = 0;
  let fileCount = 0;
  displayLegend();
  const maxLineNumber = Math.max(
    ...results.flatMap((r) => r.functions.map((f) => f.line))
  );
  const lineNumberWidth = String(maxLineNumber).length;
  for (const result of results) {
    const relativePath = (0, import_node_path.relative)(targetDir, result.filePath);
    console.log((0, import_yoctocolors3.dim)(relativePath));
    for (const func of result.functions) {
      const colored = makeColoredName(func.name, func.type);
      const paddedLineNumber = (0, import_yoctocolors3.dim)(
        String(func.line).padStart(lineNumberWidth, " ")
      );
      console.log(`  ${paddedLineNumber} ${colored}`);
      totalFunctions++;
    }
    console.log();
    fileCount++;
  }
  return { totalFunctions, fileCount };
}

// src/display-function-extraction-results-as-list.ts
var import_node_path2 = require("path");
var import_yoctocolors4 = require("yoctocolors");
function displayFunctionExtractionResultsAsList(targetDir, results) {
  let totalFunctions = 0;
  let fileCount = 0;
  displayLegend();
  for (const result of results) {
    const relativePath = (0, import_node_path2.relative)(targetDir, result.filePath);
    for (const func of result.functions) {
      const colored = makeColoredName(func.name, func.type);
      const location = (0, import_yoctocolors4.dim)(`${relativePath}:${func.line}`);
      console.log(`${location} ${colored}`);
      totalFunctions++;
    }
    fileCount++;
  }
  return { totalFunctions, fileCount };
}

// src/divider.ts
function divider() {
  return `${"=".repeat(60)}
`;
}

// src/display-summary.ts
function displaySummary(totalFunctions, fileCount, elapsedSeconds) {
  console.log(divider());
  console.log(
    `
Total: ${totalFunctions} functions found in ${fileCount} files`
  );
  console.log(`Time: ${elapsedSeconds.toFixed(2)} seconds
`);
}

// src/extract-functions-from-file.ts
var import_node_fs = require("fs");
var import_oxc_parser = __toESM(require("oxc-parser"), 1);
var import_oxc_walker = require("oxc-walker");

// src/is-arrow-function-expression.ts
function isArrowFunctionExpression(node) {
  return node.type === "ArrowFunctionExpression";
}

// src/is-function-declaration.ts
function isFunctionDeclaration(node) {
  return node.type === "FunctionDeclaration";
}

// src/is-function-expression.ts
function isFunctionExpression(node) {
  return node.type === "FunctionExpression";
}

// src/is-identifier.ts
function isIdentifier(node) {
  return node.type === "Identifier";
}

// src/is-method-definition.ts
function isMethodDefinition(node) {
  return node.type === "MethodDefinition";
}

// src/is-property.ts
function isProperty(node) {
  return node.type === "Property";
}

// src/is-variable-declarator.ts
function isVariableDeclarator(node) {
  return node.type === "VariableDeclarator";
}

// src/extract-functions-from-file.ts
function extractFunctionsFromFile(filePath) {
  try {
    const source = (0, import_node_fs.readFileSync)(filePath, "utf8");
    const result = import_oxc_parser.default.parseSync(filePath, source);
    if (!result.program) {
      return [];
    }
    const functions = [];
    const lines = source.split("\n");
    const lineStarts = [0];
    for (let i = 0; i < lines.length - 1; i++) {
      const currentLineStart = lineStarts[i];
      const currentLine = lines[i];
      if (currentLineStart !== void 0 && currentLine !== void 0) {
        lineStarts.push(currentLineStart + currentLine.length + 1);
      }
    }
    const getLineNumber = (position) => {
      for (let i = lineStarts.length - 1; i >= 0; i--) {
        const lineStart = lineStarts[i];
        if (lineStart !== void 0 && position >= lineStart) {
          return i + 1;
        }
      }
      return 1;
    };
    (0, import_oxc_walker.walk)(result.program, {
      enter(node) {
        var _a;
        if (isFunctionDeclaration(node) && ((_a = node.id) == null ? void 0 : _a.name)) {
          functions.push({
            name: node.id.name,
            type: "function",
            line: getLineNumber(node.start)
          });
          return;
        }
        if (isVariableDeclarator(node) && isIdentifier(node.id) && node.init) {
          if (isArrowFunctionExpression(node.init)) {
            functions.push({
              name: node.id.name,
              type: "arrow",
              line: getLineNumber(node.start)
            });
            return;
          }
          if (isFunctionExpression(node.init)) {
            functions.push({
              name: node.id.name,
              type: "function",
              line: getLineNumber(node.start)
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
              line: getLineNumber(node.start)
            });
            return;
          }
          functions.push({
            name: node.key.name,
            type: "method",
            line: getLineNumber(node.start)
          });
          return;
        }
        if (isProperty(node) && isIdentifier(node.key)) {
          if (isArrowFunctionExpression(node.value)) {
            functions.push({
              name: node.key.name,
              type: "arrow",
              line: getLineNumber(node.start)
            });
            return;
          }
          if (isFunctionExpression(node.value)) {
            functions.push({
              name: node.key.name,
              type: "function",
              line: getLineNumber(node.start)
            });
            return;
          }
        }
      }
    });
    return functions;
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return [];
  }
}

// src/extract-functions-from-files.ts
function extractFunctionsFromFiles(files) {
  const start = Date.now();
  const results = [];
  for (const filePath of files) {
    const functions = extractFunctionsFromFile(filePath);
    if (functions.length === 0) {
      continue;
    }
    results.push({ filePath, functions });
  }
  const end = Date.now();
  console.log(`Parse time: ${(end - start) / 1e3}s`);
  return results;
}

// src/find-type-script-files.ts
var import_glob = require("glob");
async function findTypeScriptFiles(targetDir) {
  const start = Date.now();
  const glob = new import_glob.Glob("**/*.{ts,tsx}", {
    ignore: "**/node_modules/**",
    cwd: targetDir,
    absolute: true
  });
  const files = [];
  for await (const file of glob) {
    files.push(file);
  }
  const end = Date.now();
  console.log(`Glob execution time: ${(end - start) / 1e3}s`);
  return files;
}

// src/extract-all-functions.ts
async function extractAllFunctions(targetDir) {
  console.log("Extracting functions from TypeScript files...\n");
  const files = await findTypeScriptFiles(targetDir);
  return extractFunctionsFromFiles(files).toSorted(
    (a, b) => a.filePath.localeCompare(b.filePath)
  );
}

// src/precondition-error.ts
var PreconditionError = class extends Error {
};

// src/main.ts
async function main() {
  const args = (0, import_arg.default)({
    "--format": String
  });
  const targetPath = args._[0];
  if (!targetPath) {
    throw new PreconditionError("Directory path is required");
  }
  const targetDir = (0, import_node_path3.resolve)(process.env.INIT_CWD || ".", targetPath);
  const startTime = Date.now();
  const results = await extractAllFunctions(targetDir);
  const endTime = Date.now();
  const elapsedSeconds = (endTime - startTime) / 1e3;
  console.log("Function extraction complete!\n");
  console.log(divider());
  const formatType = args["--format"] || "table";
  if (formatType === "table") {
    const { totalFunctions, fileCount } = displayFunctionExtractionResults(
      targetDir,
      results
    );
    displaySummary(totalFunctions, fileCount, elapsedSeconds);
    return;
  }
  if (formatType === "list") {
    const { totalFunctions, fileCount } = displayFunctionExtractionResultsAsList(targetDir, results);
    displaySummary(totalFunctions, fileCount, elapsedSeconds);
    return;
  }
  throw new PreconditionError("invalid config");
}

// index.ts
main().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
