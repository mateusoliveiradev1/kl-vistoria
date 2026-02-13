import * as React from "react"
import { cn } from "../../lib/utils"

export function Section({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn("py-20 md:py-32 scroll-mt-20", className)}
      {...props}
    />
  )
}
