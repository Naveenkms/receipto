import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const fallbackTextVariants = cva("font-semibold text-2xl text-center", {
  variants: {
    variant: {
      default: "text-current",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function FallbackText({
  asChild,
  variant,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof fallbackTextVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(fallbackTextVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default FallbackText;
