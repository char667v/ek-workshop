# AGENTS.md

This file is for coding agents working in this repository.

## Project Snapshot

- App type: Next.js App Router app
- Language: JavaScript (`.jsx`, `.js`), no TypeScript source files
- UI stack: React 18, Tailwind CSS 4, Radix UI primitives, CVA
- Package manager: `npm`
- Import alias: `@/*` maps to repository root (see `jsconfig.json`)

## Commands

Run commands from repo root: `/Users/villads-valur/developer/personal/ek-workshop`

### Install

```bash
npm install
```

If npm cache permissions fail locally, use:

```bash
npm --cache /tmp/npm-cache install
```

### Development

```bash
npm run dev
```

Notes:

- The project is pinned to a StackBlitz-compatible Next.js version.
- Use `npm run dev` in workshop environments to match documented setup.

### Build

```bash
npm run build
```

Note: `npm run build` uses default Next.js build behavior for the pinned version.

### Start production server

```bash
npm run start
```

### Lint

```bash
npm run lint
```

Equivalent direct command:

```bash
npx eslint .
```

### Lint a single file

```bash
npx eslint app/page.jsx
```

### Auto-fix lint issues

```bash
npx eslint . --fix
```

### Tests

There is currently no test runner configured (`package.json` has no `test` script).

- Do not invent test commands.
- If tests are added later, document the exact single-test command here.

For now, validation is:

1. `npm run lint`
2. `npm run build`
3. Manual check via `npm run dev`

## Repository Structure

- `app/` - App Router files (`layout.jsx`, `page.jsx`, global CSS)
- `components/ui/` - Reusable UI components
- `lib/` - Shared utilities (`cn` helper)
- `.eslintrc.json` - ESLint config
- `components.json` - shadcn/ui configuration

## Coding Conventions

Follow existing patterns in this codebase.

### File and symbol naming

- File names: kebab-case (`form-dialog.jsx`)
- React components: PascalCase (`CardHeader`)
- Variables/functions: camelCase (`buttonVariants`, `cn`)
- Exported constants: use clear semantic names, avoid abbreviations

### Imports

- Use absolute alias imports for internal modules when practical: `@/components/...`, `@/lib/...`
- Keep imports grouped: external packages first, internal imports second
- Remove unused imports
- Prefer named imports unless module only exposes default

### React patterns

- Use function components
- Use `React.forwardRef` for components that need ref forwarding
- Keep components small and composable
- Prefer explicit `if` branches for complex conditional rendering
- Avoid unnecessary `useEffect`; use it only for external side effects

### Props and types

- This project is JavaScript-first; no TypeScript types currently
- Use descriptive prop names (`className`, `variant`, `size`)
- Keep prop APIs minimal and stable
- Prefer default values in function parameters over legacy `defaultProps`

### Styling and design system rules

- Use Tailwind utility classes for component styling
- Use design-token utilities (`bg-background`, `text-foreground`, `border-border`, etc.)
- Use `cn()` from `lib/utils.js` to merge classes
- Use CVA (`class-variance-authority`) for variant-based components
- Keep visual styles consistent with existing button/card patterns
- Keep dark mode compatible with `.dark` class

### Tailwind CSS 4 specifics

- Global Tailwind entry is `app/globals.css` via `@import "tailwindcss"`
- Theme tokens are defined in `@theme inline`
- Dark mode variant is custom: `@custom-variant dark (&:where(.dark, .dark *))`
- PostCSS plugin is `@tailwindcss/postcss` in `postcss.config.js`
- Do not reintroduce `tailwind.config.js` unless there is a clear need

### Accessibility

- Prefer semantic HTML (`button`, `nav`, headings in order)
- Keep focus-visible styles intact
- Use Radix primitives for complex interactive UI when appropriate
- Ensure keyboard interactions work for dialogs/menus/forms

### Error handling and reliability

- Fail fast on invalid states in component logic
- Do not swallow errors silently
- For user-facing async actions, provide clear success/error states
- Keep validation close to where data is entered or submitted

### Comments and documentation

- Prefer self-explanatory code over comments
- Add comments only for non-obvious rationale
- Keep comments short and accurate
- Update README/AGENTS docs when commands or architecture change

## Lint/Formatting Baseline

- ESLint uses `.eslintrc.json`
- Next.js rules come from `eslint-config-next/core-web-vitals`
- No Prettier config is defined; follow existing file style
- Match surrounding formatting in edited files

## Dependency and Tooling Rules

- Prefer existing dependencies over adding new ones
- Before adding a dependency, verify current stack cannot solve it
- Keep dependencies on current stable major versions unless blocked
- Run lint + build after dependency or config changes

## Git and Change Hygiene

- Keep changes focused on requested scope
- Do not revert unrelated local changes
- Do not use destructive git commands without explicit request
- Use conventional commit messages when committing

## Cursor/Copilot Rules Check

Checked at time of writing:

- `.cursor/rules/` not found
- `.cursorrules` not found
- `.github/copilot-instructions.md` not found

If any of these files are added later, update this document and treat them as authoritative guidance.
