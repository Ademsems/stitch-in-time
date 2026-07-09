"use client";

import * as React from "react";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  BOOKING_ENABLED,
  BOOKING_URL,
  CONTACT,
  whatsappLink,
} from "@/lib/site";

/**
 * Centralised booking behaviour for EVERY "Book" CTA across the site.
 *
 * Today: opens an on-brand "Booking coming soon" dialog (no navigation, no
 * error). Later: set BOOKING_ENABLED = true and BOOKING_URL to the client's
 * 7jwzat page in src/lib/site.ts — every CTA then opens that URL in a new tab.
 * This is the single swap point; no CTA call sites need editing.
 */

interface BookingContextValue {
  openBooking: () => void;
}

const BookingContext = React.createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const ctx = React.useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within <BookingProvider>");
  }
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  const openBooking = React.useCallback(() => {
    if (BOOKING_ENABLED && BOOKING_URL) {
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
      return;
    }
    setOpen(true);
  }, []);

  const bookingMessage =
    "Hello Stitch In Time, I'd like to book a home fitting appointment.";

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <span className="eyebrow mb-1">Online Booking</span>
            <DialogTitle className="flex items-center gap-2">
              <CalendarCheck className="h-6 w-6 text-burgundy" aria-hidden />
              Booking Coming Soon
            </DialogTitle>
            <DialogDescription className="pt-1">
              Our online appointment booking is being finished and will be live
              here shortly. In the meantime, our team is ready to arrange your
              home fitting or in-store visit directly — just reach out.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2 pt-1">
            <Button asChild variant="default">
              <a
                href={whatsappLink(CONTACT.whatsappDubai, bookingMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp — Dubai
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href={whatsappLink(CONTACT.whatsappAbuDhabi, bookingMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp — Abu Dhabi
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href={`tel:${CONTACT.generalPhoneDial}`}>
                <Phone className="h-4 w-4" aria-hidden />
                Call {CONTACT.generalPhone}
              </a>
            </Button>
          </div>

          <DialogFooter className="pt-2">
            <p className="text-xs text-muted-foreground">
              No call-out fee for home fittings. Minimum order AED 300.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  );
}
