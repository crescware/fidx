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
fidx <path> [--format <format>] [--absolute]
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

path/to/utils/string.ts
   5 capitalize()
  11 truncate()
  23 sanitizeInput()

path/to/components/Button.tsx
   8 Button()
  32 IconButton()
```

**`list`**  
Displays results in a single-line format.

```
path/to/auth/login.ts:12 validateCredentials()
path/to/auth/login.ts:28 generateToken()
path/to/auth/login.ts:45 handleLoginRequest()
path/to/utils/string.ts:5 capitalize()
path/to/utils/string.ts:11 truncate()
path/to/utils/string.ts:23 sanitizeInput()
path/to/components/Button.tsx:8 Button()
path/to/components/Button.tsx:32 IconButton()
```

**`tsv`**  
Displays results in Tab-Separated Values format, suitable for importing into spreadsheets or processing with other tools.

```
path	line	name
path/to/auth/login.ts	12	validateCredentials
path/to/auth/login.ts	28	generateToken
path/to/auth/login.ts	45	handleLoginRequest
path/to/utils/string.ts	5	capitalize
path/to/utils/string.ts	11	truncate
path/to/utils/string.ts	23	sanitizeInput
path/to/components/Button.tsx	8	Button
path/to/components/Button.tsx	32	IconButton
```

#### `--absolute`
Displays absolute file paths instead of relative paths from the target directory. When not specified, relative paths are displayed.

#### `--version`
Displays the current version of fidx.

## Requirements

- Node.js 22 or higher

## License

MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Crescware Inc.
