import type { MetadataRoute } from "next";

import { services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    ...services.map((service) => `/services/${service.slug}`),
    "/menu",
    "/about",
    "/about/mission",
    "/gallery",
    "/contact",
    "/book",
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
