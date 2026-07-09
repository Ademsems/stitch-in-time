"use client";

import * as React from "react";
import { CalendarCheck } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useBooking } from "@/components/BookingProvider";
import { cn } from "@/lib/utils";

/**
 * The one button used for every "Book a Home Fitting" / "Book Appointment" CTA.
 * All instances route through the shared booking handler (see BookingProvider),
 * so swapping the dummy dialog for the real 7jwzat URL is a single change.
 */

interface BookButtonProps extends Omit<ButtonProps, "onClick"> {
  label?: string;
  withIcon?: boolean;
}

export function BookButton({
  label = "Book a Home Fitting",
  withIcon = true,
  className,
  variant = "default",
  size = "lg",
  ...props
}: BookButtonProps) {
  const { openBooking } = useBooking();

  return (
    <Button
      type="button"
      onClick={openBooking}
      variant={variant}
      size={size}
      className={cn(className)}
      {...props}
    >
      {withIcon && <CalendarCheck className="h-4 w-4" aria-hidden />}
      {label}
    </Button>
  );
}
