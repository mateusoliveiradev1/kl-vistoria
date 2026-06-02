import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";
    
    const variants = {
      primary: "bg-secondary text-[#06140a] hover:bg-[#4ee184] shadow-lg shadow-emerald-950/30",
      secondary: "bg-primary text-white hover:bg-blue-700 border border-transparent",
      outline: "border border-white/20 bg-white/[0.04] text-white hover:border-primary/70 hover:bg-primary/10 backdrop-blur-sm",
      ghost: "text-white hover:text-primary hover:bg-white/[0.04]",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-12 px-7 text-base",
      lg: "h-14 px-8 text-base sm:text-lg",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Comp = asChild ? Slot : (motion.button as any)

    return (
      <Comp
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
