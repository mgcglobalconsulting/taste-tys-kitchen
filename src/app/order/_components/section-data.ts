/**
 * Order page section data — photo map, flavor descriptions, shared helpers.
 * Sections array mirrors the shape in page.tsx but lives here so all
 * _components can import it without touching corporate-menu directly.
 */

import type { StaticImageData } from "next/image";

import setup3 from "@/assets/photos/chef-setup-3.jpg";
import lambChops from "@/assets/photos/chef-ty-lambchop.jpg";
import plating from "@/assets/photos/chef-ty-plating.jpg";
import crostini from "@/assets/photos/chefty-crostinos.jpg";
import shrimpCocktail from "@/assets/photos/chef-tyshrimp-cocktail.jpg";
import {
  eveningCategories,
  eveningCuisines,
  menuTabs,
  type PanCategory,
} from "@/content/corporate-menu";
import jerkChicken from "@/assets/photos/jerk-chicken.jpg";
import jerkedQuarters from "@/assets/photos/jerked-chicken-quarters.jpg";
import salmon from "@/assets/photos/pineapple-habanero-salmon.jpg";
import pumpkinRoll from "@/assets/photos/pumpkin-roll.jpg";
import seafoodSalad from "@/assets/photos/seafoodsalad.jpg";
import smallBites from "@/assets/photos/small-bites-pic.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Section = {
  id: string;
  label: string;
  categories: PanCategory[];
};

// ─── Sections ─────────────────────────────────────────────────────────────────

const breakfast = menuTabs.find((t) => t.id === "breakfast")!;
const brunch = menuTabs.find((t) => t.id === "brunch")!;
const dessertsTab = menuTabs.find((t) => t.id === "desserts")!;
const beveragesTab = menuTabs.find((t) => t.id === "beverages")!;

export const sections: Section[] = [
  { id: "breakfast", label: "Breakfast", categories: breakfast.categories },
  { id: "brunch", label: "Brunch", categories: brunch.categories },
  ...eveningCuisines.map((c) => ({
    id: c.toLowerCase().replace(/[\s&]+/g, "-"),
    label: c,
    categories: eveningCategories[c],
  })),
  { id: "desserts", label: "Desserts", categories: dessertsTab.categories },
  { id: "beverages", label: "Beverages", categories: beveragesTab.categories },
];

// ─── Photo map ────────────────────────────────────────────────────────────────

export const sectionPhotos: Record<string, StaticImageData> = {
  breakfast: plating,
  brunch: smallBites,
  jamaican: jerkChicken,
  italian: crostini,
  "american-southern": jerkedQuarters,
  "chinese-inspired": seafoodSalad,
  "mexican-latin": salmon,
  mediterranean: lambChops,
  vegetarian: setup3,
  desserts: pumpkinRoll,
  beverages: shrimpCocktail,
};

// ─── Flavor descriptions ──────────────────────────────────────────────────────

export const sectionFlavors: Record<string, string> = {
  breakfast: "Morning classics cooked in generous pans — scrambled, fried, and loaded for a crowd.",
  brunch: "The best of both worlds. Small bites and crowd-pleasing staples for midday gatherings.",
  jamaican: "Bold jerk seasoning, oxtail, and island staples with deep, slow-cooked flavor.",
  italian: "Fresh pasta, crostini, and comforting Italian-American classics.",
  "american-southern": "Comfort food roots — fried chicken, mac & cheese, and all the fixings.",
  "chinese-inspired": "Wok-tossed favorites and bright, balanced sauces.",
  "mexican-latin": "Vibrant Latin flavors from street-style tacos to slow-braised meats.",
  mediterranean: "Herb-rubbed lamb, fresh greens, and bold Mediterranean coast flavors.",
  vegetarian: "Plant-forward dishes that hold the table on their own.",
  desserts: "Sweet finales — rolls, cobblers, and bites worth saving room for.",
  beverages: "Housemade drinks and refreshers to round out the meal.",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function parsePrice(str: string): number {
  const match = str.match(/\$(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export function toItemId(categoryId: string, name: string, size: string): string {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const sizeSlug = size.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${categoryId}-${slug}-${sizeSlug}`;
}
