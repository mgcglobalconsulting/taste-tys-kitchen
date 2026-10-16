import Link from "next/link";

import { Button } from "@/components/ui/button";
import { primaryCta, site } from "@/content/site";

type CtaBandProps = {
  title?: string;
  body?: string;
};

/** The one full-red band per page: the booking call to action. */
export function CtaBand({
  title = "Now booking. Secure your date.",
  body = "Every client receives a VIP consultation where we tailor menus to their vision, dietary needs, and event goals.",
}: CtaBandProps) {
  return (
    <section className="bg-pinot text-creme">
      <div className="container-site flex flex-col items-start gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-4xl text-creme sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-creme/85">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="ink" size="lg">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <Button asChild variant="outline-light" size="lg">
            <a href={site.contact.phoneHref}>Call {site.contact.phoneDisplay}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
