import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { coreValues, mission, vision } from "@/content/about";

export const metadata: Metadata = {
  title: "Mission & Values",
  description: "The vision, mission, and seven core values behind Taste of Ty's Kitchen.",
};

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Mission & values"
        title={
          <>
            Culture, creativity, and <em className="text-pinot">community</em> in every meal.
          </>
        }
      />

      <section className="container-site grid gap-6 py-20 sm:py-24 lg:grid-cols-2">
        {[
          { label: "Our vision", body: vision },
          { label: "Our mission", body: mission },
        ].map((block, index) => (
          <Reveal key={block.label} delay={index * 100}>
            <article className="h-full rounded-[var(--radius-media)] border border-line bg-linen p-8 sm:p-10">
              <p className="eyebrow mb-5">{block.label}</p>
              <p className="font-display text-2xl leading-snug sm:text-[1.75rem]">{block.body}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-line">
        <div className="container-site py-20 sm:py-28">
          <Reveal>
            <SectionHeading eyebrow="Core values" title="Seven things we never compromise on." />
          </Reveal>
          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <Reveal as="li" key={value.title} delay={(index % 3) * 80}>
                <p className="font-display text-5xl italic text-pinot/80">0{index + 1}</p>
                <h3 className="mt-3 text-2xl">{value.title}</h3>
                <p className="mt-3 text-smoke">{value.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
