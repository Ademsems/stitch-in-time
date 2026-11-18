import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand logo — official artwork from the brandbook (public/branding).
 *
 * Rules (brandbook): colour logo on LIGHT backgrounds, white logo on DARK
 * backgrounds; never stretched, recoloured, outlined, shadowed or separated.
 * Minimum digital size: 50px tall for the primary lockup. Keep clear space of
 * roughly the height of the "CLOTHING ALTERATIONS" line on every side — callers
 * provide padding. The icon brandmark (the spool) is for places where the
 * primary lockup does not fit, e.g. narrow phones.
 */

const SRC = {
  primary: { dark: "/branding/stitch-in-time-logo.svg", light: "/branding/stitch-in-time-logo-white.svg", ratio: 425 / 64 },
  icon: { dark: "/branding/stitch-in-time-icon.svg", light: "/branding/stitch-in-time-icon-white.svg", ratio: 154 / 108 },
} as const;

interface LogoProps {
  /** "dark" = colour artwork for light backgrounds; "light" = white artwork for dark backgrounds. */
  tone?: "dark" | "light";
  variant?: "primary" | "icon";
  /** Rendered height in px (primary lockup must stay >= 50). */
  height?: number;
  className?: string;
  priority?: boolean;
}

export function LogoImage({
  tone = "dark",
  variant = "primary",
  height = 50,
  className,
  priority,
}: LogoProps) {
  const v = SRC[variant];
  const h = variant === "primary" ? Math.max(height, 50) : height;
  const w = Math.round(h * v.ratio);
  return (
    <Image
      src={tone === "light" ? v.light : v.dark}
      alt="Stitch In Time — Clothing Alterations"
      width={w}
      height={h}
      priority={priority}
      unoptimized
      draggable={false}
      className={cn("block select-none", className)}
      // Width is fixed from the intrinsic ratio; height follows — never stretched.
      style={{ width: w, maxWidth: "100%", height: "auto" }}
    />
  );
}

/** Logo as a home link. Narrow phones swap to the spool icon brandmark. */
export function Logo({
  tone = "dark",
  responsive = false,
  height = 50,
  className,
  priority,
}: LogoProps & { responsive?: boolean }) {
  if (!responsive) {
    return <LogoImage tone={tone} height={height} className={className} priority={priority} />;
  }
  return (
    <>
      <LogoImage
        tone={tone}
        height={height}
        priority={priority}
        className={cn("hidden min-[440px]:block", className)}
      />
      <LogoImage
        tone={tone}
        variant="icon"
        height={48}
        priority={priority}
        className={cn("min-[440px]:hidden", className)}
      />
    </>
  );
}

export function LogoLink(props: LogoProps & { responsive?: boolean }) {
  return (
    <Link href="/" aria-label="Stitch In Time — home" className="inline-flex items-center rounded-sm">
      <Logo {...props} />
    </Link>
  );
}
