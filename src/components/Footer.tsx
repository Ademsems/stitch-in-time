import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Instagram, Facebook } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, CONTACT, SITE, whatsappLink } from "@/lib/site";
import { DUBAI_BRANCHES, ABU_DHABI_BRANCHES } from "@/data/branches";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-cream/85">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            Expert clothing alterations, repairs, and home fitting across Dubai
            and Abu Dhabi. Serving the UAE since {SITE.established}.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Stitch In Time on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-cream hover:text-cream"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Stitch In Time on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-cream hover:text-cream"
            >
              <Facebook className="h-4 w-4" />
            </a>
            {/* SOCIAL PLACEHOLDER — swap hrefs for the client's real profiles. */}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <h2 className="font-sans text-xs uppercase tracking-luxe text-cream/50">
            Explore
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Branch summary */}
        <div>
          <h2 className="font-sans text-xs uppercase tracking-luxe text-cream/50">
            11 UAE Locations
          </h2>
          <div className="mt-5 space-y-4 text-sm text-cream/75">
            <div>
              <p className="mb-1 flex items-center gap-1.5 font-medium text-cream/90">
                <MapPin className="h-3.5 w-3.5" /> Dubai — {DUBAI_BRANCHES.length}
              </p>
              <p className="leading-relaxed">
                {DUBAI_BRANCHES.map((b) => b.name).join(" · ")}
              </p>
            </div>
            <div>
              <p className="mb-1 flex items-center gap-1.5 font-medium text-cream/90">
                <MapPin className="h-3.5 w-3.5" /> Abu Dhabi — {ABU_DHABI_BRANCHES.length}
              </p>
              <p className="leading-relaxed">
                {ABU_DHABI_BRANCHES.map((b) => b.name).join(" · ")}
              </p>
            </div>
            <Link
              href="/locations"
              className="inline-block text-cream underline underline-offset-4 hover:text-taupe"
            >
              View all branches &amp; map
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-sans text-xs uppercase tracking-luxe text-cream/50">
            Contact
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink(CONTACT.whatsappDubai)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/80 transition-colors hover:text-cream"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                WhatsApp Dubai — {CONTACT.whatsappDubaiDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(CONTACT.whatsappAbuDhabi)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/80 transition-colors hover:text-cream"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                WhatsApp Abu Dhabi — {CONTACT.whatsappAbuDhabiDisplay}
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT.generalPhoneDial}`}
                className="flex items-center gap-2 text-cream/80 transition-colors hover:text-cream"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {CONTACT.generalPhone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.homeEmail}`}
                className="flex items-center gap-2 text-cream/80 transition-colors hover:text-cream"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {CONTACT.homeEmail}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.embroideryEmail}`}
                className="flex items-center gap-2 text-cream/80 transition-colors hover:text-cream"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {CONTACT.embroideryEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/55 sm:flex-row">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            Website by{" "}
            <span className="text-cream/75">Fekra Communications</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
