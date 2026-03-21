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
export function FormDialog({ children }) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = React.useState({})
  const [submitted, setSubmitted] = React.useState(false)

  function resetForm() {
    setFormData({ name: "", email: "", message: "" })
    setErrors({})
    setSubmitted(false)
  }

  function validate() {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address"
    }
    if (!formData.message.trim()) newErrors.message = "Message is required"
    return newErrors
  }

  function handleSubmit() {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) resetForm()
    }}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>Fill in the form below and we'll get back to you.</DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center space-y-2">
            <p className="text-lg font-medium text-success">Message sent!</p>
            <p className="text-sm text-muted-foreground">Thanks for reaching out. We'll be in touch soon.</p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none">Name</label>
              <input
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none">Email</label>
              <input
                type="email"
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none">Message</label>
              <textarea
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[100px]"
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
          </div>
        )}

        <DialogFooter>
          {submitted ? (
            <Button onClick={() => setOpen(false)}>Close</Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export {}
