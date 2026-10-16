"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import type { Photo } from "@/content/photos";

export function GalleryGrid({ items }: { items: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : items[index];

  const step = (delta: number) =>
    setIndex((value) => (value === null ? value : (value + delta + items.length) % items.length));

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {items.map((photo, i) => (
          <li key={photo.alt} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-[var(--radius-media)] bg-linen"
              aria-label={`Open photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition duration-700 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={current !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/90" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") step(1);
              if (event.key === "ArrowLeft") step(-1);
            }}
          >
            {current ? (
              <>
                <Dialog.Title className="sr-only">{current.alt}</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Photo {index === null ? "" : index + 1} of {items.length}. Use the arrow keys to browse.
                </Dialog.Description>
                <figure className="relative flex max-h-full max-w-5xl flex-col items-center">
                  <Image
                    src={current.src}
                    alt={current.alt}
                    sizes="90vw"
                    className="h-auto max-h-[80dvh] w-auto rounded-[var(--radius-media)] object-contain"
                  />
                  <figcaption className="mt-4 text-center text-sm text-creme/80">{current.alt}</figcaption>
                </figure>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="absolute left-2 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center text-creme hover:text-gold sm:left-6"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="size-8" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="absolute right-2 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center text-creme hover:text-gold sm:right-6"
                  aria-label="Next photo"
                >
                  <ChevronRight className="size-8" aria-hidden />
                </button>
                <Dialog.Close
                  className="absolute right-4 top-4 inline-flex size-12 items-center justify-center text-creme hover:text-gold"
                  aria-label="Close"
                >
                  <X className="size-7" aria-hidden />
                </Dialog.Close>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
