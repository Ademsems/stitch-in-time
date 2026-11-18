"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { Logo, LogoImage } from "@/components/Logo";
import { BookButton } from "@/components/BookButton";
import { NAV_LINKS, CONTACT, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Header — colour logo top-left on ivory (brandbook placement), nav + burgundy
 * "Book Appointment" button. On narrow phones the spool icon brandmark replaces
 * the 50px-tall lockup, which would not fit. Mobile menu is a full-screen
 * burgundy overlay (focus-trapped Radix dialog) with the white logo.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ease-silk",
        scrolled
          ? "border-burgundy/10 bg-ivory/[0.97] shadow-[0_10px_40px_-24px_rgb(var(--burgundy)/0.5)]"
          : "border-transparent bg-ivory"
      )}
    >
      <div className="container flex h-[78px] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Stitch In Time — home"
          className="inline-flex items-center rounded-sm py-3"
          data-cursor="Home"
        >
          <Logo responsive priority />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="link-stitch font-subheader text-[0.72rem] uppercase tracking-wide2 text-burgundy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <BookButton label="Book Appointment" size="sm" withIcon={false} />
          </div>

          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex h-12 w-12 items-center justify-center rounded-full text-burgundy transition-colors hover:bg-cream lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Content
                data-theme="dark"
                data-lenis-prevent
                aria-describedby={undefined}
                className="fixed inset-0 z-[140] flex flex-col overflow-y-auto bg-burgundy text-ivory data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
              >
                <LazyMotion features={domAnimation} strict>
                <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
                <div className="container flex h-[78px] shrink-0 items-center justify-between">
                  <Link href="/" aria-label="Stitch In Time — home" className="py-3">
                    <LogoImage tone="light" className="hidden min-[440px]:block" />
                    <LogoImage tone="light" variant="icon" height={48} className="min-[440px]:hidden" />
                  </Link>
                  <DialogPrimitive.Close
                    aria-label="Close menu"
                    className="flex h-12 w-12 items-center justify-center rounded-full text-ivory transition-colors hover:bg-ivory/10"
                  >
                    <X className="h-6 w-6" />
                  </DialogPrimitive.Close>
                </div>

                <div className="container flex flex-1 flex-col justify-between gap-10 pb-10 pt-6">
                  <nav aria-label="Mobile">
                    <ul className="space-y-1">
                      {NAV_LINKS.map((link, i) => (
                        <m.li
                          key={link.href}
                          initial={reduce ? false : { opacity: 0, y: 28 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Link
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className="flex min-h-14 items-baseline gap-4 border-b border-ivory/15 py-2 font-serif text-[2.4rem] leading-none text-ivory"
                          >
                            <span className="font-subheader text-[0.65rem] tracking-luxe text-sky">
                              0{i + 1}
                            </span>
                            <span className={cn(isActive(link.href) && "italic")}>{link.label}</span>
                          </Link>
                        </m.li>
                      ))}
                    </ul>
                  </nav>

                  <m.div
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <BookButton
                      label="Book Appointment"
                      variant="onDark"
                      magnetic={false}
                      className="w-full"
                    />
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-ivory/85">
                      <a
                        href={whatsappLink(CONTACT.whatsappDubai)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp Dubai
                      </a>
                      <a
                        href={whatsappLink(CONTACT.whatsappAbuDhabi)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp Abu Dhabi
                      </a>
                      <a
                        href={`tel:${CONTACT.generalPhoneDial}`}
                        className="inline-flex min-h-11 items-center gap-2"
                      >
                        <Phone className="h-4 w-4" aria-hidden /> {CONTACT.generalPhone}
                      </a>
                    </div>
                  </m.div>
                </div>
                </LazyMotion>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
