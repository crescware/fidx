# fidx

Function Index /ˈfaɪ.dɛks/

A tool that scans TypeScript/TSX files and lists the locations of all function definitions.

## Installation

Install globally:

```bash
npm i -g fidx
```

Or use directly with npx:

```bash
npx fidx <path>
```

You can also use `yarn` or `pnpm` as preferred.

## Usage

```bash
fidx <path> [options]
```

### Arguments

**`<path>`**  
The directory or file you want to analyze for functions.

### Options

#### `--format <format>`
Specifies the output format. Available formats:

**`grouped` (default)**  
Displays results grouped by file paths.

<!-- grouped-example-start -->
```
auth/login.ts
  12 validateCredentials(credentials: { username: string; password: string; }): boolean
  29 generateToken(userId: string, options: { expiresIn: number }): { token: string }
  46 handleLoginRequest(request: { email: string; password: string; }): Promise<{ success: boolean }>

components/Button.tsx
   8 Button(props: { label: string }): ReactElement
  35 IconButton(props: { icon: string; label: string; }): ReactElement

utils/string.ts
   5 capitalize(str: string): string
  11 truncate(str: string, length: number): string
  24 sanitizeInput(input: string): string
```
<!-- grouped-example-end -->

**`list`**  
Displays results in a single-line format.

<!-- list-example-start -->
```
path/to/auth/login.ts
   12 validateCredentials(credentials: { username: string; password: string; }): boolean
   29 generateToken(userId: string, options: { expiresIn: number }): { token: string }
   46 handleLoginRequest(request: { email: string; password: string; }): Promise<{ success: boolean }>

path/to/components/Button.tsx
    8 Button(props: { label: string }): ReactElement
   35 IconButton(props: { icon: string; label: string; }): ReactElement

path/to/utils/string.ts
    5 capitalize(str: string): string
   11 truncate(str: string, length: number): string
   24 sanitizeInput(input: string): string
```
<!-- list-example-end -->

**`tsv`**  
Displays results in Tab-Separated Values format, suitable for importing into spreadsheets or processing with other tools.

<!-- tsv-example-start -->
```
path	line	name	parameters	returnType
path/to/auth/login.ts	12	validateCredentials	(credentials: { username: string; password: string; })	boolean
path/to/auth/login.ts	29	generateToken	(userId: string, options: { expiresIn: number })	{ token: string }
path/to/auth/login.ts	46	handleLoginRequest	(request: { email: string; password: string; })	Promise<{ success: boolean }>
path/to/components/Button.tsx	8	Button	(props: { label: string })	ReactElement
path/to/components/Button.tsx	35	IconButton	(props: { icon: string; label: string; })	ReactElement
path/to/utils/string.ts	5	capitalize	(str: string)	string
path/to/utils/string.ts	11	truncate	(str: string, length: number)	string
path/to/utils/string.ts	24	sanitizeInput	(input: string)	string
```
<!-- tsv-example-end -->

**`json`**  
Displays results in JSON format, suitable for processing with tools like `jq`. Each file is represented as an object containing its path and an array of functions.

<!-- json-example-start -->
```json
[
  {
    "path": "auth/login.ts",
    "functions": [
      {
        "line": 12,
        "name": "validateCredentials",
        "parameters": [
          {
            "name": "credentials",
            "type": "{ username: string; password: string; }"
          }
        ],
        "returnType": "boolean"
      },
      {
        "line": 29,
        "name": "generateToken",
        "parameters": [
          {
            "name": "userId",
            "type": "string"
          },
          {
            "name": "options",
            "type": "{ expiresIn: number }"
          }
        ],
        "returnType": "{ token: string }"
      },
      {
        "line": 46,
        "name": "handleLoginRequest",
        "parameters": [
          {
            "name": "request",
            "type": "{ email: string; password: string; }"
          }
        ],
        "returnType": "Promise<{ success: boolean }>"
      }
    ]
  },
  {
    "path": "components/Button.tsx",
    "functions": [
      {
        "line": 8,
        "name": "Button",
        "parameters": [
          {
            "name": "props",
            "type": "{ label: string }"
          }
        ],
        "returnType": "ReactElement"
      },
      {
        "line": 35,
        "name": "IconButton",
        "parameters": [
          {
            "name": "props",
            "type": "{ icon: string; label: string; }"
          }
        ],
        "returnType": "ReactElement"
      }
    ]
  },
  {
    "path": "utils/string.ts",
    "functions": [
      {
        "line": 5,
        "name": "capitalize",
        "parameters": [
          {
            "name": "str",
            "type": "string"
          }
        ],
        "returnType": "string"
      },
      {
        "line": 11,
        "name": "truncate",
        "parameters": [
          {
            "name": "str",
            "type": "string"
          },
          {
            "name": "length",
            "type": "number"
          }
        ],
        "returnType": "string"
      },
      {
        "line": 24,
        "name": "sanitizeInput",
        "parameters": [
          {
            "name": "input",
            "type": "string"
          }
        ],
        "returnType": "string"
      }
    ]
  }
]
```
<!-- json-example-end -->

#### `--absolute`
Displays absolute file paths instead of relative paths from the target directory. When not specified, relative paths are displayed.

#### `--version`, `-V`
Displays the current version of fidx.

#### `--help`, `-h`
Display help for command.

## Requirements

- Node.js 22 or higher

## License

MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Crescware Inc.
