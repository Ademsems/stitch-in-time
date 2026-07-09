import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * SmartImage — a safe wrapper around next/image for a site whose real
 * photography has not been shot yet.
 *
 * • When `src` is a real, non-empty string it renders next/image normally.
 * • When `src` is missing/empty/null it renders a tasteful branded placeholder
 *   (never a broken image, never undefined passed into next/image — the #1
 *   next/image crash).
 * • Swapping in a real photo later is a one-prop change: pass `src`.
 *
 * The placeholder is rendered as styled markup (no network request), so it can
 * never 404. A static SVG also lives in /public/placeholders for OG/social use.
 */

interface SmartImageProps {
  src?: string | null;
  alt: string;
  /** Fill the positioned parent (parent must be relative + sized). */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Wrapper className (aspect ratio, rounding, etc.). */
  wrapperClassName?: string;
  /** Small caption shown on the placeholder. */
  label?: string;
  /** Monogram shown on the placeholder. */
  monogram?: string;
}

function isUsableSrc(src?: string | null): src is string {
  return typeof src === "string" && src.trim().length > 0;
}

export function SmartImage({
  src,
  alt,
  fill = true,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  className,
  wrapperClassName,
  label = "Image coming soon",
  monogram = "SiT",
}: SmartImageProps) {
  if (isUsableSrc(src)) {
    if (fill) {
      return (
        <div className={cn("relative overflow-hidden", wrapperClassName)}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn("object-cover", className)}
          />
        </div>
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={width ?? 1200}
        height={height ?? 800}
        priority={priority}
        className={cn("h-auto w-full object-cover", className)}
      />
    );
  }

  // —— Branded placeholder (deliberate, never broken) ——
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-espresso",
        !fill && "aspect-[3/2] w-full",
        fill && "h-full w-full",
        wrapperClassName,
        className
      )}
    >
      {/* Warm taupe→espresso wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-taupe/40 via-espresso to-espresso" />
      {/* Subtle hairline frame */}
      <div className="absolute inset-3 border border-cream/20" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="font-serif text-4xl tracking-wide text-cream/90 md:text-5xl">
          {monogram}
        </span>
        <span className="h-px w-10 bg-cream/40" aria-hidden />
        <span className="font-subheader text-[0.65rem] uppercase tracking-luxe text-cream/60">
          {label}
        </span>
      </div>
    </div>
  );
}
