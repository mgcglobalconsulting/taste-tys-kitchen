import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { PageHero } from "@/components/site/page-hero";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Events, setups, and plates from Taste of Ty's Kitchen.",
};

// Provisional selection — confirm with the owner which photos are approved (docs/IMAGES.md).
const galleryItems = [
  photos.fineDining,
  photos.lambChops,
  photos.shrimpCocktail,
  photos.setupPrivate,
  photos.jerkChicken,
  photos.plating,
  photos.crostini,
  photos.smallBites,
  photos.salmon,
  photos.pumpkinRoll,
  photos.homeDining,
  photos.seafoodSalad,
  photos.setup3,
  photos.jerkedQuarters,
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            We don&apos;t just serve food. We create <em className="text-pinot">moments.</em>
          </>
        }
        intro="From presentation to flavor, a look at the plates, tables, and events we've had the pleasure of serving."
      />
      <section className="container-site py-14 sm:py-20">
        <GalleryGrid items={galleryItems} />
      </section>
      <CtaBand />
    </>
  );
}
