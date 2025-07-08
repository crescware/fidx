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
fidx <path> [--format <format>]
```

### Arguments

**`<path>`**  
The directory or file you want to analyze for functions.

### Options

**`--format <format>`**  
Specifies the output format. Available formats:

#### `table` (default)
Displays results in a table format with grouped file paths.

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

#### `list`
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

## License

MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Crescware Inc.
