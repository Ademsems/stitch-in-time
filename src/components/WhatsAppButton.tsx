"use client";

import * as React from "react";
import { CONTACT, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Persistent floating WhatsApp button. Expands on hover/focus to let the user
 * choose the Dubai or Abu Dhabi line. Keyboard accessible with aria labelling.
 */

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.712 6.4L3.2 28.8l6.57-1.712a12.74 12.74 0 0 0 6.23 1.6h.005c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8zm0 23.36h-.004a10.55 10.55 0 0 1-5.375-1.472l-.385-.229-3.9 1.017 1.04-3.8-.251-.39a10.53 10.53 0 0 1-1.615-5.606c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.51 1.108 7.52 3.117a10.56 10.56 0 0 1 3.114 7.52c0 5.862-4.77 10.632-10.63 10.632zm5.83-7.96c-.32-.16-1.89-.932-2.183-1.039-.293-.106-.506-.16-.72.16-.213.32-.826 1.039-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.57-1.586-.95-.847-1.59-1.893-1.777-2.213-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.623-.524-.539-.72-.549l-.613-.011c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.306.16.213 2.253 3.44 5.46 4.826.763.33 1.358.527 1.822.674.766.243 1.463.209 2.014.127.614-.092 1.89-.773 2.157-1.52.266-.746.266-1.386.186-1.52-.08-.133-.293-.213-.613-.373z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const message = "Hello Stitch In Time, I have a tailoring enquiry.";

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden">
      <div className="group relative flex flex-col items-end gap-2">
        {/* Expanded choices (revealed on hover/focus-within) */}
        <div className="pointer-events-none flex translate-y-2 flex-col items-end gap-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <a
            href={whatsappLink(CONTACT.whatsappDubai, message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-cream py-2 pl-4 pr-3 text-sm font-medium text-espresso shadow-lg ring-1 ring-espresso/10 transition-colors hover:bg-taupe focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            WhatsApp Dubai
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white">
              <WhatsAppGlyph className="h-4 w-4" />
            </span>
          </a>
          <a
            href={whatsappLink(CONTACT.whatsappAbuDhabi, message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-cream py-2 pl-4 pr-3 text-sm font-medium text-espresso shadow-lg ring-1 ring-espresso/10 transition-colors hover:bg-taupe focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            WhatsApp Abu Dhabi
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white">
              <WhatsAppGlyph className="h-4 w-4" />
            </span>
          </a>
        </div>

        {/* Primary trigger */}
        <button
          type="button"
          aria-label="Contact us on WhatsApp"
          aria-haspopup="true"
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          <WhatsAppGlyph className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}
