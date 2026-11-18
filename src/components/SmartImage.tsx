"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * SmartImage — safe wrapper around next/image.
 *
 *  • Real, non-empty `src` → next/image (object-cover).
 *  • Missing/empty `src`, OR the file fails to load → a branded placeholder
 *    (never a broken image, never `undefined` into next/image).
 *
 * Pages pass `resolveImageSrc("/images/...")` so a slot already points at its
 * final path; dropping the file in the folder makes it appear.
 */

interface SmartImageProps {
  src?: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  wrapperClassName?: string;
  label?: string;
  /** Placeholder palette. */
  tone?: "burgundy" | "espresso" | "cream";
}

const usable = (src?: string | null): src is string =>
  typeof src === "string" && src.trim().length > 0;

const TONES = {
  burgundy: "bg-burgundy text-ivory",
  espresso: "bg-espresso text-ivory",
  cream: "bg-cream text-burgundy",
} as const;

function Placeholder({
  alt,
  label,
  tone,
  className,
}: {
  alt: string;
  label: string;
  tone: keyof typeof TONES;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        TONES[tone],
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, currentColor 0 1px, transparent 1px 9px)",
        }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-6 flex flex-col gap-[3px]">
        <span className="block h-[6px] w-full bg-sky/90" />
        <span className="block h-[2px] w-full bg-current opacity-70" />
        <span className="block h-[6px] w-full bg-sky/90" />
      </div>
      <div className="relative flex flex-col items-center gap-3 px-6 pb-8 text-center">
        <svg viewBox="0 0 20 24" className="h-12 w-10 opacity-90" aria-hidden>
          <path
            fill="currentColor"
            d="M2 1h16v3h-3.2c-.6 0-.8.3-.8.9v14.2c0 .6.2.9.8.9H18v3H2v-3h3.2c.6 0 .8-.3.8-.9V4.9c0-.6-.2-.9-.8-.9H2z"
          />
        </svg>
        <span className="font-subheader text-[0.62rem] uppercase tracking-luxe opacity-75">
          {label}
        </span>
      </div>
    </div>
  );
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
  tone = "burgundy",
}: SmartImageProps) {
  const [failed, setFailed] = React.useState(false);

  if (!usable(src) || failed) {
    return (
      <Placeholder
        alt={alt}
        label={label}
        tone={tone}
        className={cn(!fill && "aspect-[3/2]", wrapperClassName)}
      />
    );
  }

  if (fill) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", wrapperClassName)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
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
      onError={() => setFailed(true)}
      className={cn("h-auto w-full object-cover", className)}
    />
  );
}
