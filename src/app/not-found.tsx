import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FindBranchButton } from "@/components/FindBranchButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-cream">
      <div className="container max-w-xl text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 font-serif text-5xl text-espresso md:text-6xl">
          This Thread Came Loose.
        </h1>
        <p className="mt-5 font-sans text-base leading-relaxed text-ink/75">
          The page you were looking for could not be found. Let us guide you back
          to something that fits.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
          <FindBranchButton />
        </div>
      </div>
    </section>
  );
}
