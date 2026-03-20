import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Dialog Component - Workshop Task
 *
 * Task 2: Build a reusable modal dialog using Radix UI primitives.
 *
 * First step: open the Radix Dialog docs and copy their primitive structure.
 * Docs: https://www.radix-ui.com/docs/primitives/components/dialog
 *
 * Keep it simple:
 * 1) Copy the Radix primitive structure
 * 2) Wrap it in your own components
 * 3) Add Tailwind classes
 *
 * Radix handles accessibility (focus trap, ESC to close, ARIA) automatically.
 * Your job is to create styled wrapper subcomponents.
 *
 * Subcomponents to create:
 * - Dialog           → re-export DialogPrimitive.Root
 * - DialogTrigger    → re-export DialogPrimitive.Trigger
 * - DialogPortal     → re-export DialogPrimitive.Portal
 * - DialogOverlay    → styled DialogPrimitive.Overlay (dark backdrop with fade)
 * - DialogContent    → styled DialogPrimitive.Content (centered panel, uses Portal + Overlay)
 * - DialogHeader     → plain <div> wrapper for title + description layout
 * - DialogTitle      → styled DialogPrimitive.Title
 * - DialogDescription → styled DialogPrimitive.Description
 * - DialogFooter     → plain <div> wrapper for action buttons
 * - DialogClose      → re-export DialogPrimitive.Close (optional close button)
 *
 * Pattern: Follow the Card component pattern.
 * Each subcomponent uses React.forwardRef + cn() for class merging.
 *
 * Styling hints:
 *   Overlay: "fixed inset-0 z-50 bg-black/80"
 *   Content: "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]
 *             w-full max-w-lg bg-background p-6 rounded-lg border shadow-lg"
 *   Header:  "flex flex-col space-y-1.5 text-center sm:text-left"
 *   Footer:  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
 *   Title:   "text-lg font-semibold leading-none tracking-tight"
 *   Description: "text-sm text-muted-foreground"
 *
 * Close button hint: Use the <X /> icon (imported above) inside DialogPrimitive.Close,
 *   positioned absolute in the top-right corner of DialogContent.
 *
 * Animation hint (optional):
 *   Since tailwindcss-animate is not installed, use inline Tailwind transitions:
 *   Overlay: "transition-opacity duration-200 data-[state=open]:opacity-100 data-[state=closed]:opacity-0"
 *   Content: "transition-all duration-200 data-[state=open]:opacity-100 data-[state=closed]:opacity-0"
 *
 * Example usage:
 *   <Dialog>
 *     <DialogTrigger asChild>
 *       <Button>Open Dialog</Button>
 *     </DialogTrigger>
 *     <DialogContent>
 *       <DialogHeader>
 *         <DialogTitle>Are you sure?</DialogTitle>
 *         <DialogDescription>This action cannot be undone.</DialogDescription>
 *       </DialogHeader>
 *       <DialogFooter>
 *         <Button variant="outline">Cancel</Button>
 *         <Button>Confirm</Button>
 *       </DialogFooter>
 *     </DialogContent>
 *   </Dialog>
 *
 * Checkpoint:
 * - Add a demo in app/page.jsx
 * - Verify open/close, ESC close, and focus behavior
 */

export {}
