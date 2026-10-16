# Site Content — Taste of Ty's Kitchen

Real copy supplied by the business owner. Use this instead of inventing text.

**Source:** `Website details .pdf` — a printed email from Tiesha Baines
(`tyskitchen19@yahoo.com`) to `creativelyinkdbyt@gmail.com`, sent May 4, subject
"Taste of Ty's kitchen website info". Extracted 2026-10-09.

**Status of this document:** the prose below is verbatim owner-supplied copy and is
safe to publish. Anything marked **[MISSING]** was requested in the email but did not
survive text extraction, or was left blank by the owner — it must be filled from the
owner before launch. Do not invent values for those.

---

## Naming conflict — decide before building

Three different names appear across the project materials:

| Name | Where it appears |
|---|---|
| **Taste of Ty's Kitchen** | Owner's email, business plan title, repo name, award photo |
| **Ty's Kitchen** | Brand guidelines PDF, logo wordmark, email domain `tyskitchen.org` |
| **Chef Ty's Kitchen** | `.github/agents/chef-tys-kitchen-spec.agent.md`, `zeff-catering-style.md` |

The logo artwork reads "Ty's Kitchen" while every business document says "Taste of Ty's
Kitchen". **This is an open decision** — it drives the wordmark, page titles, metadata,
and domain. Do not pick one silently.

---

## Sections the owner asked for

In the order given in the email:

1. About the owner — paragraph + photo of owner
2. About the company
3. Vision statement
4. Mission statement
5. Core values
6. Gallery — "10–12" pictures ("if not we will use stock photos")
7. Contact information
8. Social media links

---

## About the owner

**[MISSING]** The email lists the heading "About the owner paragraph (pic of owner)"
but contains no paragraph text. Request this from the owner, along with the photo.

Candidate photos already on hand: `chefty-candid-1.JPG`, `chef-ty-barnes-nobles.jpeg`,
`chef-ty-plating.jpg`.

---

## About the company

> Taste of Ty's Kitchen is a full-service mobile catering company with over 5 years of
> experience delivering elevated, globally inspired cuisine. We specialize in catering,
> meal prep, daily meals, cooking classes, and personalized nutrition-based meal plans
> designed to fit each client's lifestyle.
>
> What sets us apart is our fully customized experience. Every client receives a VIP
> consultation where we tailor menus to their vision, dietary needs, and event goals —
> whether that includes vegan, gluten-free, or flexible menu options.
>
> Beyond food, we provide a seamless, one-stop-shop experience with add-on services
> including bartending, bakery creations, event planning, and full setup.
>
> At our core, we believe food is meant to bring people together — and give back. A
> portion of our proceeds goes toward feeding the homeless in our community every week.
>
> Great food with purpose. Elevated experiences, every time.

**Tagline candidate:** "Great food with purpose. Elevated experiences, every time."

---

## Vision statement

> Taste of Ty's Kitchen exists to become a nationally recognized culinary brand that
> transforms the way people experience food — by blending culture, creativity, and
> community into every meal, while building a legacy that inspires others to create
> something from nothing.

## Mission statement

> Our mission is to deliver elevated, customized culinary experiences through catering,
> meal services, and curated menus that reflect each client's unique vision. We are
> committed to quality, inclusivity, and impact — serving diverse dietary needs while
> using our platform to give back and nourish our community.

---

## Core values

Seven values, each with owner-written body copy. Good candidate for a card grid.

**Customization Over Convenience**
> We don't do one-size-fits-all. Every client receives a tailored culinary experience
> designed around their vision, preferences, and lifestyle.

**Excellence in Every Detail**
> From presentation to flavor, we execute at a high level — because premium experiences
> create lasting impressions.

**Cultural Creativity**
> We celebrate global flavors and diverse cuisines, bringing bold, innovative dishes
> that tell a story on every plate.

**Community Impact**
> We believe food is a tool for change. Giving back — like feeding the homeless — is not
> an add-on, it's part of who we are.

**Consistency & Discipline**
> We show up, deliver, and improve — every single time. No shortcuts, no excuses.

**Client Experience First**
> We don't just serve food — we create moments. Every interaction is designed to feel
> seamless, personal, and unforgettable.

**Growth & Legacy**
> We are building more than a business — we are building a brand that teaches, inspires,
> and creates opportunities for others.

---

## Services

Named by the owner in the "About the company" copy. **No prices were supplied** — do not
publish any price or package tier.

Core services:
- Catering (full-service, mobile)
- Meal prep
- Daily meals
- Cooking classes
- Personalized nutrition-based meal plans

Add-on services:
- Bartending
- Bakery creations
- Event planning
- Full setup

Dietary accommodations explicitly claimed: vegan, gluten-free, flexible menu options.

Process detail worth featuring: **every client receives a VIP consultation.**

---

## Contact

| Field | Value |
|---|---|
| Email | `info@tyskitchen.org` |
| Toll free | **[MISSING]** — label present in email, number blank |
| Local | **[MISSING]** — label present in email, number blank |
| Instagram | **[MISSING/PARTIAL]** — extracted as `@ty` + `kitchen`; likely `@tyskitchen` or `@ty_kitchen`, unconfirmed |
| Facebook | `@tasteoftyskitchen` |
| Service area | **[MISSING]** — never stated. Required for a *mobile* caterer. |
| Physical address | **2839 Annapolis Rd, Baltimore, MD 21230** — supplied by the owner in chat, 2026-10-16. Shown on contact, footer, booking, and the map. |

Do not publish a phone number, Instagram handle, or service area until the owner
confirms them. A mobile caterer with no stated service area is a real conversion
problem — worth raising with the owner.

---

## Things the site must NOT claim

Per `.github/agents/chef-tys-kitchen-spec.agent.md`, and because the research reference
(`docs/zeff-catering-style.md`) describes a *different company*:

- No prices, packages, or minimums — none were supplied
- No client logos, awards, or testimonials beyond what's evidenced
- No guaranteed turnaround, capacity, or staffing claims
- Nothing carried over from the Zeffert & Gold reference site
- No certifications, licensing, or insurance claims

The one award asset on hand is `taste-of-tys-award.jpeg`. Confirm what it is before
captioning it.

---

## Additional facts from the owner's menus (added 2026-10-16)

**Sources:** `Taste_of_Tys_Kitchen_Menu_Styled.pdf.pdf` (the owner's catering menu) and
`taste-of-ty-site-pics/menu-example.pdf` (a "Small Bite Tasting Menu" made for the
Baltimore Met Gala). Both are owner-produced and gitignored; page 1 of each was rendered
and read by eye.

**Naming:** both menus and the logo artwork itself read **"Taste of Ty's Kitchen"**.
The site uses that name, set in one place (`src/content/site.ts`).

**Contact facts these resolve:**

| Field | Value | Seen on |
|---|---|---|
| Business phone | **443.226.3279** — supplied by the owner in chat, 2026-10-16. Replaces the 866.668.4669 toll-free number printed on both menus. | owner |
| Instagram | `@ty_s_kitchen` | Met Gala menu |
| Base | Baltimore, MD (menu lists 210 S. Central Avenue, Baltimore, MD 21202) | styled menu |

The site shows "Baltimore, MD" only, not the street address, since this is a mobile
business. Service area beyond that is still **[MISSING]**.

**Taglines on the menus:** "A Global Fusion Catering Experience" · "Elegant Flavor •
Vibrant Vibe • Dietary Friendly" · "Great food is our love language." · "Now Booking –
Secure Your Date" · "Celebrating 5 years of food, family & passion".

**Catering menu (styled menu):**

- Appetizers: Fried Plantains · Mozzarella Caprese Salad · Southwest Bean Salad ·
  Broccoli Slaw or Cole Slaw · Meatballs (Gravy, Ty's Sauce, BBQ) · Signature Skewers
  (Chicken, Veggie, or Shrimp) · Garden Salad or Caesar Salad · Italian Pasta Salad
- Entrées: Chicken (Baked, Marsala style, Caribbean Jerk style, or Mediterranean style) ·
  Pork or Beef (Gravy, Grilled, or BBQ) · Fish (Lemon Pepper, Cajun, or Stewed) ·
  Mushrooms (Stewed, Baked, Flash Fried) · Tofu (Curried, Caribbean Jerk, or Korean BBQ)
- Sides: Garlic Mashed Potatoes · Yellow Saffron Rice or Cilantro Lime Rice · 6 Cheese
  Mac · Lo Mein · Asparagus · Green Beans · Mixed Greens · Broccolini
- Dietary options: Vegetarian · Vegan · Gluten-Free Friendly
- Service styles: Drop-Off · Buffet · Full-Service
- Add-ons: Beverage Station · Dessert Table · Seafood Upgrade · Staffing · Live Cooking
  Experience

**Packages:** the styled menu lists Silver, Signature Gold ("Most Popular") and VIP
Platinum packages with per-person starting prices. **The site shows the package names
and what each includes, but not the prices** — hard rule 1 says no prices, and menu
prices go stale. Publishing them is the owner's call.

- Silver: 2 entrées, 2 sides, 1 appetizer
- Signature Gold (most popular): 3 entrées, 3 sides, 2 appetizers
- VIP Platinum: 3 appetizers, 2 entrées, 1 premium entrée, 3 sides, 1 cold salad,
  1 premium cold salad, 1 dessert

**Small-bite tasting menu (Met Gala):** Kale Power Salad with lemon honey vinaigrette ·
Cajun Honey Salmon over yellow rice · Pineapple Upside Down Cake Shooters. Descriptions
on the poster are the owner's; the site paraphrases nothing beyond the dish names and
their listed components.
