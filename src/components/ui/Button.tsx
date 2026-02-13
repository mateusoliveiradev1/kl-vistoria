import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

// Note: You would typically install class-variance-authority and @radix-ui/react-slot
// But for this simple project, I'll inline a simpler version or just use cn.
// Let's stick to a simpler implementation without extra heavy deps if possible, 
// but for "Masterpiece" quality, CVA is standard. I'll simulate CVA behavior with simple objects/functions 
// to avoid too many small installs, OR I'll just install them. 
// Let's install them for true professional quality.

// Installing class-variance-authority and @radix-ui/react-slot is recommended for professional UI libs.
// I will assume for now I can just write standard Tailwind components.

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95";
    
    const variants = {
      primary: "bg-secondary text-white hover:bg-red-700 shadow-lg shadow-red-900/20 hover:shadow-red-900/40",
      secondary: "bg-white text-primary hover:bg-gray-100 border border-transparent",
      outline: "border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-12 px-8 text-base",
      lg: "h-14 px-10 text-lg",
    };

    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
