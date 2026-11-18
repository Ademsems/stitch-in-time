import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FindBranchButton } from "@/components/FindBranchButton";
import { StripeBand } from "@/components/fx/StripeBand";

export default function NotFound() {
  return (
    <section data-theme="dark" className="relative flex min-h-[72vh] items-center bg-burgundy text-ivory">
      <div className="container max-w-2xl py-24 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-5 text-5xl leading-[1.02] !text-ivory md:text-7xl">
          This thread <em className="italic">came loose.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ivory/85">
          The page you were looking for could not be found. Let us guide you back to something that
          fits.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="onDark">
            <Link href="/">Return Home</Link>
          </Button>
          <FindBranchButton variant="outlineDark" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <StripeBand tone="dark" />
      </div>
    </section>
  );
}
