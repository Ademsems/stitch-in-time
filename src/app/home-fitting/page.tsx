import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarClock,
  Home as HomeIcon,
  MapPinned,
  MessageCircle,
  Phone,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";
import { RiseHeading } from "@/components/fx/RiseHeading";
import { StripeBand } from "@/components/fx/StripeBand";
import { BookButton } from "@/components/BookButton";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { HowItWorks, type Step } from "@/components/sections/HowItWorks";
import { ClosingCta } from "@/components/sections/HomeSections";
import { faqsFor } from "@/data/faqs";
import { faqSchema, breadcrumbSchema, homeFittingSchema } from "@/lib/jsonld";
import { CONTACT, whatsappLink } from "@/lib/site";
import { resolveImageSrc } from "@/lib/resolveImage";

export const metadata: Metadata = {
  title: { absolute: "Book a Home Fitting Appointment | Stitch In Time Dubai & Abu Dhabi" },
  description:
    "Book a professional tailor to visit your home in Dubai or Abu Dhabi. Expert clothing alterations at your door. No call-out fee. Min order AED 300. Book online now.",
  keywords: [
    "home fitting service Dubai",
    "tailor home visit Dubai",
    "home tailoring service Abu Dhabi",
    "mobile tailor UAE",
  ],
  alternates: { canonical: "/home-fitting" },
  openGraph: {
    title: "Book a Home Fitting Appointment | Stitch In Time Dubai & Abu Dhabi",
    description:
      "Expert tailoring at your door in Dubai and Abu Dhabi. No call-out fee. Minimum order AED 300.",
    url: "/home-fitting",
  },
};

const TRUST = [
  { icon: Wallet, title: "No call-out fee", note: "Minimum order AED 300" },
  { icon: MapPinned, title: "Dubai & Abu Dhabi", note: "All major areas covered" },
  { icon: HomeIcon, title: "At your door", note: "Private fittings at home" },
  { icon: ShieldCheck, title: "Workmanship guaranteed", note: "Same guarantee as in-store" },
];

const SERVICE_STEPS: Step[] = [
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

const BOOKING_STEPS = [
  { t: "Choose Your Emirate", c: "Select whether your appointment is in Dubai, Abu Dhabi, or another emirate. Our home service covers all major areas across both emirates." },
  { t: "Number of Garments", c: "Let us know approximately how many pieces need attention so we can allocate the right amount of time for your visit." },
  { t: "Select a Date & Time", c: "Choose from available slots over the next 7 to 14 days. We will confirm your appointment via WhatsApp shortly after booking." },
  { t: "Tell Us About Your Garments", c: "Select the type of alteration you need — everyday clothing, suits and jackets, evening wear, or other. Add any notes about specific adjustments required." },
  { t: "Tailor Preference", c: "Let us know if you have a preference for a female or male tailor." },
  { t: "Your Details & Address", c: "Enter your name, mobile number, and full home address including building and apartment details. A Google Maps pin can be added to help us find you." },
  { t: "Confirm Your Booking", c: "Review your appointment summary and confirm. You will receive an automated WhatsApp message with your booking reference, visit time, and tailor contact details." },
];

const REASSURANCE = [
  { icon: UserRound, title: "Your tailor preference", copy: "Prefer a female or male tailor? Tell us when you book and we will do our best to accommodate your request." },
  { icon: CalendarClock, title: "On your schedule", copy: "Choose from available slots over the next 7 to 14 days. We recommend booking at least 48 hours in advance." },
  { icon: BadgeCheck, title: "The same standard", copy: "The same precision, the same premium materials and the same workmanship guarantee — in your home or in-store." },
];

export default function HomeFittingPage() {
  const faqs = faqsFor("home-fitting");
  const msg = "Hello Stitch In Time, I'd like to book a home fitting appointment.";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Home Fitting", path: "/home-fitting" },
          ]),
          homeFittingSchema(),
          faqSchema(faqs),
        ]}
      />

      {/* ———— Hero ———— */}
      <section data-theme="dark" className="relative isolate overflow-hidden bg-burgundy text-ivory">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(90%_80%_at_85%_40%,rgb(var(--espresso)/0.6),transparent_65%),radial-gradient(70%_60%_at_0%_100%,rgb(var(--ink)/0.55),transparent_70%)]"
        />
        <div className="container grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
          <div>
            <p className="eyebrow hero-in" style={{ ["--d" as string]: "0.05s" }}>
              Home Fitting Service
            </p>
            <RiseHeading className="mt-5 text-[2.9rem] leading-[1.02] !text-ivory sm:text-6xl lg:text-[5rem]"
            >
              Expert tailoring <em className="italic">at your door.</em>
            </RiseHeading>
            <p
              className="hero-in mt-7 max-w-xl text-lg leading-relaxed text-ivory/90"
              style={{ ["--d" as string]: "0.45s" }}
            >
              Our professional tailors visit you at home for private fittings, precise
              measurements, and expert alterations — delivered with the same quality as in-store,
              at a time that suits your schedule.
            </p>
            <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "0.65s" }}>
              <BookButton label="Book a Home Fitting" variant="onDark" />
              <Button asChild variant="outlineDark" size="lg">
                <a
                  href={whatsappLink(CONTACT.whatsappDubai, msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Ask on WhatsApp
                </a>
              </Button>
            </div>
            <ul
              className="hero-in mt-10 flex flex-wrap gap-x-6 gap-y-2 font-subheader text-[0.64rem] uppercase tracking-wide2 text-sky"
              style={{ ["--d" as string]: "0.85s" }}
            >
              {["No call-out fee", "Dubai & Abu Dhabi", "Min. order AED 300", "Workmanship Guaranteed"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-sky" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-circle mx-auto w-full max-w-[26rem] lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] ring-1 ring-ivory/25">
              <SmartImage
                src={resolveImageSrc("/images/home-fitting/home-fitting-hero.jpg")}
                alt="A Stitch In Time tailor arriving with a garment rail for a private home fitting"
                priority
                label="Home fitting photography"
                tone="espresso"
                sizes="(max-width: 1024px) 90vw, 480px"
              />
            </div>
          </div>
        </div>
        <StripeBand tone="dark" />
      </section>

      {/* ———— Trust signals ———— */}
      <section className="bg-cream">
        <div className="container py-12 md:py-14">
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 0.07} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-burgundy text-ivory">
                  <t.icon className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-serif text-2xl leading-tight text-burgundy">{t.title}</span>
                  <span className="mt-1 block text-sm text-espresso/80">{t.note}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <HowItWorks steps={SERVICE_STEPS} showCta={false} />

      {/* ———— 7-step booking ———— */}
      <section className="section bg-ivory">
        <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="eyebrow">Booking, step by step</p>
            </Reveal>
            <SplitHeading className="mt-4 text-4xl leading-[1.04] md:text-6xl">
              Seven simple steps to <em className="italic">your fitting.</em>
            </SplitHeading>
            <Reveal delay={0.1} className="mt-6 max-w-sm text-base leading-relaxed text-espresso/85">
              Booking takes a few minutes. You will receive an automated WhatsApp confirmation with
              your booking reference, visit time and tailor contact details.
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <BookButton label="Book a Home Fitting" />
            </Reveal>
          </div>

          <ol className="relative space-y-2">
            <span aria-hidden className="stitch-line absolute bottom-6 left-[1.4rem] top-6 border-t-0 border-l-[1.5px] text-burgundy/35" style={{ height: "auto", borderLeftStyle: "dashed" }} />
            {BOOKING_STEPS.map((s, i) => (
              <Reveal as="li" key={s.t} delay={0.04} className="relative flex gap-6 py-5">
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-burgundy font-subheader text-[0.72rem] text-ivory ring-8 ring-ivory">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-[1.7rem] leading-tight">{s.t}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-espresso/85">{s.c}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ———— Reassurance ———— */}
      <section className="section bg-cream">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="eyebrow">What to expect</p>
            </Reveal>
            <SplitHeading className="mt-4 text-4xl leading-[1.05] md:text-6xl">
              Private, precise and <em className="italic">on your terms.</em>
            </SplitHeading>
          </div>
          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {REASSURANCE.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 0.08} className="rounded-md bg-ivory p-8 ring-1 ring-burgundy/10">
                <r.icon className="h-7 w-7 text-burgundy" aria-hidden />
                <h3 className="mt-5 font-serif text-2xl">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/85">{r.copy}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12 text-center text-sm text-espresso/80">
            Prefer to visit us? <Link href="/locations" className="link-stitch text-burgundy">Find your nearest of 11 branches</Link> — walk-ins are always welcome.
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={faqs} heading="Home Fitting — Frequently Asked Questions" eyebrow="Before you book" />

      <ClosingCta heading="Your tailor, at your door.">
        Book your home fitting online, or speak to our team directly — WhatsApp Dubai{" "}
        {CONTACT.whatsappDubaiDisplay}, WhatsApp Abu Dhabi {CONTACT.whatsappAbuDhabiDisplay}, or call{" "}
        <a href={`tel:${CONTACT.generalPhoneDial}`} className="link-stitch inline-flex items-center gap-1">
          <Phone className="h-3.5 w-3.5" aria-hidden />
          {CONTACT.generalPhone}
        </a>
        .
      </ClosingCta>
    </>
  );
}
