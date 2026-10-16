import { MapPin, Navigation, Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { addressLines, directionsUrl, primaryCta, site } from "@/content/site";

import { LocationMap } from "./location-map";
import { Reveal } from "./reveal";

/** Compact "Find us" strip for the home page, sitting just above the footer. */
export function FindUs() {
  return (
    <section aria-labelledby="find-us-heading" className="bg-linen">
      <div className="container-site grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-4">Find us</p>
          <h2 id="find-us-heading" className="text-4xl sm:text-5xl">
            Annapolis Road, <em className="text-pinot">Baltimore.</em>
          </h2>
          <address className="mt-6 flex gap-3 not-italic text-lg text-smoke">
            <MapPin className="mt-1 size-5 shrink-0 text-pinot" aria-hidden />
            <span>
              {addressLines[0]}
              <br />
              {addressLines[1]}
            </span>
          </address>
          <a
            href={site.contact.phoneHref}
            className="mt-3 flex items-center gap-3 text-lg text-smoke hover:text-pinot"
          >
            <Phone className="size-5 shrink-0 text-pinot" aria-hidden /> {site.contact.phoneDisplay}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            <Button asChild variant="outline">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation aria-hidden /> Get directions
              </a>
            </Button>
          </div>
        </Reveal>
        <div className="lg:col-span-8">
          <LocationMap variant="compact" />
        </div>
      </div>
    </section>
  );
}
