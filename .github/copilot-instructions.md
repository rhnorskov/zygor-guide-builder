# Copilot Instructions for Zygor Guide Builder

## Architecture Overview

This is a TypeScript library and CLI tool for building Zygor guides for World of Warcraft addons. The project follows a dual-purpose structure:

- **Library**: Exports types and builder functions from `src/index.ts` for programmatic use
- **CLI**: Provides `zgb` command via `src/cli/` for building guides from TypeScript files

## Key Components

### Core Guide Types (`src/index.ts`)

- `Action`: Represents guide actions (text, ding, tip) with type-safe command generation - defined via Zod schema
- `Step`: Contains a label and array of sub-steps (actions or action arrays) - derived from Zod schema
- `GuideMeta`: Guide metadata (title, etc.) - validated with Zod schema
- `GuideContent`: Array of steps that form the complete guide - type-safe array of Step schemas

**Validation**: All types use Zod schemas for runtime validation. Type guards (`isGuideMeta`, `isGuideContent`) use `safeParse()` for proper validation.

### CLI Build Process (`src/cli/commands/build.ts`)

- Scans TypeScript files in input directory using Bun's Glob
- Dynamically imports each guide file expecting `meta` and `content` exports
- Validates imported data using Zod schemas via type guard functions
- Transforms validated TypeScript guide definitions into Zygor's text format

## Development Workflow

**Primary commands:**

```bash
bun install              # Install dependencies
bun run src/index.ts     # Run main entry point
zgb build -i ./guides    # Build guides from TypeScript
zgb build -w -o out      # Watch mode with output directory
```

**Project uses Bun runtime** - not Node.js. All scripts and examples assume Bun.

## Key Patterns

### Guide File Structure

Every guide file must export `meta` and `content`:

```typescript
export const meta: GuideMeta = { title: "Guide Name" };
export const content: GuideContent = [
  step("step_label", text("Do something"), tip("Helpful hint")),
];
```

### Builder Functions

- Use `step()` for creating guide steps - supports both labeled and unlabeled variants
- Use `text()`, `tip()`, `ding()` for actions within steps
- Actions can be single or arrays: `step(action)` or `step([action1, action2])`

### Template System

- Templates in `src/cli/template/` define WoW addon structure (.toc, .lua files)
- Build process generates addon-compatible output from TypeScript guides

## Code Organization

- `src/index.ts`: Library exports (types and builders)
- `src/cli/`: CLI implementation using Citty framework
- `src/utils/`: Shared utilities (nullish checks, etc.)
- `example/`: Reference implementation showing library usage
- `_old/`: Legacy code being migrated from

## Important Notes

- All types are derived from Zod schemas for runtime validation and type safety
- Type validation functions (`isGuideMeta`, `isGuideContent`) use Zod's `safeParse()` method
- Build command validates imported data before transforming to Zygor's text format
- The `isNonNullish` utility is crucial for filtering command arrays during build
- Example project links to main package for local development testing
