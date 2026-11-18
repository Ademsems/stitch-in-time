import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/site";
import { BookingProvider } from "@/components/BookingProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/fx/BackToTop";
import { Cursor } from "@/components/fx/Cursor";
import { Intro } from "@/components/fx/Intro";
import { MotionObservers } from "@/components/fx/MotionObservers";
import { RouteCurtain } from "@/components/fx/RouteCurtain";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/jsonld";

/**
 * Type system (brandbook):
 *  • Headers   — Cormorant Garamond Regular (400) + Italic (400) for one accent word.
 *  • Subheader — Avenir Heavy, ALL CAPS (eyebrows, buttons). Self-hosted woff2.
 *  • Body      — Avenir Roman. Self-hosted woff2.
 * Both Avenir files are extracted from the client's Avenir.ttc.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const avenirBody = localFont({
  src: "../../public/fonts/avenir-roman.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-body",
  display: "swap",
});

const avenirSubheader = localFont({
  src: "../../public/fonts/avenir-heavy.woff2",
  weight: "900",
  style: "normal",
  variable: "--font-subheader",
  display: "swap",
});

/** Runs before first paint: flags JS-driven animation + first-visit intro. */
const BOOT_SCRIPT = `try{var d=document.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;d.classList.add('js-anim');if(rm)d.classList.add('rm');else if(!sessionStorage.getItem('sit-intro'))d.classList.add('has-intro','intro-seq')}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Stitch In Time | Expert Clothing Alterations in Dubai & Abu Dhabi",
    template: "%s | Stitch In Time",
  },
  description:
    "Professional clothing alterations, repairs, and home fitting service across 11 UAE mall locations. Trusted by Dubai and Abu Dhabi residents since 2008. Book your fitting online today.",
  applicationName: SITE.name,
  authors: [{ name: "Fekra Communications" }],
  keywords: [
    "clothing alterations Dubai",
    "tailor Dubai",
    "home fitting service Dubai",
    "alterations Abu Dhabi",
    "tailoring UAE",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: "Stitch In Time | Expert Clothing Alterations in Dubai & Abu Dhabi",
    description:
      "Professional clothing alterations, repairs, and home fitting across 11 UAE mall locations. Serving Dubai and Abu Dhabi since 2008.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Stitch In Time — expert clothing alterations in Dubai and Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stitch In Time | Expert Clothing Alterations in Dubai & Abu Dhabi",
    description:
      "Professional clothing alterations, repairs, and home fitting across 11 UAE mall locations.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${avenirBody.variable} ${avenirSubheader.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-ivory font-sans text-espresso">
        <JsonLd data={organizationSchema()} />
        <BookingProvider>
          <a
            href="#main"
            className="sr-only z-[200] rounded-sm bg-burgundy px-4 py-3 font-subheader text-xs uppercase tracking-wide2 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <SmoothScroll />
          <MotionObservers />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
          <Cursor />
          <RouteCurtain />
          <Intro />
        </BookingProvider>
      </body>
    </html>
  );
}
