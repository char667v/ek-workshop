# Design Systems Workshop Starter

A hands-on workshop starter kit for learning to build consistent, accessible, and reusable UI components using modern tools and best practices.

## Tech Stack

- **Next.js 14** (App Router)
- **JavaScript** (vanilla, no TypeScript)
- **Tailwind CSS** for utility-first styling
- **Shadcn/UI** approach (Radix UI primitives + CVA)
- **class-variance-authority** for component variants
- **Radix UI** for accessible primitives

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
/app
  /page.jsx          # Main demo page
  /layout.jsx        # Root layout with fonts
  /globals.css       # Global styles + CSS variables
/components
  /ui
    /button.jsx      # ✅ Pre-built Button component
    /card.jsx        # ✅ Pre-built Card component
    /dialog.jsx      # 🚧 TODO: Workshop task
    /navbar.jsx      # 🚧 TODO: Workshop task
    /form-dialog.jsx # 🚧 TODO: Workshop task
/lib
  /utils.js          # Utility functions (cn helper)
```

## What's Included

### ✅ Pre-built Components

#### Button Component (`components/ui/button.jsx`)
A starter button component using CVA (class-variance-authority) with a single `default` variant:

- **Variants:** `default` (students add more in Task 1)
- **Sizes:** `default`, `sm`, `lg`, `icon`
- Accessible with focus states
- Clean JavaScript implementation using `forwardRef` and `cn()`

**Usage:**
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

**Usage:**
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

### Task 1: Add Button Variants (30 min)

**Goal:** Learn the CVA variant pattern by adding new button styles

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

3. **Test on the home page:**
   - Uncomment the variant demos in `app/page.jsx`
   - Verify each variant renders correctly
   - Try combining variants with different sizes

**Hint:** Check `globals.css` and `tailwind.config.js` to see which design tokens are available (e.g. `success`, `destructive`, `secondary`, `accent`).

### Task 2: Build a Dialog Component (45 min)

**Goal:** Create a modal dialog using Radix UI primitives

**File:** `components/ui/dialog.jsx`

**Requirements:**
- Use `@radix-ui/react-dialog` (already installed)
- Create subcomponents:
  - `Dialog` (root)
  - `DialogTrigger`
  - `DialogContent` (with overlay)
  - `DialogHeader`
  - `DialogTitle`
  - `DialogDescription`
  - `DialogFooter`
  - `DialogClose`
- Style with Tailwind matching the design system
- Add animations (fade in/out for overlay, slide in for content)
- Ensure accessibility (proper ARIA, focus trap, ESC to close)

**Resources:**
- [Radix Dialog Docs](https://www.radix-ui.com/docs/primitives/components/dialog)
- [Shadcn Dialog Reference](https://ui.shadcn.com/docs/components/dialog)

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
      <Button variant="secondary">Cancel</Button>
      <Button variant="danger">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Test it:** Add a dialog to `app/page.jsx` and verify it opens/closes correctly.

### Task 3: Create a Navbar Component (45 min)

**Goal:** Build a responsive navigation bar with dark mode support

**File:** `components/ui/navbar.jsx`

**Requirements:**
- Responsive design
  - Desktop: horizontal layout
  - Mobile: hamburger menu
- Logo/brand section
- Navigation links
- Dark mode toggle button
  - Use `lucide-react` icons (e.g., `Moon`, `Sun`)
  - Toggle the `dark` class on `<html>` element
- Sticky positioning (`sticky top-0`)
- Proper z-index for overlays
- Smooth transitions

**Hints:**
- Use React state for mobile menu: `const [isOpen, setIsOpen] = useState(false)`
- Use `useEffect` or `useState` for theme management
- Store theme preference in `localStorage`

**Example Usage:**
```jsx
<Navbar>
  <NavbarBrand>My App</NavbarBrand>
  <NavbarLinks>
    <NavbarLink href="/">Home</NavbarLink>
    <NavbarLink href="/about">About</NavbarLink>
  </NavbarLinks>
  <DarkModeToggle />
</Navbar>
```

**Test it:** Add the navbar to `app/layout.jsx` and test dark mode toggle.

### Task 4: Build a Form Dialog (45 min)

**Goal:** Combine Dialog with a form for user input

**File:** `components/ui/form-dialog.jsx`

**Requirements:**
- Build on top of your Dialog component
- Include form fields:
  - Name (text input)
  - Email (email input)
  - Message (textarea)
- Form validation
  - Required fields
  - Email format validation
  - Show error messages
- Submit and Cancel buttons with proper variants
- Handle form submission (console.log data for now)
- Success state (show confirmation message)
- Reset form on close

**Hints:**
- Use React state for form data and errors
- Consider using `onSubmit` handler with `e.preventDefault()`
- Style inputs consistently with the design system
- Use your Button component variants for actions

**Example Usage:**
```jsx
<FormDialog>
  <FormDialogTrigger asChild>
    <Button>Contact Us</Button>
  </FormDialogTrigger>
</FormDialog>
```

**Test it:** Add to the home page and verify form validation and submission work.

### Bonus Task: Create Your Own Component (Optional)

Get creative! Build something that follows the design system principles:

**Ideas:**
- Alert/Toast notification component
- Dropdown menu
- Tabs component
- Accordion component
- Badge component
- Avatar component

**Guidelines:**
- Follow the existing patterns (CVA for variants, `cn` for class merging)
- Use Radix UI primitives where applicable
- Maintain consistency with existing components
- Ensure accessibility

## Design System Principles

### 1. Consistency
- Use design tokens (CSS variables in `globals.css`)
- Follow naming conventions
- Maintain visual hierarchy

### 2. Reusability
- Build composable components
- Support variants and sizes
- Accept className prop for customization

### 3. Accessibility
- Use semantic HTML
- Provide proper ARIA attributes
- Support keyboard navigation
- Ensure focus management

### 4. Developer Experience
- Clean JavaScript code
- Clear component APIs
- Intuitive component patterns
- Helpful JSDoc comments

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
3. **Follow patterns:** Use forwardRef and cn() utility consistently
4. **Test frequently:** Check your components in the browser often
5. **Read the docs:** Radix UI docs are excellent resources
6. **Ask questions:** Don't hesitate to seek help when stuck

## Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/docs/primitives)
- [Shadcn/UI Components](https://ui.shadcn.com/docs/components)
- [CVA Documentation](https://cva.style/docs)
- [React Documentation](https://react.dev/)

## Troubleshooting

### Styles not applying
- Check if `globals.css` is imported in `layout.jsx`
- Verify Tailwind config includes all content paths
- Clear `.next` cache: `rm -rf .next` and rebuild

### Import errors
- Run `npm install` to ensure all dependencies are installed
- Check `jsconfig.json` paths are correct
- Restart your development server

### Dark mode not working
- Ensure `dark` class is toggled on `<html>` element
- Check `tailwind.config.js` has `darkMode: ["class"]`
- Verify CSS variables are defined for `.dark` in `globals.css`

## StackBlitz Deployment

This project is fully compatible with StackBlitz:

1. Push code to GitHub
2. Open StackBlitz and import the repository
3. Run `npm install` and `npm run dev`
4. Start building!

Alternatively, you can directly upload the project folder to StackBlitz.

## License

MIT - Feel free to use this starter for learning and teaching!

## Happy Building!

Remember: Good design systems are built iteratively. Start simple, test thoroughly, and refine based on feedback. Focus on making components that are **consistent**, **reusable**, and **accessible**.
