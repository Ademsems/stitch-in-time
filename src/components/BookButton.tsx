"use client";

import * as React from "react";
import { CalendarCheck } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useBooking } from "@/components/BookingProvider";
import { Magnetic } from "@/components/fx/Magnetic";

/**
 * The one button used for every "Book" CTA. All instances route through the
 * shared booking handler (BookingProvider), so swapping the "coming soon"
 * dialog for the real 7jwzat URL is a single change in src/lib/site.ts.
 */

interface BookButtonProps extends Omit<ButtonProps, "onClick"> {
  label?: string;
  withIcon?: boolean;
  magnetic?: boolean;
}

export function BookButton({
  label = "Book a Home Fitting",
  withIcon = true,
  magnetic = true,
  variant = "default",
  size = "lg",
  ...props
}: BookButtonProps) {
  const { openBooking } = useBooking();

  const button = (
    <Button
      type="button"
      onClick={openBooking}
      variant={variant}
      size={size}
      data-cursor="Book"
      {...props}
    >
      {withIcon && <CalendarCheck className="h-4 w-4" aria-hidden />}
      {label}
    </Button>
  );

  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}
