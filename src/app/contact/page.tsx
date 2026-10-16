import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { LocationMap } from "@/components/site/location-map";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { photos } from "@/content/photos";
import { addressLines, addressOneLine, directionsUrl, primaryCta, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call ${site.contact.phoneDisplay} or email ${site.contact.email} to reach Taste of Ty's Kitchen.`,
};

const channels = [
  {
    icon: Phone,
    label: "Call us",
    value: site.contact.phoneDisplay,
    href: site.contact.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  {
    icon: MapPin,
    label: "Visit",
    value: addressOneLine,
    href: directionsUrl,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s plan something <em className="text-pinot">unforgettable.</em>
          </>
        }
        intro="The fastest way to get started is a VIP consultation request. You can also reach us directly."
        photo={photos.setup4}
      >
        <Button asChild size="lg">
          <Link href={primaryCta.href}>{primaryCta.label}</Link>
        </Button>
      </PageHero>

      <section className="container-site grid gap-6 py-20 sm:grid-cols-3">
        {channels.map((channel) => {
          const body = (
            <>
              <channel.icon className="size-6 text-pinot" aria-hidden />
              <p className="eyebrow mt-6 text-smoke">{channel.label}</p>
              <p className="mt-2 break-words font-display text-2xl">{channel.value}</p>
            </>
          );
          return channel.href ? (
            <a
              key={channel.label}
              href={channel.href}
              {...("external" in channel ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="rounded-[var(--radius-media)] border border-line p-8 transition-colors hover:border-pinot"
            >
              {body}
            </a>
          ) : (
            <div key={channel.label} className="rounded-[var(--radius-media)] border border-line p-8">
              {body}
            </div>
          );
        })}
      </section>

      <section aria-labelledby="map-heading" className="container-site pb-20">
        <Reveal className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-3">Find us</p>
            <h2 id="map-heading" className="text-4xl sm:text-5xl">
              {addressLines[0]}
            </h2>
            <p className="mt-2 text-lg text-smoke">{addressLines[1]}</p>
          </div>
          <Button asChild variant="outline">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
              Get directions
            </a>
          </Button>
        </Reveal>
        <LocationMap variant="full" />
        <p className="mt-3 text-sm text-smoke">Tap the pin for directions or to book a consultation.</p>
      </section>

      <section className="border-t border-line bg-linen">
        <div className="container-site flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow mb-2">Follow along</p>
            <p className="font-display text-2xl">See what&apos;s cooking this week.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href={site.social.instagram.url} rel="noopener">
                Instagram {site.social.instagram.handle}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={site.social.facebook.url} rel="noopener">
                Facebook
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
