# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2025-07-15

### Added

- Function parameter display in all output formats
  - Shows parameter names and types for each function
  - Grouped/List formats: full function signatures with parameters inline
  - TSV format: new "parameters" column
  - JSON format: structured "parameters" array with name/type for each parameter
- `--help` / `-h` option to display usage information
- `-V` short alias for `--version` option

## [1.2.1] - 2025-07-10

### Fixed

- console.log output limitation when piping large JSON data (>65536 characters)
  - Replaced `JSON.stringify` with `json-stream-stringify` library for streaming output
  - Writes JSON data progressively to stdout to avoid pipe buffer limitations

## [1.2.0] - 2025-07-10

### Added

- JSON output format (`--format json`) for machine-readable output
  - Structured as an array of objects with file paths and function arrays
  - Each function includes line number, name, and return type
  - Suitable for processing with tools like `jq`

## [1.1.2] - 2025-07-09

### Fixed

- Normalize whitespace in multi-line return type definitions
  - Replace newlines with single spaces
  - Remove tab characters
  - Collapse multiple consecutive spaces into single spaces

## [1.1.1] - 2025-07-09

- Skipped

## [1.1.0] - 2025-07-09

### Added

- Return type display functionality for functions in all output formats
  - Grouped format: shows return types inline with function signatures
  - List format: includes return type information after function names
  - TSV format: new "returnType" column for better data export
- `--version` CLI option to display the current version

## [1.0.0] - 2025-07-09

### Added

- Initial release
- Support for scanning TypeScript (.ts, .tsx) files
- Three output formats: grouped, list, and tsv
- Function detection for regular functions, arrow functions, methods, and constructors
- Color-coded output for different function types
- Option to display absolute or relative file paths
