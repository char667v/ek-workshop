"use client"

import * as React from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Form Dialog Component - Workshop Task
 *
 * Task 4: Build a dialog with a contact form inside.
 * This combines your Dialog component (Task 2) with form state management.
 *
 * You are now composing multiple reusable pieces into a realistic feature.
 *
 * NOTE: This file uses "use client" because it needs React state (useState)
 * for form data, validation, and submission handling.
 *
 * Requirements:
 * - Build on top of your Dialog component (imported above)
 * - Form fields: name (text), email (email), message (textarea)
 * - Validation: required fields, email format check
 * - Show error messages below invalid fields
 * - Handle submit (console.log the form data)
 * - Show a success message after submission
 * - Reset form when dialog closes (use Dialog's onOpenChange prop)
 *
 * Input styling hint:
 *   "flex w-full rounded-md border border-input bg-background px-3 py-2
 *    text-sm placeholder:text-muted-foreground focus-visible:outline-none
 *    focus-visible:ring-2 focus-visible:ring-ring"
 *
 * Label styling hint:
 *   "text-sm font-medium leading-none"
 *
 * Error message hint:
 *   "text-xs text-destructive mt-1"
 *
 * State management hints:
 *   const [formData, setFormData] = React.useState({ name: "", email: "", message: "" })
 *   const [errors, setErrors] = React.useState({})
 *   const [submitted, setSubmitted] = React.useState(false)
 *
 * Example usage:
 *   <FormDialog>
 *     <DialogTrigger asChild>
 *       <Button>Contact Us</Button>
 *     </DialogTrigger>
 *   </FormDialog>
 *
 * Checkpoint:
 * - Invalid form data shows errors
 * - Valid submit logs data and shows success state
 * - Closing and reopening resets the form
 */

export {}
