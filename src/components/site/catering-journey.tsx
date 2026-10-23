"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import styles from "./catering-journey.module.css";

const steps = [
  {
    n: "01",
    title: "Browse & select",
    body: "Use the catalog below to find dishes that fit your occasion. Mix cuisines, combine breakfast and dinner, or build around a theme.",
  },
  {
    n: "02",
    title: "Request your quote",
    body: "Share your event date, venue, guest count, and selections. Chef Ty builds a written quote with confirmed pricing, quantities, and service details.",
  },
  {
    n: "03",
    title: "Enjoy the event",
    body: "Choose drop-off, buffet, or full-service. Chef Ty handles the cooking — you enjoy a seamless, beautifully presented meal.",
  },
];

export function CateringJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollStep, setScrollStep] = useState(0);
  const [hoverStep, setHoverStep] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function update() {
      frame = 0;
      if (!section || reducedMotion.matches || paused) return;
      if (window.innerWidth < 640) {
        const milestones = section.querySelectorAll(`.${styles.milestone}`);
        let reached = 0;
        milestones.forEach((milestone, index) => {
          if (milestone.getBoundingClientRect().top <= window.innerHeight * 0.65) reached = index;
        });
        setScrollStep(reached);
        return;
      }
      const { top, height } = section.getBoundingClientRect();
      const progress = (window.innerHeight * 0.8 - top) / Math.min(height, window.innerHeight * 0.7);
      setScrollStep(Math.min(2, Math.max(0, Math.floor(progress * 3))));
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
    };
  }, [paused]);

  const activeStep = hoverStep ?? scrollStep;

  return (
    <section
      ref={sectionRef}
      className={styles.journey}
      aria-labelledby="catering-journey-title"
      data-paused={paused}
    >
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.orb} />
        <div className={styles.goldOrb} />
        <svg className={styles.plates} viewBox="0 0 900 900" fill="none">
          <circle cx="450" cy="450" r="400" />
          <circle cx="450" cy="450" r="365" />
          <circle cx="450" cy="450" r="290" />
          <path d="M35 720C240 580 310 860 575 690S780 360 900 300" />
        </svg>
        <svg className={styles.ribbon} viewBox="0 0 1600 500" fill="none" preserveAspectRatio="none">
          <path d="M-100 350C200 60 440 520 800 260S1250 80 1700 240" />
          <path d="M-100 375C200 85 440 545 800 285S1250 105 1700 265" />
        </svg>
      </div>

      <div className="container-site relative py-20 sm:py-24">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow mb-4">How it works</p>
            <h2 id="catering-journey-title" className="text-4xl sm:text-5xl max-w-xl">
              From catalog to <em className="text-pinot">your table.</em>
            </h2>
          </div>
          <button
            type="button"
            className={styles.motionToggle}
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Resume background motion" : "Pause background motion"}
          >
            {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
            <span>{paused ? "Resume motion" : "Pause motion"}</span>
          </button>
        </div>

        <ol className={styles.steps} onPointerLeave={() => setHoverStep(null)}>
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={styles.step}
              data-active={activeStep === i}
              data-reached={activeStep >= i}
              data-connected={activeStep > i}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setHoverStep(i);
              }}
            >
              <div className={styles.milestone}>
                <span className={styles.number}>{step.n}</span>
                <span className={styles.track} aria-hidden="true"><span /></span>
              </div>
              <div className={styles.copy}>
                <h3 className="font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-smoke">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
