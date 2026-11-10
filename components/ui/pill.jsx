import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const pillVariants = cva(
  "inline-flex items-center gap-2 rounded-full whitespace-nowrap font-mono text-sm uppercase text-neutral-900",
  {
    variants: {
      variant: {
        blue: "bg-sky-200",
        yellow: "bg-yellow-300",
        orange: "bg-orange-400",
        green: "bg-emerald-300",
        pink: "bg-pink-200",
        purple: "bg-violet-200",
        lime: "bg-lime-200",
        peach: "bg-orange-200",
        gray: "bg-neutral-100 border border-neutral-200",
        black: "bg-neutral-900 text-white",
      },
      shape: {
        pill: "px-8 py-4",
        circle: "p-4",
      },
    },
    defaultVariants: {
      variant: "gray",
      shape: "pill",
    },
  }
)

const Pill = React.forwardRef(({ className, variant, shape, ...props }, ref) => (
  <span ref={ref} className={cn(pillVariants({ variant, shape }), className)} {...props} />
))
Pill.displayName = "Pill"

export { Pill, pillVariants }