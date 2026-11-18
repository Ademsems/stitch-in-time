import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";
import { SmartImage } from "@/components/SmartImage";
import { resolveImageSrc } from "@/lib/resolveImage";
import { PILLARS } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function PillarCircles({ className }: { className?: string }) {
  return (
        <ul className={cn("grid grid-cols-2 gap-x-5 gap-y-12 lg:mt-20 lg:grid-cols-4 lg:gap-x-8", className)}>
          {PILLARS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.09} className="group">
              <div
                data-cursor="Explore"
                className="relative aspect-square overflow-hidden rounded-full ring-1 ring-burgundy/20 transition-all duration-700 ease-silk group-hover:ring-4 group-hover:ring-sky/70"
              >
                <SmartImage
                  src={resolveImageSrc(p.image)}
                  alt={p.alt}
                  sizes="(max-width: 1024px) 45vw, 280px"
                  label={p.title}
                  tone={i % 2 ? "espresso" : "burgundy"}
                  className="transition-transform [transition-duration:1400ms] ease-silk group-hover:scale-110"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-burgundy/75 via-burgundy/25 to-transparent"
                />
                <h3 className="absolute inset-x-0 bottom-[26%] px-4 text-center font-subheader text-[0.66rem] uppercase leading-snug tracking-luxe !text-ivory sm:text-[0.72rem]">
                  {p.title}
                </h3>
              </div>
              <p className="mx-auto mt-5 max-w-[17rem] text-center text-sm leading-relaxed text-espresso/80">
                {p.copy}
              </p>
            </Reveal>
          ))}
        </ul>
  );
}

/**
 * Short brand story + the four pillars as circular image masks (the circle is
 * a brandbook motif). Labels sit inside the circles, as on the brandbook page.
 */
export function StoryPillars() {
  return (
    <section data-thread className="section bg-ivory">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Our Craft</p>
            </Reveal>
            <SplitHeading className="mt-4 text-4xl leading-[1.04] md:text-6xl">
              Great clothing starts with a <em className="italic">great fit.</em>
            </SplitHeading>
          </div>
          <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-espresso/90">
            <p>
              At Stitch In Time, we believe that great clothing starts with a great fit. Since
              2008, we have helped thousands of clients across the UAE look and feel their very
              best — from everyday alterations to bridal fittings, luxury garment care, and
              corporate uniform services.
            </p>
            <p>
              Our skilled tailors operate across 11 mall boutiques in Dubai and Abu Dhabi, and
              come directly to your door through our home fitting service — offering the same
              precision, the same premium materials, and the same guarantee, whether in-store or
              in your home.
            </p>
            <p>
              Every garment we touch is handled with care, craftsmanship, and a genuine commitment
              to quality. We use professional-grade materials, including Gütermann thread — one
              of the world&rsquo;s most trusted names in garment finishing — because the details
              matter.
            </p>
          </Reveal>
        </div>

        <PillarCircles className="mt-16 lg:mt-20" />
      </div>
    </section>
  );
}
