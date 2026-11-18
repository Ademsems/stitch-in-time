import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { StoryPillars } from "@/components/sections/StoryPillars";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { HowItWorks, type Step } from "@/components/sections/HowItWorks";
import { Values } from "@/components/sections/Values";
import {
  GuaranteeSection,
  MaterialsMarquee,
  LocationsTeaser,
  Testimonials,
  ClosingCta,
} from "@/components/sections/HomeSections";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PageThread } from "@/components/fx/PageThread";
import { faqsFor } from "@/data/faqs";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
import { resolveImageSrc } from "@/lib/resolveImage";
import { showcaseItems } from "@/lib/showcase";

export const metadata: Metadata = {
  title: "Stitch In Time | Expert Clothing Alterations in Dubai & Abu Dhabi",
  description:
    "Professional clothing alterations, repairs, and home fitting service across 11 UAE mall locations. Trusted by Dubai and Abu Dhabi residents since 2008. Book your fitting online today.",
  alternates: { canonical: "/" },
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Book Your Appointment",
    copy: "Choose a date, time, and location that works for you. Dubai and Abu Dhabi covered.",
  },
  {
    n: "02",
    title: "We Come to You",
    copy: "A professional tailor visits your home for private fittings and precise measurements.",
  },
  {
    n: "03",
    title: "We Alter Your Garments",
    copy: "Your clothing is expertly tailored in our workshop to the highest standard.",
  },
  {
    n: "04",
    title: "Perfect Fit, Delivered",
    copy: "Your garments are returned at an agreed date and time, ready to wear.",
  },
];

export default function HomePage() {
  const faqs = faqsFor("home");

  return (
    <div className="relative">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          ...serviceSchema(),
          faqSchema(faqs),
        ]}
      />
      <PageThread />

      <Hero imageSrc={resolveImageSrc("/images/home/home-hero.jpg")} />
      <TrustBar />
      <StoryPillars />
      <ServicesShowcase items={showcaseItems()} />
      <HowItWorks steps={STEPS} />
      <Values />
      <GuaranteeSection />
      <MaterialsMarquee />
      <Testimonials />
      <LocationsTeaser />
      <FaqSection faqs={faqs} heading="Home Fitting — Questions & Answers" eyebrow="Home Fitting" tone="cream" />
      <ClosingCta />
    </div>
  );
}
