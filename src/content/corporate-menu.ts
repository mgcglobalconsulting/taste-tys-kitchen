/**
 * Full Catering Menu Catalog — pan-priced data for the corporate menu page.
 * Prices sourced directly from TOTK_Full_Catering_Menu_Catalog.pdf (2026-10).
 * "Custom quote" items are noted; do not assign prices to those entries.
 */

export type PanItem = {
  name: string;
  /** Half-pan price, per-dozen price, or per-gallon price depending on section */
  a: string;
  /** Full-pan price (omitted for per-dozen and per-gallon sections) */
  b?: string;
};

export type PanCategory = {
  id: string;
  title: string;
  /** Column A heading */
  colA: string;
  /** Column B heading — omitted for single-column sections */
  colB?: string;
  items: PanItem[];
  note?: string;
};

export type LiveStation = {
  title: string;
  priceLabel: string;
  details: string[];
};

export type MenuTab = {
  id: string;
  label: string;
  intro: string;
  categories: PanCategory[];
  liveStation?: LiveStation;
  customNote?: string;
};

// ─── Breakfast ───────────────────────────────────────────────────────────────

const breakfast: MenuTab = {
  id: "breakfast",
  label: "Breakfast",
  intro: "Classic morning selections, pan-priced for team meals and morning gatherings.",
  categories: [
    {
      id: "eggs",
      title: "Eggs Your Way",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Scrambled Eggs", a: "$55", b: "$105" },
        { name: "Scrambled Egg Whites", a: "$65", b: "$125" },
        { name: "Fried Hard Eggs", a: "$75", b: "$145" },
        { name: "Cheesy Scrambled Eggs", a: "$65", b: "$125" },
        { name: "Western Style Eggs", a: "$75", b: "$145" },
        { name: "Veggie Style Eggs", a: "$75", b: "$145" },
      ],
      note: "Premium add-ins: spinach, mushrooms, peppers, onions, tomatoes, cheese blend, and turkey sausage. Shrimp and lobster: market price.",
    },
    {
      id: "breakfast-proteins",
      title: "Breakfast Proteins",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Turkey Bacon", a: "$75", b: "$145" },
        { name: "Pork Bacon", a: "$75", b: "$145" },
        { name: "Turkey Sausage", a: "$70", b: "$135" },
        { name: "Pork Sausage", a: "$70", b: "$135" },
        { name: "Chicken Sausage", a: "$80", b: "$155" },
        { name: "Brown Stew Chicken", a: "$100", b: "$190" },
        { name: "Teriyaki Chicken", a: "$100", b: "$190" },
        { name: "Sweet Heat Chicken", a: "$100", b: "$190" },
      ],
    },
    {
      id: "breakfast-sides",
      title: "Signature Sides",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Breakfast Potatoes", a: "$50", b: "$95" },
        { name: "Garlic Herb Potatoes", a: "$55", b: "$105" },
        { name: "Sweet Potato Hash", a: "$65", b: "$125" },
        { name: "Cheese Grits", a: "$60", b: "$115" },
        { name: "Loaded Grits", a: "$95", b: "$185" },
        { name: "Yellow Saffron Rice", a: "$40", b: "$75" },
        { name: "Rice & Peas", a: "$45", b: "$85" },
      ],
    },
  ],
  liveStation: {
    title: "Live Omelette Station",
    priceLabel: "$18 per guest · 25 guest minimum",
    details: [
      "Chef-attended station, omelettes prepared fresh to order.",
      "Toppings: cheddar, mozzarella, spinach, mushrooms, bell peppers, onions, tomatoes, jalapeños.",
      "Proteins: turkey bacon, beef bacon, turkey sausage, beef sausage.",
      "Premium add-ons: shrimp +$4, steak +$5, crab +$7 per guest.",
    ],
  },
};

// ─── Brunch ──────────────────────────────────────────────────────────────────

const brunch: MenuTab = {
  id: "brunch",
  label: "Brunch",
  intro: "Elevated weekend-style service for morning events — chicken & waffles, grits, and fresh fruit displays.",
  categories: [
    {
      id: "brunch-entrees",
      title: "Brunch Entrées",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Chicken & Waffles", a: "$125", b: "$245" },
        { name: "Nashville Hot Chicken & Waffles", a: "$135", b: "$265" },
        { name: "Sweet Heat Chicken & Waffles", a: "$135", b: "$265" },
        { name: "Shrimp & Grits", a: "$145", b: "$285" },
        { name: "Fried Fish & Grits", a: "$165", b: "$325" },
        { name: "Breakfast Lasagna", a: "$125", b: "$250" },
        { name: "Breakfast Rasta Pasta", a: "$110", b: "$220" },
        { name: "Chicken Alfredo Brunch Pasta", a: "$110", b: "$220" },
        { name: "Seafood Brunch Pasta", a: "$225", b: "$450" },
      ],
    },
    {
      id: "waffles-toast",
      title: "Waffles & French Toast",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Belgian Waffles", a: "$75", b: "$145" },
        { name: "Cinnamon Belgian Waffles", a: "$85", b: "$165" },
        { name: "French Toast", a: "$75", b: "$145" },
        { name: "Cinnamon French Toast", a: "$85", b: "$165" },
        { name: "Stuffed French Toast", a: "$110", b: "$220" },
      ],
      note: "Toppings bar: maple syrup, warm berry compote, fresh strawberries, blueberries, bananas, whipped cream, powdered sugar, candied pecans, chocolate drizzle, and caramel drizzle.",
    },
    {
      id: "fresh-fruit",
      title: "Fresh Fruit",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Seasonal Fruit Salad", a: "$65", b: "$125" },
        { name: "Fresh Fruit Display", a: "$95", b: "$185" },
      ],
    },
  ],
};

// ─── Evening — by cuisine ─────────────────────────────────────────────────────

export const eveningCuisines = [
  "Jamaican",
  "Italian",
  "American & Southern",
  "Chinese-Inspired",
  "Mexican & Latin",
  "Mediterranean",
  "Vegetarian",
] as const;

export type EveningCuisine = (typeof eveningCuisines)[number];

export const eveningCategories: Record<EveningCuisine, PanCategory[]> = {
  Jamaican: [
    {
      id: "jamaican",
      title: "Jamaican Selections",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Jerk Chicken", a: "$150", b: "$250" },
        { name: "Oxtail Stew", a: "$225", b: "$375" },
        { name: "Curry Goat", a: "$200", b: "$350" },
        { name: "Brown Stew Chicken", a: "$150", b: "$250" },
        { name: "Escovitch Fish", a: "$175", b: "$275" },
        { name: "Ackee & Saltfish", a: "$150", b: "$250" },
        { name: "Rice & Peas", a: "$80", b: "$160" },
        { name: "Festival (Sweet Dumplings)", a: "$60", b: "$110" },
        { name: "Fried Plantain", a: "$60", b: "$110" },
        { name: "Callaloo (Vegetable)", a: "$80", b: "$140" },
        { name: "Steamed Cabbage", a: "$80", b: "$140" },
      ],
    },
  ],
  Italian: [
    {
      id: "italian",
      title: "Italian Selections",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Baked Ziti", a: "$120", b: "$220" },
        { name: "Lasagna", a: "$150", b: "$250" },
        { name: "Chicken Alfredo", a: "$150", b: "$250" },
        { name: "Spaghetti & Meatballs", a: "$120", b: "$220" },
        { name: "Shrimp Scampi", a: "$175", b: "$275" },
        { name: "Eggplant Parmesan", a: "$110", b: "$200" },
        { name: "Garlic Bread (10 / 20 pcs)", a: "$40", b: "$70" },
        { name: "Caesar Salad", a: "$60", b: "$110" },
        { name: "Italian Green Beans", a: "$80", b: "$140" },
        { name: "Roasted Vegetables", a: "$80", b: "$140" },
        { name: "Tiramisu", a: "$80", b: "$140" },
      ],
    },
  ],
  "American & Southern": [
    {
      id: "american",
      title: "American & Southern Selections",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Fried Chicken", a: "$150", b: "$250" },
        { name: "BBQ Ribs", a: "$200", b: "$350" },
        { name: "Beef Brisket", a: "$175", b: "$275" },
        { name: "Meatloaf", a: "$130", b: "$220" },
        { name: "Mac & Cheese", a: "$100", b: "$180" },
        { name: "Baked Beans", a: "$80", b: "$140" },
        { name: "Collard Greens", a: "$80", b: "$140" },
        { name: "Mashed Potatoes", a: "$80", b: "$140" },
        { name: "Corn on the Cob", a: "$80", b: "$140" },
        { name: "Coleslaw", a: "$60", b: "$110" },
        { name: "Cornbread (10 / 20 pcs)", a: "$50", b: "$90" },
      ],
    },
  ],
  "Chinese-Inspired": [
    {
      id: "chinese",
      title: "Chinese-Inspired Selections",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "General Tso's Chicken", a: "$140", b: "$240" },
        { name: "Kung Pao Chicken", a: "$140", b: "$240" },
        { name: "Beef & Broccoli", a: "$160", b: "$260" },
        { name: "Sweet & Sour Shrimp", a: "$160", b: "$260" },
        { name: "Shrimp Lo Mein", a: "$150", b: "$250" },
        { name: "Vegetable Fried Rice", a: "$100", b: "$180" },
        { name: "Chicken Fried Rice", a: "$120", b: "$220" },
        { name: "Spring Rolls (10 / 20 pcs)", a: "$60", b: "$100" },
        { name: "Steamed Mixed Vegetables", a: "$80", b: "$140" },
        { name: "Egg Drop Soup", a: "$60", b: "$110" },
        { name: "Fortune Cookies (10 / 20 pcs)", a: "$40", b: "$70" },
      ],
    },
  ],
  "Mexican & Latin": [
    {
      id: "mexican",
      title: "Mexican & Latin Selections",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Carne Asada", a: "$175", b: "$275" },
        { name: "Pollo Asado", a: "$150", b: "$250" },
        { name: "Arroz con Pollo", a: "$120", b: "$220" },
        { name: "Pernil (Roasted Pork)", a: "$175", b: "$275" },
        { name: "Beans (Frijoles)", a: "$80", b: "$140" },
        { name: "Yellow Rice", a: "$80", b: "$140" },
        { name: "Tostones (Fried Plantains)", a: "$60", b: "$110" },
        { name: "Pico de Gallo", a: "$60", b: "$110" },
        { name: "Guacamole", a: "$80", b: "$140" },
        { name: "Churros", a: "$60", b: "$110" },
        { name: "Tres Leches Cake", a: "$80", b: "$140" },
      ],
    },
  ],
  Mediterranean: [
    {
      id: "mediterranean",
      title: "Mediterranean Selections",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Lemon Herb Chicken", a: "$150", b: "$250" },
        { name: "Beef Kabobs", a: "$175", b: "$275" },
        { name: "Gyro Meat", a: "$150", b: "$250" },
        { name: "Falafel", a: "$120", b: "$200" },
        { name: "Hummus", a: "$80", b: "$140" },
        { name: "Tabbouleh", a: "$80", b: "$140" },
        { name: "Greek Salad", a: "$80", b: "$140" },
        { name: "Rice Pilaf", a: "$80", b: "$140" },
        { name: "Roasted Vegetables", a: "$80", b: "$140" },
        { name: "Pita Bread (10 / 20 pcs)", a: "$40", b: "$70" },
        { name: "Baklava", a: "$80", b: "$140" },
      ],
    },
  ],
  Vegetarian: [
    {
      id: "vegetarian",
      title: "Vegetarian Selections",
      colA: "Half Pan",
      colB: "Full Pan",
      items: [
        { name: "Vegan Curry (Chickpeas & Vegetables)", a: "$120", b: "$200" },
        { name: "Stuffed Bell Peppers", a: "$120", b: "$200" },
        { name: "Baked 6 Cheese Mac", a: "$120", b: "$200" },
        { name: "Eggplant Parmesan", a: "$110", b: "$190" },
        { name: "Vegetable Stir-Fry", a: "$110", b: "$190" },
        { name: "Rice & Beans", a: "$80", b: "$140" },
        { name: "Collard Greens", a: "$80", b: "$140" },
        { name: "Roasted Vegetables", a: "$80", b: "$140" },
        { name: "Garden Salad", a: "$60", b: "$110" },
        { name: "Pasta Primavera", a: "$100", b: "$180" },
        { name: "Fruit Salad", a: "$60", b: "$110" },
      ],
      note: "Vegetarian does not mean vegan. Ask about dairy-free preparations and vegan options.",
    },
  ],
};

// ─── Desserts ─────────────────────────────────────────────────────────────────

const desserts: MenuTab = {
  id: "desserts",
  label: "Desserts",
  intro: "Signature pudding cups, mini cheesecakes, and cupcake collections — ordered by the dozen.",
  categories: [
    {
      id: "signature-desserts",
      title: "Chef Ty's Signature Desserts",
      colA: "Per Dozen",
      items: [
        { name: "Classic Berry Nana Nana Pudding Cups", a: "$85" },
        { name: "Strawberry Nana Nana Pudding Cups", a: "$90" },
        { name: "Churro Nana Nana Pudding Cups", a: "$100" },
        { name: "Classic Banana Pudding Cups", a: "$75" },
        { name: "Strawberry Banana Pudding Cups", a: "$85" },
        { name: "Bread Pudding Cups", a: "$85" },
        { name: "Pineapple Upside-Down Cake Minis", a: "$85" },
        { name: "Right-Side-Up Pineapple Cake Shooters", a: "$85" },
        { name: "Half-N-Half Cake Cups", a: "$110" },
        { name: "Classic Cheesecake Minis", a: "$95" },
        { name: "Smoked Cheesecake Minis", a: "$120" },
        { name: "Strawberry Crunch Cheesecake Minis", a: "$110" },
      ],
      note: "Half-N-Half Cake Cups combine banana pudding and strawberry crunch.",
    },
    {
      id: "mini-desserts",
      title: "Mini Desserts & Sweet Bites",
      colA: "Per Dozen",
      items: [
        { name: "Assorted Dessert Shooters", a: "$75" },
        { name: "Mini Cheesecake Cups", a: "$90" },
        { name: "Brownie Bites", a: "$55" },
        { name: "Gourmet Cookies", a: "$45" },
        { name: "Mini Cupcakes", a: "$45" },
        { name: "Specialty Cupcakes", a: "$65" },
        { name: "Mini Pies", a: "$75" },
        { name: "Assorted Premium Dessert Cups", a: "$90" },
      ],
    },
    {
      id: "sweet-five",
      title: "The Sweet Five & Premium Collection",
      colA: "Per Dozen",
      items: [
        { name: "Chocolate-Covered Strawberries", a: "$60" },
        { name: "Cheesecake Shooters", a: "$85" },
        { name: "Strawberry Shortcake Shooters", a: "$85" },
        { name: "Peach Cobbler Cups", a: "$90" },
        { name: "Sweet Potato Pie Cups", a: "$80" },
        { name: "Apple Cobbler Cups", a: "$90" },
        { name: "Red Velvet Cheesecake Cups", a: "$105" },
        { name: "Cookies & Cream Cheesecake Cups", a: "$95" },
        { name: "Seasonal Fruit Tartlets", a: "$95" },
        { name: "Premium Assorted Dessert Shooters", a: "$100" },
      ],
      note: "Package deals: The Sweet Five from $375 (5 doz / 60 pcs, up to 3 varieties). The Grand Ten from $700 (10 doz / 120 pcs, up to 5 varieties).",
    },
  ],
};

// ─── Beverages ────────────────────────────────────────────────────────────────

const beverages: MenuTab = {
  id: "beverages",
  label: "Beverages",
  intro: "Signature teas, fresh juices, and beverage station service to complete your event.",
  categories: [
    {
      id: "gallon-beverages",
      title: "Brunch Beverages",
      colA: "Per Gallon",
      items: [
        { name: "Fresh Fruit Punch", a: "$45" },
        { name: "Berry Lemonade", a: "$45" },
        { name: "Sweet Tea", a: "$30" },
        { name: "Unsweet Tea", a: "$30" },
        { name: "Orange Juice", a: "$45" },
        { name: "Apple Juice", a: "$40" },
        { name: "Bottled Water", a: "$20 / 24-pack" },
      ],
      note: "Specialty flavors, individual packaging, and stations are quoted separately.",
    },
  ],
  customNote:
    "Beverage stations (coffee, hot chocolate, tea, mimosa bar setup) and signature beverages — pineapple peach tea, infused lemonades, Ty's signature fruit punch — are available as a custom quote.",
};

// ─── Exports ──────────────────────────────────────────────────────────────────

export const menuTabs: MenuTab[] = [breakfast, brunch, desserts, beverages];

/** Featured dishes shown in the animated dish stream section. Real prices from the catalog. */
export const featuredDishes = [
  { name: "Jerk Chicken", note: "Caribbean classic", half: "$150", full: "$250", tag: "Jamaican" },
  { name: "Chicken & Waffles", note: "Brunch centerpiece", half: "$125", full: "$245", tag: "Brunch" },
  { name: "Shrimp & Grits", note: "Rich southern brunch", half: "$145", full: "$285", tag: "Brunch" },
  { name: "Baked 6 Cheese Mac", note: "The crowd pleaser", half: "$120", full: "$200", tag: "Vegetarian" },
  { name: "BBQ Ribs", note: "American smokehouse", half: "$200", full: "$350", tag: "American" },
  { name: "Lemon Herb Chicken", note: "Light & aromatic", half: "$150", full: "$250", tag: "Mediterranean" },
  { name: "Oxtail Stew", note: "Slow-braised comfort", half: "$225", full: "$375", tag: "Jamaican" },
  { name: "Beef Kabobs", note: "Grilled to order", half: "$175", full: "$275", tag: "Mediterranean" },
] as const;
