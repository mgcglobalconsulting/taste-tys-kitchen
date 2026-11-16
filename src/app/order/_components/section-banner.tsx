"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface SectionBannerProps {
  id: string;
  label: string;
  flavor: string;
  photo: StaticImageData;
}

export function SectionBanner({ id, label, flavor, photo }: SectionBannerProps) {
  const reduce = useReducedMotion();
  const dur = reduce ? 0 : 1;

  return (
    <div className="relative mb-6 h-44 overflow-hidden rounded-[var(--radius-media)] sm:h-52">
      {/* Food photo with vignette */}
      <motion.div
        key={id}
        className="absolute inset-0"
        initial={{ scale: reduce ? 1 : 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: dur * 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={photo}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
      </motion.div>

      {/* Text */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <motion.h2
          key={`${id}-title`}
          className="font-display text-2xl font-semibold text-creme sm:text-3xl"
          initial={{ y: reduce ? 0 : 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: dur * 0.5, ease: [0.22, 1, 0.36, 1], delay: dur * 0.08 }}
        >
          {label}
        </motion.h2>
        <motion.p
          key={`${id}-flavor`}
          className="mt-1 text-sm text-creme/70"
          initial={{ y: reduce ? 0 : 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: dur * 0.5, ease: [0.22, 1, 0.36, 1], delay: dur * 0.14 }}
        >
          {flavor}
        </motion.p>
        {/* Gold rule */}
        <motion.div
          key={`${id}-rule`}
          className="mt-3 h-px origin-left bg-gold/60"
          initial={{ scaleX: reduce ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: dur * 0.6, ease: [0.22, 1, 0.36, 1], delay: dur * 0.1 }}
        />
      </div>
    </div>
  );
}
