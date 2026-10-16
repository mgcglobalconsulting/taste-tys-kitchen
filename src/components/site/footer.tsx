import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { addressLines, directionsUrl, nav, primaryCta, site } from "@/content/site";

import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-creme">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo tone="cream" className="w-44" />
          <p className="mt-6 max-w-xs font-display text-xl italic text-creme/90">{site.tagline}</p>
          <div className="mt-6 h-px w-16 bg-gold" aria-hidden />
          <p className="mt-6 text-sm text-creme/70">
            A portion of our proceeds goes toward feeding the homeless in our community every week.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-5" aria-label="Footer">
          {nav
            .filter((item) => item.children)
            .map((item) => (
              <div key={item.label}>
                <p className="eyebrow mb-4 text-gold">{item.label}</p>
                <ul className="space-y-2 text-sm">
                  {item.children?.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="text-creme/80 hover:text-creme">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          <div>
            <p className="eyebrow mb-4 text-gold">Explore</p>
            <ul className="space-y-2 text-sm">
              {nav
                .filter((item) => !item.children)
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-creme/80 hover:text-creme">
                      {item.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href={primaryCta.href} className="text-creme/80 hover:text-creme">
                  {primaryCta.label}
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-gold">Get in touch</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 hover:text-gold">
                <Phone className="size-4" aria-hidden /> {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2 hover:text-gold"
              >
                <Mail className="size-4" aria-hidden /> {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-creme/80 hover:text-gold"
              >
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <address className="not-italic">
                  {addressLines[0]}
                  <br />
                  {addressLines[1]}
                </address>
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex gap-4 text-sm">
            <li>
              <a href={site.social.instagram.url} className="text-creme/80 hover:text-creme" rel="noopener">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.social.facebook.url} className="text-creme/80 hover:text-creme" rel="noopener">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-creme/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-creme/60 sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.loveLanguage}</p>
        </div>
      </div>
    </footer>
  );
}
