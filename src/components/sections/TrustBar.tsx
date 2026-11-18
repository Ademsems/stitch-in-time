import { Reveal } from "@/components/fx/Reveal";
import { CountUp } from "@/components/fx/CountUp";

/**
 * Trust bar — since 2008 · 18 years · 11 mall locations · Dubai & Abu Dhabi ·
 * Gütermann thread · workmanship guarantee. Numbers count up on entry.
 */
export function TrustBar() {
  const nums = [
    { label: "Since", node: <span>2008</span> },
    {
      label: "Years of expertise",
      node: (
        <span>
          <CountUp to={18} />
        </span>
      ),
    },
    {
      label: "Mall locations",
      node: (
        <span>
          <CountUp to={11} />
        </span>
      ),
    },
  ];
  const words = [
    { top: "Dubai & Abu Dhabi", label: "Home fitting both emirates" },
    { top: "Gütermann", label: "Thread, as standard" },
    { top: "Guaranteed", label: "Workmanship guarantee" },
  ];

  return (
    <section data-thread className="bg-cream" aria-label="Why clients trust Stitch In Time">
      <div className="container py-14 md:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-0">
          {[...nums.map((n) => ({ ...n, kind: "num" as const })), ...words.map((w) => ({ ...w, kind: "word" as const }))].map(
            (item, i) => (
              <Reveal
                key={i}
                delay={i * 0.07}
                className="lg:border-l lg:border-burgundy/20 lg:px-7 lg:first:border-l-0 lg:first:pl-0"
              >
                <dd
                  className={
                    item.kind === "num"
                      ? "font-serif text-6xl leading-none text-burgundy md:text-7xl"
                      : "font-serif text-[1.7rem] leading-tight text-burgundy md:text-3xl"
                  }
                >
                  {"node" in item ? item.node : item.top}
                </dd>
                <dt className="eyebrow mt-3 !text-[0.62rem] leading-relaxed">
                  {item.label}
                </dt>
              </Reveal>
            )
          )}
        </dl>
      </div>
    </section>
  );
}
