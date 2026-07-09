import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import type { Faq } from "@/data/faqs";

/**
 * Renders a distributed FAQ block. JSON-LD for these questions is emitted
 * separately at the page level (see each page's faqSchema call) so the schema
 * sits in <head>/body once per page.
 */
export function FaqSection({
  faqs,
  heading = "Frequently Asked Questions",
  eyebrow = "Good to Know",
}: {
  faqs: Faq[];
  heading?: string;
  eyebrow?: string;
}) {
  if (!faqs.length) return null;

  return (
    <section className="section bg-cream" aria-labelledby="faq-heading">
      <div className="container max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="faq-heading" className="mt-3 text-3xl md:text-4xl text-espresso">
            {heading}
          </h2>
          <div className="mx-auto mt-5 hairline" />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
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
