import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * PLACEHOLDER — swap with final logo SVG once approved.
 *
 * Typographic wordmark standing in for the final logo: "STITCH IN TIME" set in
 * Cormorant Garamond with a tracked-out "CLOTHING ALTERATIONS" descriptor.
 * Designed to read as intentional and complete for client review. When the
 * final artwork lands, replace the inner markup with the SVG — the layout,
 * link, and sizing props stay the same.
 */

interface LogoProps {
  /** Colour scheme: "dark" for light backgrounds, "light" for espresso sections. */
  tone?: "dark" | "light";
  className?: string;
  /** Render as a link to the homepage (default) or plain markup. */
  asLink?: boolean;
}

export function Logo({ tone = "dark", className, asLink = true }: LogoProps) {
  const isLight = tone === "light";

  const content = (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-serif text-2xl font-semibold tracking-tight md:text-[1.75rem]",
          isLight ? "text-cream" : "text-espresso"
        )}
      >
        STITCH IN TIME
      </span>
      <span
        className={cn(
          "mt-1 font-sans text-[0.5rem] uppercase tracking-luxe md:text-[0.6rem]",
          isLight ? "text-cream/70" : "text-burgundy"
        )}
      >
        Clothing Alterations
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link
      href="/"
      aria-label="Stitch In Time — home"
      className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {content}
    </Link>
  );
}
