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

```
path/to/auth/login.ts
  12 validateCredentials()
  28 generateToken()
  45 handleLoginRequest()

path/to/components/Button.tsx
   8 Button()
  32 IconButton()
  
path/to/utils/string.ts
   5 capitalize()
  11 truncate()
  23 sanitizeInput()
```

**`list`**  
Displays results in a single-line format.

```
path/to/auth/login.ts:12 validateCredentials()
path/to/auth/login.ts:28 generateToken()
path/to/auth/login.ts:45 handleLoginRequest()
path/to/components/Button.tsx:8 Button()
path/to/components/Button.tsx:32 IconButton()
path/to/utils/string.ts:5 capitalize()
path/to/utils/string.ts:11 truncate()
path/to/utils/string.ts:23 sanitizeInput()
```

**`tsv`**  
Displays results in Tab-Separated Values format, suitable for importing into spreadsheets or processing with other tools.

```
path	line	name
path/to/auth/login.ts	12	validateCredentials
path/to/auth/login.ts	28	generateToken
path/to/auth/login.ts	45	handleLoginRequest
path/to/components/Button.tsx	8	Button
path/to/components/Button.tsx	32	IconButton
path/to/utils/string.ts	5	capitalize
path/to/utils/string.ts	11	truncate
path/to/utils/string.ts	23	sanitizeInput
```

**`json`**  
Displays results in JSON format, suitable for processing with tools like `jq`. Each file is represented as an object containing its path and an array of functions.

```json
[
  {
    "path": "path/to/auth/login.ts",
    "functions": [
      {"line": 12, "name": "validateCredentials", "returnType": "boolean"},
      {"line": 28, "name": "generateToken", "returnType": "string"},
      {"line": 45, "name": "handleLoginRequest", "returnType": "Promise<void>"}
    ]
  },
  {
    "path": "path/to/components/Button.tsx",
    "functions": [
      {"line": 8, "name": "Button", "returnType": "JSX.Element"},
      {"line": 32, "name": "IconButton", "returnType": "JSX.Element"}
    ]
  },
  {
    "path": "path/to/utils/string.ts",
    "functions": [
      {"line": 5, "name": "capitalize", "returnType": "string"},
      {"line": 11, "name": "truncate", "returnType": "string"},
      {"line": 23, "name": "sanitizeInput", "returnType": "string"}
    ]
  }
]
```

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
