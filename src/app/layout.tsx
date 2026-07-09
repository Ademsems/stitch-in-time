import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { BookingProvider } from "@/components/BookingProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/jsonld";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

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
        url: "/placeholders/og-default.svg",
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
    images: ["/placeholders/og-default.svg"],
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
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <JsonLd data={organizationSchema()} />
        <BookingProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </BookingProvider>
      </body>
    </html>
  );
}
