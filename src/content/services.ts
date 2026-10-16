import type { PhotoKey } from "./photos";

/**
 * Services named by the owner (docs/CONTENT.md "Services"). Descriptions stay
 * inside what the owner wrote: no prices, capacities, lead times, or areas.
 */
export type Service = {
  slug: string;
  name: string;
  summary: string;
  intro: string;
  photo: PhotoKey;
  highlights: { title: string; body: string }[];
};

export const services: Service[] = [
  {
    slug: "catering",
    name: "Catering & Events",
    summary: "Full-service mobile catering with elevated, globally inspired menus.",
    intro:
      "Full-service mobile catering with over 5 years of experience delivering elevated, globally inspired cuisine. Every menu is tailored to your vision, dietary needs, and event goals in a VIP consultation.",
    photo: "fineDining",
    highlights: [
      {
        title: "Drop-off, buffet, or full-service",
        body: "Choose the service style that fits your event, from a simple drop-off to a fully served experience.",
      },
      {
        title: "Packages built around you",
        body: "Silver, Signature Gold, and VIP Platinum packages are a starting point. Your consultation shapes the final menu.",
      },
      {
        title: "Dietary friendly",
        body: "Vegetarian, vegan, and gluten-free friendly options, with flexible menus for every guest.",
      },
    ],
  },
  {
    slug: "meal-prep",
    name: "Meal Prep & Daily Meals",
    summary: "Chef-prepared meal prep and daily meals tailored to your lifestyle.",
    intro:
      "Meal prep and daily meals from the same kitchen that caters our events, customized to your tastes and your week.",
    photo: "jerkedQuarters",
    highlights: [
      {
        title: "Customization over convenience",
        body: "We don't do one-size-fits-all. Your meals are designed around your preferences and lifestyle.",
      },
      {
        title: "Globally inspired",
        body: "From Caribbean jerk to Mediterranean and Korean BBQ styles, flavor travels with every meal.",
      },
      {
        title: "Vegan and gluten-free options",
        body: "Flexible menus that serve diverse dietary needs.",
      },
    ],
  },
  {
    slug: "meal-plans",
    name: "Nutrition Meal Plans",
    summary: "Personalized, nutrition-based meal plans designed to fit each client's lifestyle.",
    intro:
      "Personalized nutrition-based meal plans designed to fit each client's lifestyle, starting with a VIP consultation about your goals and dietary needs.",
    photo: "salmon",
    highlights: [
      {
        title: "Built in consultation",
        body: "Every plan starts with a conversation about your goals, preferences, and dietary needs.",
      },
      {
        title: "Inclusive by design",
        body: "Vegan, gluten-free, and flexible options, because quality and inclusivity go together.",
      },
      {
        title: "Flavor first",
        body: "Healthier eating that still tastes like Ty's Kitchen.",
      },
    ],
  },
  {
    slug: "cooking-classes",
    name: "Cooking Classes",
    summary: "Hands-on cooking classes that bring culture and creativity into your kitchen.",
    intro:
      "Cooking classes that blend culture, creativity, and community, because we're building a brand that teaches, inspires, and creates opportunities for others.",
    photo: "candid",
    highlights: [
      {
        title: "Cultural creativity",
        body: "Explore global flavors and the stories behind the dishes.",
      },
      {
        title: "Tailored to your group",
        body: "Tell us who's cooking and what you'd like to learn, and we'll shape the class around it.",
      },
      {
        title: "Food that brings people together",
        body: "A shared kitchen is one of the best ways to connect.",
      },
    ],
  },
  {
    slug: "add-ons",
    name: "Add-On Services",
    summary: "Bartending, bakery creations, event planning, and full setup for a one-stop experience.",
    intro:
      "Beyond food, we provide a seamless, one-stop-shop experience with add-on services including bartending, bakery creations, event planning, and full setup.",
    photo: "setupPrivate",
    highlights: [
      { title: "Bartending", body: "Beverage service to complete your event." },
      { title: "Bakery creations", body: "Desserts and dessert tables, made in-house." },
      { title: "Event planning", body: "Help bringing the whole event together, not just the menu." },
      { title: "Full setup", body: "Tables, displays, and presentation handled for you." },
      { title: "Staffing", body: "Service staff for your event." },
      { title: "Live cooking experience", body: "Food prepared in front of your guests." },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
