"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useRef } from "react";

import { addressLines, directionsUrl, primaryCta, site } from "@/content/site";
import { cn } from "@/lib/utils";

type LocationMapProps = {
  /** "full" for the contact page, "compact" for the home page strip. */
  variant?: "full" | "compact";
  className?: string;
};

const popupHtml = `
  <div class="tk-card">
    <p class="tk-card-eyebrow">Find us</p>
    <p class="tk-card-name">${site.name}</p>
    <address class="tk-card-address">${addressLines.join("<br />")}</address>
    <div class="tk-card-actions">
      <a class="tk-card-btn tk-card-btn--primary" href="${primaryCta.href}">${primaryCta.label}</a>
      <a class="tk-card-btn" href="${directionsUrl}" target="_blank" rel="noopener noreferrer">Get directions</a>
    </div>
  </div>
`;

// Small red pin with a chef's-hat glyph (lucide "chef-hat" paths).
const pinHtml = `
  <span class="tk-pin">
    <span class="tk-pin-pulse" aria-hidden="true"></span>
    <span class="tk-pin-badge">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/>
        <path d="M6 17h12"/>
      </svg>
    </span>
  </span>
`;

/**
 * OpenStreetMap + Leaflet map with a small brand pin. Leaflet touches
 * `window`, so it is imported inside the effect, never during SSR.
 */
export function LocationMap({ variant = "full", className }: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let map: import("leaflet").Map | undefined;

    void import("leaflet").then((L) => {
      if (disposed) return;
      const center: [number, number] = [site.address.lat, site.address.lng];
      map = L.map(container, {
        center,
        zoom: variant === "full" ? 15 : 14,
        scrollWheelZoom: false,
        zoomControl: variant === "full",
        attributionControl: true,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const icon = L.divIcon({
        html: pinHtml,
        className: "tk-pin-root",
        iconSize: [34, 42],
        iconAnchor: [17, 42],
        popupAnchor: [0, -40],
      });

      L.marker(center, {
        icon,
        keyboard: true,
        title: `${site.name}, ${addressLines.join(", ")}`,
        alt: `${site.name} location`,
        riseOnHover: true,
      })
        .addTo(map)
        .bindPopup(popupHtml, {
          className: "tk-popup",
          maxWidth: 300,
          minWidth: 260,
          closeButton: true,
          autoPanPadding: [24, 24],
        });
    });

    return () => {
      disposed = true;
      map?.remove();
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`Map showing ${site.name} at ${addressLines.join(", ")}`}
      className={cn(
        "tk-map relative z-0 w-full overflow-hidden rounded-[var(--radius-media)] border border-line bg-linen",
        variant === "full" ? "h-[26rem] sm:h-[34rem]" : "h-80 sm:h-96",
        className,
      )}
    />
  );
}
