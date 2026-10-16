import type { StaticImageData } from "next/image";

import chefSetup3 from "@/assets/photos/chef-setup-3.jpg";
import chefTyGroup from "@/assets/photos/chef-ty-group.jpg";
import chefTyHomeDining from "@/assets/photos/chef-ty-home-dining.jpg";
import chefTyLambchop from "@/assets/photos/chef-ty-lambchop.jpg";
import chefTyPlating from "@/assets/photos/chef-ty-plating.jpg";
import chefTyServing from "@/assets/photos/chef-ty-serving-the-ppl.jpg";
import chefTySetup4 from "@/assets/photos/chef-ty-setup-4.jpg";
import shrimpCocktail from "@/assets/photos/chef-tyshrimp-cocktail.jpg";
import candid1 from "@/assets/photos/chefty-candid-1.jpg";
import crostini from "@/assets/photos/chefty-crostinos.jpg";
import fineDining from "@/assets/photos/fine-dining.jpg";
import jerkChicken from "@/assets/photos/jerk-chicken.jpg";
import jerkedQuarters from "@/assets/photos/jerked-chicken-quarters.jpg";
import salmon from "@/assets/photos/pineapple-habanero-salmon.jpg";
import pumpkinRoll from "@/assets/photos/pumpkin-roll.jpg";
import seafoodSalad from "@/assets/photos/seafoodsalad.jpg";
import setupPrivate1 from "@/assets/photos/setup-private-1.jpg";
import smallBites from "@/assets/photos/small-bites-pic.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
};

/**
 * Every photo the site uses, with its alt text. Sources and caveats are in
 * docs/IMAGES.md — most of these are provisional until originals arrive.
 */
export const photos = {
  fineDining: {
    src: fineDining,
    alt: "A dining table set for a private dinner with red chargers, plated entrées, and candlelight",
  },
  homeDining: {
    src: chefTyHomeDining,
    alt: "Guests enjoying a plated dinner at a private in-home event",
  },
  plating: {
    src: chefTyPlating,
    alt: "Plated entrées with broccolini at a round table set with gold flatware and red chargers",
  },
  lambChops: {
    src: chefTyLambchop,
    alt: "Herb-crusted lamb chops with rosemary on a white plate",
  },
  jerkChicken: {
    src: jerkChicken,
    alt: "Caribbean jerk chicken with a glossy glaze on a white plate",
  },
  jerkedQuarters: {
    src: jerkedQuarters,
    alt: "A tray of herb-roasted jerk chicken quarters",
  },
  salmon: {
    src: salmon,
    alt: "Pineapple habanero salmon with a red pepper garnish and sauce drizzle",
  },
  seafoodSalad: {
    src: seafoodSalad,
    alt: "Molded seafood salad garnished with red chili peppers",
  },
  shrimpCocktail: {
    src: shrimpCocktail,
    alt: "Shrimp cocktail served on tasting spoons with cocktail sauce on a gold tray",
  },
  crostini: {
    src: crostini,
    alt: "Crostini topped with heirloom tomatoes and fresh cheese",
  },
  pumpkinRoll: {
    src: pumpkinRoll,
    alt: "Slices of pumpkin roll arranged on a tiered dessert display",
  },
  smallBites: {
    src: smallBites,
    alt: "A small-bites buffet with chafing dishes, dessert cups, and flowers",
  },
  setupPrivate: {
    src: setupPrivate1,
    alt: "A buffet set with chafing dishes, red roses, and baby's breath for a private event",
  },
  setup3: {
    src: chefSetup3,
    alt: "A dark-linen buffet table with chafing dishes and a floral centerpiece",
  },
  setup4: {
    src: chefTySetup4,
    alt: "Catering setup with silver chafing dishes and fresh flowers",
  },
  serving: {
    src: chefTyServing,
    alt: "Chef Ty and a team member serving food from a buffet line",
  },
  candid: {
    src: candid1,
    alt: "Chef Ty working a buffet station at an event",
  },
  team: {
    src: chefTyGroup,
    alt: "Chef Ty with a group of event guests",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
