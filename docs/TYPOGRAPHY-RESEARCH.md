# Typography Research — TOTK Catering Co.

**Source analyzed:** Elementor — "26 Best Fonts for Websites & Web Design"  
**Analyzed:** 2026-10-23  
**Purpose:** Font pairing recommendation for Taste of Ty's Kitchen / TOTK Catering Co. website.

---

## Site Profile (filters used in evaluation)

| Factor | Value |
|---|---|
| **Brand tone** | Premium, elevated, warm, globally inspired |
| **Primary audience** | Corporate clients, event planners, affluent individuals |
| **Palette** | Warm crème + pinot red + ink black + gold |
| **Current stack** | Fraunces (display) + Lato (body) |
| **Constraint** | Google Fonts only — no paid licenses in place |
| **Design pattern** | Display headings at wt 500–600, tight leading; italic word in Pinot as accent |

---

## Full Font Evaluation — All 26

| Font | Category | Fit Score | Notes |
|---|---|---|---|
| **Playfair Display** | Serif display | ⭐⭐⭐⭐⭐ | "Exudes classic elegance." 18th-century inspired. Premium food + hospitality. Beautiful italic. Google Fonts. |
| **Lato** | Sans-serif | ⭐⭐⭐⭐⭐ | "Balances warmth and professionalism." Already in the brand system. Perfect body font. Google Fonts. |
| **Raleway** | Sans-serif | ⭐⭐⭐⭐ | "Leans toward elegance." Luxury branding / lifestyle. Google Fonts. Good header option. |
| **Lora** | Serif | ⭐⭐⭐⭐ | "Calligraphic feel with graceful curves." Lifestyle / fashion / food. Google Fonts. |
| **Garamond** | Serif | ⭐⭐⭐⭐ | "Beautiful historical, elegant details." Luxury. Use EB Garamond variant on Google Fonts. Slightly academic. |
| **Merriweather** | Serif display | ⭐⭐⭐ | Warm, editorial. Better for lifestyle blog than corporate brand. Google Fonts. |
| **Work Sans** | Sans-serif | ⭐⭐⭐ | "Legibility with personality." Corporate / professional. Google Fonts. |
| **Montserrat** | Sans-serif | ⭐⭐⭐ | Strong and geometric. Contemporary. Works, but impersonal for food. Google Fonts. |
| **Open Sans** | Sans-serif | ⭐⭐ | Versatile workhorse. Too neutral for premium brand. |
| **Poppins** | Sans-serif | ⭐⭐ | Geometric/modern. Better for tech/startup. |
| **Crimson Text** | Serif | ⭐⭐ | Academic, literary. Not hospitality. |
| **Georgia** | Serif | ⭐⭐ | Safe and readable. Too traditional/legal. |
| **Nunito** | Sans-serif | ⭐ | Rounded, friendly, youthful. Wrong audience. |
| **Ubuntu** | Sans-serif | ⭐ | Tech/approachable. Not premium. |
| **Roboto** | Sans-serif | ⭐ | Android/tech DNA. Clinical feel on food brand. |
| **Source Sans Pro** | Sans-serif | ⭐ | Corporate neutral. Flat for this palette. |
| **Oswald** | Condensed sans | ✗ | News/sport vibe. Wrong tone. |
| **Quicksand** | Sans-serif | ✗ | Wellness app aesthetic. Too casual. |
| **Exo** | Geometric sans | ✗ | Futuristic/gaming. Completely wrong. |
| **Anton** | Bold sans | ✗ | Aggressive/impact. Not food. |
| **PT Sans** | Condensed sans | ✗ | Utilitarian. Not brand appropriate. |
| **Muli** | Sans-serif | ✗ | Reading-focused utility. No personality. |
| **Times New Roman** | Serif | ✗ | Legal/academic. Dated. |
| **Pacifico** | Handwriting | ✗ | Playful/casual. Not premium. |
| **Dancing Script** | Handwriting | ✗ | Wedding/personal. Not corporate. |
| **Yellowtail** | Handwriting | ✗ | Retro diner. Not the brand direction. |

---

## Explicit Pairings from the Elementor Article (relevant ones)

| Pairing | Notes |
|---|---|
| **Raleway + Lato** | Directly named. Elegant header + warm body. |
| **Playfair Display + minimalist sans-serif** | Named. Implies Lato, Work Sans, or similar. |
| **Open Sans + Merriweather** | Named. Too generic for this brand. |
| **Montserrat + Lora** | Named. Modern + calligraphic. Doesn't fit warm palette as well. |

---

## On the User's Suggestions

### Helvetica
- Not on Google Fonts. Requires paid licensing or OS system font reliance.
- Famous for Swiss/corporate neutrality (Apple, Lufthansa, American Airlines).
- Cold and clinical against this warm crème palette and food photography.
- Would strip the warmth from the design. **Not recommended.**

### Calibri
- Microsoft Office default. Not on Google Fonts.
- Projects spreadsheets and Word documents — antithetical to premium hospitality.
- Has no character or elevation suitable for this brand. **Not recommended.**

---

## Recommended Pairings

### #1 — BEST FIT: Playfair Display (headers) + Lato (body)

**Why Playfair Display:**
- The article says it "exudes classic elegance" — exactly the register of upscale corporate catering
- 18th-century inspiration signals white-tablecloth dining and culinary tradition
- Stunning italic variant dovetails perfectly with the existing design pattern (italic word in Pinot)
- Works at the wt 500–600 tight-leading display scale already in use
- Free on Google Fonts (SIL OFL)
- The article explicitly pairs it with "minimalist sans-serif" — which Lato is

**Why Lato:**
- Already in the brand system; already contrast-checked against the palette
- "Balances warmth and professionalism" — the exact right duality for corporate hospitality
- At 17–18px / 1.65 leading it is optimal for content-heavy pages like the corporate catalog
- Widely tested across the food + lifestyle sector

**Implementation:**
```
h1, h2, h3:  Playfair Display — wt 500–600, tight leading (1.05), italic in Pinot
Eyebrows:    Lato — wt 700, uppercase, 0.2em tracking, 12–13px
Body:        Lato — wt 400, 17–18px, 1.65 leading
```

---

### #2 — MODERN ALTERNATIVE: Raleway (headers) + Lato (body)

**Why this works:**
- The article names "Raleway + Lato" as a direct, validated pairing
- Raleway's elegance skews more contemporary/minimal vs. Playfair's classical richness
- Better choice if the brand direction shifts toward a cleaner, more fashion-forward aesthetic
- Both are Google Fonts (SIL OFL)

**Trade-off vs. #1:**
- Both Raleway and Lato are sans-serif → less visual contrast between header and body
- Playfair Display creates a stronger serif/sans-serif hierarchy that suits editorial-heavy content
  (like the full catering catalog) better than Raleway does

---

## Decision

**Use Playfair Display + Lato.**  

This is the pairing that most precisely matches the brand's premium food positioning.  
Lato is already installed. Adding Playfair Display requires one `next/font/google` import.

Fraunces (current display font) and Playfair Display occupy the same design space — both are  
soft, elegant serifs. Fraunces is warmer/more artisanal; Playfair is sharper/more fine-dining.  
For the **corporate menu page** in particular, Playfair Display is the stronger choice.

---

*Reference created 2026-10-23. Revisit if brand direction shifts from warm-premium toward modern-minimal.*
