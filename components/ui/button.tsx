import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/40',
        outline:
          'border border-border bg-background/60 shadow-xs backdrop-blur-sm hover:bg-accent/10 hover:text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent/10 hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        /* --- 项目扩展：科技感 CTA --- */
        gradient:
          'bg-[linear-gradient(110deg,var(--brand-from),var(--brand-via)_45%,var(--brand-to))] bg-[length:200%_auto] font-semibold text-white shadow-[0_0_28px_-8px_var(--brand-via)] transition-[background-position,box-shadow] duration-500 hover:bg-[position:100%_50%] hover:shadow-[0_0_38px_-6px_var(--brand-via)]',
        glow: 'border border-primary/40 bg-primary/10 text-primary backdrop-blur-sm hover:bg-primary/20 hover:shadow-[0_0_24px_-8px_var(--primary)]',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-11 rounded-lg px-6 text-[0.9375rem] has-[>svg]:px-5',
        xl: 'h-13 rounded-xl px-8 text-base has-[>svg]:px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
