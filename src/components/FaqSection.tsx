import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";
import type { Faq } from "@/data/faqs";

/**
 * Distributed FAQ block. JSON-LD for these questions is emitted at page level
 * (each page's faqSchema call), once per page.
 */
export function FaqSection({
  faqs,
  heading = "Frequently Asked Questions",
  eyebrow = "Good to Know",
  tone = "ivory",
}: {
  faqs: Faq[];
  heading?: string;
  eyebrow?: string;
  tone?: "ivory" | "cream";
}) {
  if (!faqs.length) return null;

  return (
    <section
      className={tone === "cream" ? "section bg-cream" : "section bg-ivory"}
      aria-labelledby="faq-heading"
    >
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">{eyebrow}</p>
          <SplitHeading id="faq-heading" className="mt-4 text-4xl leading-[1.05] md:text-5xl">
            {heading}
          </SplitHeading>
          <div className="stitch-line mt-8 w-24 text-burgundy/50" aria-hidden />
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
