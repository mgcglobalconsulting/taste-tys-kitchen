import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { ConsultationForm } from "@/components/site/consultation-form";
import { photos } from "@/content/photos";
import { services } from "@/content/services";
import { addressLines, directionsUrl, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a VIP Consultation",
  description:
    "Request a VIP consultation with Taste of Ty's Kitchen. We tailor menus to your vision, dietary needs, and event goals.",
};

const steps = [
  "Send your request with the details you know so far.",
  "We reach out to schedule your VIP consultation.",
  "We tailor a menu to your vision, dietary needs, and goals.",
];

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;
  const requested = typeof service === "string" ? service : undefined;
  const defaultService = services.some((item) => item.slug === requested) ? requested : undefined;

  return (
    <section className="container-site grid gap-14 py-14 sm:py-20 lg:grid-cols-12">
      <aside className="lg:col-span-5">
        <div className="lg:sticky lg:top-36">
          <p className="eyebrow mb-5">Now booking</p>
          <h1 className="text-5xl sm:text-6xl">
            Request your <em className="text-pinot">VIP</em> consultation.
          </h1>
          <p className="mt-6 text-lg text-smoke">
            Every client receives a VIP consultation where we tailor menus to their vision, dietary
            needs, and event goals.
          </p>
          <ol className="mt-10 space-y-5">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm text-creme">
                  {index + 1}
                </span>
                <p className="pt-1">{step}</p>
              </li>
            ))}
          </ol>
          <div className="relative mt-10 hidden aspect-[3/2] overflow-hidden rounded-[var(--radius-media)] lg:block">
            <Image
              src={photos.setupPrivate.src}
              alt={photos.setupPrivate.alt}
              fill
              placeholder="blur"
              sizes="40vw"
              className="object-cover"
            />
          </div>
          <div className="mt-8 space-y-2 text-sm">
            <p className="text-smoke">Prefer to talk now?</p>
            <a href={site.contact.phoneHref} className="flex items-center gap-2 font-bold hover:text-pinot">
              <Phone className="size-4 text-pinot" aria-hidden /> {site.contact.phoneDisplay}
            </a>
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 font-bold hover:text-pinot">
              <Mail className="size-4 text-pinot" aria-hidden /> {site.contact.email}
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 font-bold hover:text-pinot"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-pinot" aria-hidden />
              <address className="not-italic">
                {addressLines[0]}, {addressLines[1]}
              </address>
            </a>
          </div>
        </div>
      </aside>
      <div className="lg:col-span-7">
        <div className="rounded-[var(--radius-media)] border border-line bg-linen p-6 sm:p-10">
          <ConsultationForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
