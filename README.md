# Design Systems Workshop Participant Guide

Welcome, this workshop is hands-on. You will extend a small UI library and practice the same patterns design system teams use in real products.

## Tech Stack

- **Next.js 14** (App Router)
- **JavaScript** (vanilla, no TypeScript)
- **Tailwind CSS** for utility-first styling
- **Shadcn/UI** approach (Radix UI primitives + CVA)
- **class-variance-authority** for component variants
- **Radix UI** for accessible primitives

## Start Here

Open the StackBlitz link shared by your facilitator. The project runs in your browser, so you do not need local setup.

When the editor loads:

1. Wait for the dev server to start (you'll see the app preview)
2. Read `components/ui/button.jsx` and `components/ui/card.jsx` first (these are your pattern references)
3. Open the task files in `components/ui/` (imports and hints are already prepared)
4. Complete Tasks 1 to 4 in order

## Project Structure

```
/app
  /page.jsx          # Main demo page (add your components here to test)
  /layout.jsx        # Root layout with fonts
  /globals.css       # Global styles + CSS design tokens
/components
  /ui
    /button.jsx      # ✅ Pre-built Button component (default variant only)
    /card.jsx        # ✅ Pre-built Card component (composable subcomponents)
    /dialog.jsx      # 🚧 Task 2: Dialog with Radix UI
    /alert.jsx       # 🚧 Task 3: Alert with CVA variants
    /form-dialog.jsx # 🚧 Task 4: Form Dialog (requires Task 2)
/lib
  /utils.js          # Utility functions (cn helper)
```

## What's Included

### Pre-built Components

#### Button Component (`components/ui/button.jsx`)
A starter button component using CVA (class-variance-authority) with a single `default` variant:

- **Variants:** `default` (you add more in Task 1)
- **Sizes:** `default`, `sm`, `lg`, `icon`
- Accessible with focus states
- Uses `forwardRef` and `cn()` for class merging

```jsx
import { Button } from "@/components/ui/button"

<Button>Click me</Button>
<Button size="lg">Large Button</Button>
<Button size="sm">Small Button</Button>
```

#### Card Component (`components/ui/card.jsx`)
A composable card component with subcomponents:

- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Subtitle text
- `CardContent` - Main content area
- `CardFooter` - Footer section

```jsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

## Workshop Tasks

Use `app/page.jsx` as your sandbox while you work. After each task, add a small demo to confirm your component API works.

### Task 1: Add Button Variants (30 min)

In this task, you will expand the Button API with reusable variants.

**File:** `components/ui/button.jsx`

1. **Study the existing code:**
   - The Button ships with only a `default` variant
   - Notice how CVA defines `variants`, `sizes`, and `defaultVariants`
   - See how `cn()` merges classes and `forwardRef` forwards refs

2. **Add these variants to the CVA config:**
   - `secondary` - uses `bg-secondary` / `text-secondary-foreground`
   - `success` - uses `bg-success` / `text-success-foreground`
   - `danger` - uses `bg-destructive` / `text-destructive-foreground`
   - `outline` - border style with transparent background, hover with `bg-accent`
   - `ghost` - no background, shows hover effect with `bg-accent`
   - `link` - text-only style with underline on hover

3. **Checkpoint:**
   - Uncomment the variant demos in `app/page.jsx`
   - Verify each variant renders correctly
   - Try combining variants with different sizes

**Hint:** Check `globals.css` and `tailwind.config.js` to see which design tokens are available (e.g. `success`, `destructive`, `secondary`, `accent`).

### Task 2: Build a Dialog Component (45 min)

In this task, you will build a dialog by following the Radix docs directly.

**File:** `components/ui/dialog.jsx` (imports are pre-configured)

Start here: [Radix Dialog Docs](https://www.radix-ui.com/docs/primitives/components/dialog)

Do this in order:
1. Open the Radix docs and copy the primitive structure (`Root`, `Trigger`, `Portal`, `Overlay`, `Content`, `Title`, `Description`, `Close`).
2. In `components/ui/dialog.jsx`, wrap those primitives into your own reusable components.
3. Add your Tailwind classes so it looks consistent with the rest of the app.

Radix handles accessibility for you (focus trap, ESC to close, ARIA attributes).

**Subcomponents to create:**
- `Dialog` - re-export `DialogPrimitive.Root`
- `DialogTrigger` - re-export `DialogPrimitive.Trigger`
- `DialogPortal` - re-export `DialogPrimitive.Portal`
- `DialogOverlay` - styled overlay (dark backdrop)
- `DialogContent` - styled content panel (uses Portal + Overlay internally)
- `DialogHeader` - layout wrapper for title + description
- `DialogTitle` - styled `DialogPrimitive.Title`
- `DialogDescription` - styled `DialogPrimitive.Description`
- `DialogFooter` - layout wrapper for action buttons
- `DialogClose` - re-export `DialogPrimitive.Close`

**Animation hint:** Since `tailwindcss-animate` is not installed, you can use Tailwind's transition utilities with Radix's `data-[state=open]` / `data-[state=closed]` attributes:
```jsx
// Overlay example
className="transition-opacity duration-200 data-[state=open]:opacity-100 data-[state=closed]:opacity-0"
```

**Example Usage:**
```jsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Resources:**
- [Radix Dialog Docs](https://www.radix-ui.com/docs/primitives/components/dialog) (read this first)
- [Shadcn Dialog Reference](https://ui.shadcn.com/docs/components/dialog) (optional backup)

**Checkpoint:** Add a dialog to `app/page.jsx` and verify open/close, focus trap, and ESC behavior.

### Task 3: Build an Alert Component (30 min)

In this task, you will combine two patterns: CVA variants (Button) + subcomponents (Card).

**File:** `components/ui/alert.jsx` (imports are pre-configured)

This task brings together both patterns you've seen: CVA from Button (variants) and composable subcomponents from Card (`forwardRef` + `cn()`).

**Subcomponents to create:**
- `Alert` - main container with CVA variants
- `AlertTitle` - styled `<h5>` for the alert heading
- `AlertDescription` - styled `<div>` for the alert message

**CVA variants to implement:**
- `default` - neutral style using `bg-background` / `text-foreground`
- `success` - green tones using `border-success/50` / `text-success` / `bg-success/10`
- `destructive` - red tones using `border-destructive/50` / `text-destructive` / `bg-destructive/10`
- `warning` - yellow tones (no design token for this, so use Tailwind's `yellow` directly)

**Example Usage:**
```jsx
<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
</Alert>
```

**Hint:** The Alert container uses `cva()` (like Button) but each subcomponent uses the simpler Card pattern (just `forwardRef` + `cn()`, no variants).

**Checkpoint:** Add one demo per variant to `app/page.jsx` and verify visual consistency.

### Task 4: Build a Form Dialog (45 min)

In this task, you will compose your Dialog and Button into a real feature with validation.

**File:** `components/ui/form-dialog.jsx` (imports are pre-configured, including your Dialog)

**Important:** This file already has `"use client"` at the top because it needs React state (`useState`) for form data and validation. This is required for any component that uses hooks or event handlers in Next.js App Router.

**Requirements:**
- Build on top of your Dialog component from Task 2
- Include form fields:
  - Name (text input)
  - Email (email input)
  - Message (textarea)
- Form validation
  - Required fields
  - Email format validation
  - Show error messages below invalid fields
- Submit and Cancel buttons using your Button variants
- Handle form submission (`console.log` data for now)
- Success state (show confirmation message after submit)
- Reset form when dialog closes

**Input styling hint:**
```jsx
<input
  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  placeholder="Your name"
/>
```

**Example Usage:**
```jsx
<FormDialog>
  <DialogTrigger asChild>
    <Button>Contact Us</Button>
  </DialogTrigger>
</FormDialog>
```

**Checkpoint:** Add it to `app/page.jsx`, submit valid/invalid data, and confirm reset-on-close works.

### Bonus: Create Your Own Component (Optional)

Get creative! Build something that follows the design system principles:

**Ideas:**
- Badge component (small, CVA variants)
- Tooltip (using Radix primitives)
- Accordion component
- Avatar component

**Guidelines:**
- Follow the existing patterns (CVA for variants, `cn()` for class merging)
- Use Radix UI primitives where applicable
- Maintain consistency with existing design tokens
- Ensure accessibility

## Design System Principles

### 1. Consistency
- Use design tokens (CSS variables in `globals.css`)
- Follow naming conventions
- Maintain visual hierarchy

### 2. Reusability
- Build composable components
- Support variants and sizes
- Accept `className` prop for customization

### 3. Accessibility
- Use semantic HTML
- Provide proper ARIA attributes
- Support keyboard navigation
- Ensure focus management

### 4. Developer Experience
- Clean JavaScript code
- Clear component APIs
- Intuitive component patterns

## Utilities

### `cn()` Helper (`lib/utils.js`)

Combines `clsx` and `tailwind-merge` for optimal class merging:

```jsx
import { cn } from "@/lib/utils"

// Merges classes and resolves Tailwind conflicts
cn("px-2 py-1", "px-4") // Result: "py-1 px-4"
```

### CSS Variables (`app/globals.css`)

Design tokens defined as CSS variables:
- `--background`, `--foreground`
- `--primary`, `--secondary`
- `--success`, `--destructive`
- `--border`, `--input`, `--ring`
- `--radius` for border radius

Automatically support light/dark mode via `.dark` class.

## Tips for Success

1. **Start small:** Get one variant working before adding more
2. **Study examples:** Look at Button and Card for patterns
3. **Follow patterns:** Use `forwardRef` and `cn()` consistently
4. **Test frequently:** Check your components in the browser often
5. **Read the docs:** Radix UI docs are excellent resources
6. **Ask questions:** Don't hesitate to seek help when stuck

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/docs/primitives)
- [Shadcn/UI Components](https://ui.shadcn.com/docs/components)
- [CVA Documentation](https://cva.style/docs)
- [React Documentation](https://react.dev/)

## Troubleshooting

### Styles not applying
- Check if `globals.css` is imported in `layout.jsx`
- Verify Tailwind config includes all content paths
- Clear `.next` cache and rebuild

### Import errors
- Check that your imports match what the component exports
- Restart your development server if StackBlitz gets stuck

### `useState is not a function` error
- Add `"use client"` at the very top of the file (before any imports)
- This is needed for components that use React hooks (`useState`, `useEffect`)
- Note: The Dialog component does NOT need this because Radix handles it internally

## License

MIT - Feel free to use this starter for learning and teaching!
