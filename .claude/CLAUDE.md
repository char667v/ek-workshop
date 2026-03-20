# Design Systems Workshop

A hands-on workshop starter kit for learning to build consistent, accessible, and reusable UI components.

## Tech Stack

- **Next.js 14** (App Router)
- **JavaScript** (`.jsx`, not TypeScript)
- **Tailwind CSS 3** with CSS variable design tokens
- **Shadcn/UI approach** (Radix UI primitives + CVA + `cn()`)
- **class-variance-authority** for component variants
- **Radix UI** for accessible primitives (`@radix-ui/react-dialog`)
- **lucide-react** for icons

## Project Structure

```
app/
  page.jsx             # Main demo/showcase page
  layout.jsx           # Root layout (Inter font, metadata)
  globals.css          # Design tokens as CSS variables (light + dark)
components/
  ui/
    button.jsx         # Pre-built: Button with CVA (default variant only)
    card.jsx           # Pre-built: Composable Card with subcomponents
    dialog.jsx         # Stub: Workshop task (Radix Dialog)
    alert.jsx          # Stub: Workshop task (CVA variants + subcomponents)
    form-dialog.jsx    # Stub: Workshop task (Dialog + form)
lib/
  utils.js             # cn() helper (clsx + tailwind-merge)
```

## Design Tokens

Colors are defined as HSL CSS variables in `globals.css` and mapped in `tailwind.config.js`:

- `primary` / `primary-foreground` (dark navy / near-white)
- `secondary` / `secondary-foreground` (light blue-gray)
- `destructive` / `destructive-foreground` (red)
- `success` / `success-foreground` (green)
- `muted`, `accent`, `popover`, `card`, `border`, `input`, `ring`

Both light (`:root`) and dark (`.dark`) modes are fully defined.

## Component Patterns

- Use `React.forwardRef` for all components
- Use `cn()` from `@/lib/utils` for class merging
- Use CVA (`class-variance-authority`) for variant-based styling
- Follow the Shadcn/UI composable subcomponent pattern (see Card)
- Keep components in `components/ui/`

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build
npm run lint   # Run ESLint
```

## Workshop Context

The Button (default variant only) and Card are pre-built as reference examples. Students implement:

1. **Button variants** (secondary, success, danger, outline, ghost, link)
2. **Dialog** using `@radix-ui/react-dialog`
3. **Alert** with CVA variants + composable subcomponents
4. **Form Dialog** combining Dialog + form inputs (requires `"use client"`)

All design tokens and dependencies are already in place. Students just need to write the component code.
