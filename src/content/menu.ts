/**
 * From the owner's styled catering menu and Met Gala tasting menu.
 * See docs/CONTENT.md "Additional facts from the owner's menus".
 * Package prices exist on the PDF but are deliberately not published.
 */
export type MenuSection = {
  id: string;
  title: string;
  items: { name: string; note?: string }[];
};

export const menuSections: MenuSection[] = [
  {
    id: "appetizers",
    title: "Appetizers",
    items: [
      { name: "Fried Plantains" },
      { name: "Mozzarella Caprese Salad" },
      { name: "Southwest Bean Salad" },
      { name: "Broccoli Slaw or Cole Slaw" },
      { name: "Meatballs", note: "Gravy, Ty's Sauce, or BBQ" },
      { name: "Signature Skewers", note: "Chicken, Veggie, or Shrimp" },
      { name: "Garden Salad or Caesar Salad" },
      { name: "Italian Pasta Salad" },
    ],
  },
  {
    id: "entrees",
    title: "Entrées",
    items: [
      { name: "Chicken", note: "Baked, Marsala, Caribbean Jerk, or Mediterranean style" },
      { name: "Pork or Beef", note: "Gravy, Grilled, or BBQ" },
      { name: "Fish", note: "Lemon Pepper, Cajun, or Stewed" },
      { name: "Mushrooms", note: "Stewed, Baked, or Flash Fried" },
      { name: "Tofu", note: "Curried, Caribbean Jerk, or Korean BBQ" },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    items: [
      { name: "Garlic Mashed Potatoes" },
      { name: "Yellow Saffron Rice or Cilantro Lime Rice" },
      { name: "6 Cheese Mac" },
      { name: "Lo Mein" },
      { name: "Asparagus" },
      { name: "Green Beans" },
      { name: "Mixed Greens" },
      { name: "Broccolini" },
    ],
  },
];

export const packages = [
  {
    name: "Silver",
    featured: false,
    includes: ["2 entrées", "2 sides", "1 appetizer"],
  },
  {
    name: "Signature Gold",
    featured: true,
    includes: ["3 entrées", "3 sides", "2 appetizers"],
  },
  {
    name: "VIP Platinum",
    featured: false,
    includes: [
      "3 appetizers",
      "2 entrées",
      "1 premium entrée",
      "3 sides",
      "1 cold salad",
      "1 premium cold salad",
      "1 dessert",
    ],
  },
] as const;

export const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free Friendly"] as const;

export const serviceStyles = ["Drop-Off", "Buffet", "Full-Service"] as const;

export const menuAddOns = [
  "Beverage Station",
  "Dessert Table",
  "Seafood Upgrade",
  "Staffing",
  "Live Cooking Experience",
] as const;

export const smallBites = [
  { name: "Kale Power Salad", note: "with lemon honey vinaigrette" },
  { name: "Cajun Honey Salmon", note: "over yellow saffron rice" },
  { name: "Pineapple Upside Down Cake Shooters", note: "mini dessert bite" },
] as const;
