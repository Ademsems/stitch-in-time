import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Buttons — Avenir Heavy, ALL CAPS, generous tracking (brandbook).
 * Every variant has a colour-fill SWEEP on hover/focus, implemented with a
 * background-size transition so it also works with `asChild` links.
 */
const buttonVariants = cva(
  [
    "relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-sm",
    "font-subheader text-[0.74rem] uppercase tracking-wide2",
    "bg-no-repeat [background-position:left_center] [background-size:0%_100%]",
    "hover:[background-size:100%_100%] focus-visible:[background-size:100%_100%]",
    "transition-[background-size,color,border-color,box-shadow] duration-500 ease-silk",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary on light surfaces — burgundy, sweeps to ink.
        default:
          "bg-burgundy text-ivory [background-image:linear-gradient(rgb(var(--ink)),rgb(var(--ink)))] shadow-[0_10px_30px_-14px_rgb(var(--burgundy)/0.8)]",
        // Primary on dark surfaces — ivory, sweeps to sky (burgundy text stays AA).
        onDark:
          "bg-ivory text-burgundy [background-image:linear-gradient(rgb(var(--sky)),rgb(var(--sky)))]",
        // Burgundy outline — burgundy fill sweeps in.
        outline:
          "border border-burgundy text-burgundy [background-image:linear-gradient(rgb(var(--burgundy)),rgb(var(--burgundy)))] hover:text-ivory focus-visible:text-ivory",
        outlineDark:
          "border border-ivory/60 text-ivory [background-image:linear-gradient(rgb(var(--ivory)),rgb(var(--ivory)))] hover:text-burgundy focus-visible:text-burgundy",
        ghost: "text-burgundy hover:bg-cream",
        link: "text-burgundy underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6",
        lg: "h-14 px-8 text-[0.78rem]",
        sm: "h-11 px-5",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
