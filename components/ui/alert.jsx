import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Alert Component - Workshop Task
 *
 * Task 3: Build an Alert component that combines CVA variants (like Button)
 * with composable subcomponents (like Card).
 *
 * You are practicing two design system patterns in one component:
 * - API flexibility through variants
 * - composition through small subcomponents
 *
 * Subcomponents to create:
 * - Alert            → main container with CVA variants
 * - AlertTitle       → styled <h5> for the alert heading
 * - AlertDescription → styled <div> for the alert message
 *
 * CVA variants to add:
 *   default:     "bg-background text-foreground border-border"
 *   success:     "border-success/50 text-success bg-success/10"
 *   destructive: "border-destructive/50 text-destructive bg-destructive/10"
 *   warning:     "border-yellow-500/50 text-yellow-700 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950"
 *
 * Base classes hint: "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4"
 *
 * AlertTitle hint:   "mb-1 font-medium leading-none tracking-tight"
 * AlertDescription:  "text-sm [&_p]:leading-relaxed"
 *
 * Pattern: Use the same React.forwardRef + cn() pattern as Card.
 * For the Alert container, use cva() like Button to define variants.
 *
 * Example usage:
 *   <Alert variant="success">
 *     <AlertTitle>Success!</AlertTitle>
 *     <AlertDescription>Your changes have been saved.</AlertDescription>
 *   </Alert>
 *
 *   <Alert variant="destructive">
 *     <AlertTitle>Error</AlertTitle>
 *     <AlertDescription>Something went wrong. Please try again.</AlertDescription>
 *   </Alert>
 *
 *   <Alert variant="warning">
 *     <AlertTitle>Warning</AlertTitle>
 *     <AlertDescription>This action cannot be undone.</AlertDescription>
 *   </Alert>
 *
 * Checkpoint:
 * - Add one demo per variant in app/page.jsx
 * - Confirm spacing, typography, and colors are consistent
 */


const alertVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
    {
      variants: {
        variant: {
          default: "bg-background text-foreground border-border",
          success: "border-success/50 text-success bg-success/10",
          destructive: "border-destructive/50 text-destructive bg-destructive/10",
          warning: "border-yellow-500/50 text-yellow-700 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  )
  
  const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  ))
  Alert.displayName = "Alert"
  
  const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  ))
  AlertTitle.displayName = "AlertTitle"
  
  const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  ))
  AlertDescription.displayName = "AlertDescription"
  
  export { Alert, AlertTitle, AlertDescription }

export {}
