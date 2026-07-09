import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

/** Secondary CTA used alongside "Book" — routes to the Locations page. */
export function FindBranchButton({
  label = "Find Your Nearest Branch",
  variant = "outline",
  size = "lg",
  withIcon = true,
}: {
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  withIcon?: boolean;
}) {
  return (
    <Button asChild variant={variant} size={size}>
      <Link href="/locations">
        {withIcon && <MapPin className="h-4 w-4" aria-hidden />}
        {label}
      </Link>
    </Button>
  );
}
