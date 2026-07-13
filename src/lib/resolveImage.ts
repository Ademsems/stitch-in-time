import { existsSync } from "fs";
import { join } from "path";

/**
 * Server-only helper — called in Server Components (page.tsx etc.) to wire
 * SmartImage src to its final intended path.
 *
 * Returns the public path string if the file exists on disk, or null if it
 * hasn't been uploaded yet. SmartImage renders a branded placeholder on null,
 * so the page never shows a broken image or 404.
 *
 * Usage: <SmartImage src={resolveImageSrc("/images/home/home-hero.jpg")} />
 * Drop the file at public/images/home/home-hero.jpg and rebuild → it appears.
 */
export function resolveImageSrc(publicPath: string): string | null {
  const fsPath = join(process.cwd(), "public", publicPath);
  return existsSync(fsPath) ? publicPath : null;
}
