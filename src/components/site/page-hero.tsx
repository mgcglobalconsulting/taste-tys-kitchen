import Image from "next/image";
import type { ReactNode } from "react";

import type { Photo } from "@/content/photos";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  photo?: Photo;
  children?: ReactNode;
};

/** Interior-page header: copy on crème, optional photo panel on the right. */
export function PageHero({ eyebrow, title, intro, photo, children }: PageHeroProps) {
  return (
    <section className="border-b border-line">
      <div className="container-site grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16">
        <div className={photo ? "lg:col-span-6" : "lg:col-span-9"}>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="text-5xl sm:text-6xl">{title}</h1>
          {intro ? <p className="mt-6 max-w-xl text-lg text-smoke">{intro}</p> : null}
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
        {photo ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] lg:col-span-6">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="hero-drift object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
