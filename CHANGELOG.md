# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-08

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
