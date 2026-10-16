/**
 * Business facts. Every value here is sourced in docs/CONTENT.md — do not add
 * a fact that is not recorded there first.
 */
export const site = {
  /** Open decision resolved 2026-10-16: the logo and both menus read this. */
  name: "Taste of Ty's Kitchen",
  shortName: "Ty's Kitchen",
  tagline: "Great food with purpose. Elevated experiences, every time.",
  descriptor: "A Global Fusion Catering Experience",
  loveLanguage: "Great food is our love language.",
  description:
    "Taste of Ty's Kitchen is a full-service mobile catering company with over 5 years of experience delivering elevated, globally inspired cuisine.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tyskitchen.org",
  base: "Baltimore, MD",
  /** Supplied by the owner 2026-10-16. Geocoded with OpenStreetMap Nominatim. */
  address: {
    street: "2839 Annapolis Rd",
    city: "Baltimore",
    region: "MD",
    postalCode: "21230",
    country: "US",
    lat: 39.2541581,
    lng: -76.6385623,
  },
  contact: {
    email: "info@tyskitchen.org",
    phoneDisplay: "443.226.3279",
    phoneHref: "tel:+14432263279",
  },
  social: {
    instagram: { handle: "@ty_s_kitchen", url: "https://www.instagram.com/ty_s_kitchen/" },
    facebook: { handle: "@tasteoftyskitchen", url: "https://www.facebook.com/tasteoftyskitchen" },
  },
} as const;

export const addressLines = [
  site.address.street,
  `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
] as const;

export const addressOneLine = addressLines.join(", ");

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressOneLine)}`;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export const primaryCta: NavLink = { label: "Book a Consultation", href: "/book" };

export const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Catering & Events",
        href: "/services/catering",
        description: "Drop-off, buffet, or full-service catering for your event.",
      },
      {
        label: "Meal Prep & Daily Meals",
        href: "/services/meal-prep",
        description: "Chef-prepared meals that fit your week.",
      },
      {
        label: "Nutrition Meal Plans",
        href: "/services/meal-plans",
        description: "Personalized plans built around your lifestyle.",
      },
      {
        label: "Cooking Classes",
        href: "/services/cooking-classes",
        description: "Learn in the kitchen with Chef Ty.",
      },
      {
        label: "Add-On Services",
        href: "/services/add-ons",
        description: "Bartending, bakery creations, event planning, and full setup.",
      },
    ],
  },
  { label: "Menu", href: "/menu" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about", description: "Who we are and what sets us apart." },
      {
        label: "Mission & Values",
        href: "/about/mission",
        description: "Our vision, mission, and seven core values.",
      },
      {
        label: "Giving Back",
        href: "/about#giving-back",
        description: "Feeding our community, every week.",
      },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
