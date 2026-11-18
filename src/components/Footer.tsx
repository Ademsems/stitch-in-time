import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { LogoImage } from "@/components/Logo";
import { StripeBand } from "@/components/fx/StripeBand";
import { NAV_LINKS, CONTACT, SITE, FEKRA, whatsappLink } from "@/lib/site";
import { DUBAI_BRANCHES, ABU_DHABI_BRANCHES } from "@/data/branches";
import { TAGLINE } from "@/lib/brand";

export function Footer() {
  const year = new Date().getFullYear();
  const link =
    "inline-flex min-h-8 items-center gap-2 text-ivory/80 transition-colors hover:text-ivory";

  return (
    <footer data-theme="dark" className="bg-burgundy text-ivory/85">
      <StripeBand tone="dark" />
      <div className="container grid gap-14 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr_1.2fr]">
        {/* Brand */}
        <div>
          <Link href="/" aria-label="Stitch In Time — home" className="inline-block">
            <LogoImage tone="light" />
          </Link>
          <p className="mt-8 max-w-xs font-serif text-3xl leading-[1.1] text-ivory">
            {TAGLINE.lead} <em className="italic">{TAGLINE.accent}</em>
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/70">
            Expert clothing alterations, repairs and home fitting across Dubai and Abu Dhabi.
            Serving the UAE since {SITE.established}.
          </p>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <h2 className="eyebrow !text-sky">Explore</h2>
          <ul className="mt-5 space-y-1.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Branches */}
        <div>
          <h2 className="eyebrow !text-sky">11 UAE Locations</h2>
          <div className="mt-5 space-y-5 text-sm text-ivory/75">
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-ivory">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> Dubai — {DUBAI_BRANCHES.length}
              </p>
              <p className="leading-relaxed">{DUBAI_BRANCHES.map((b) => b.name).join(" · ")}</p>
            </div>
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-ivory">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> Abu Dhabi — {ABU_DHABI_BRANCHES.length}
              </p>
              <p className="leading-relaxed">{ABU_DHABI_BRANCHES.map((b) => b.name).join(" · ")}</p>
            </div>
            <Link href="/locations" className="link-stitch inline-block text-ivory">
              View all branches &amp; map
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="eyebrow !text-sky">Contact</h2>
          <ul className="mt-5 space-y-1.5 text-sm">
            <li>
              <a href={whatsappLink(CONTACT.whatsappDubai)} target="_blank" rel="noopener noreferrer" className={link}>
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                WhatsApp Dubai — {CONTACT.whatsappDubaiDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappLink(CONTACT.whatsappAbuDhabi)} target="_blank" rel="noopener noreferrer" className={link}>
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                WhatsApp Abu Dhabi — {CONTACT.whatsappAbuDhabiDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT.generalPhoneDial}`} className={link}>
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {CONTACT.generalPhone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.homeEmail}`} className={link}>
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {CONTACT.homeEmail}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.embroideryEmail}`} className={link}>
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {CONTACT.embroideryEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/70 sm:flex-row">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            Powered by{" "}
            <a
              href={FEKRA.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-stitch text-ivory"
            >
              {FEKRA.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
