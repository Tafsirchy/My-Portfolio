import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-primary-600 text-white hover:bg-primary-700",
      outline: "border border-primary-600 text-primary-600 hover:bg-primary-50",
      ghost: "hover:bg-gray-100 text-gray-700",
      link: "text-primary-600 underline-offset-4 hover:underline",
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
