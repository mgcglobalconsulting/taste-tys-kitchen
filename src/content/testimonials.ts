/**
 * Client testimonials.
 *
 * ⚠️  PLACEHOLDER — These are example entries only.
 * The owner (Tiesha B. Quezada) must supply real client reviews before
 * these go live. Do not publish placeholder text on the production site.
 * Hard rule: no invented testimonials beyond what is evidenced in docs/CONTENT.md.
 */
export type Testimonial = {
  id: string;
  /** The review body — 1–3 sentences, first-person voice. */
  body: string;
  /** Display name (first name + last initial is fine). */
  author: string;
  /** Event type and city, e.g. "Corporate Dinner · Baltimore". */
  occasion: string;
  /** Two-letter initials for the avatar badge. */
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    body: "The food at our corporate dinner was absolutely incredible. Every dish was beautifully presented and the flavors were unlike anything we had experienced at a catered event. Chef Ty and her team were professional, prompt, and made the entire evening seamless.",
    author: "Andrea M.",
    occasion: "Corporate Dinner · Baltimore",
    initials: "AM",
  },
  {
    id: "t2",
    body: "We booked Chef Ty for our private milestone celebration and she completely exceeded our expectations. The VIP consultation made us feel like her only clients. The lamb chops and salmon were the highlights of the evening.",
    author: "Derrick & Tanya W.",
    occasion: "Private Celebration · Baltimore",
    initials: "DW",
  },
  {
    id: "t3",
    body: "From the first consultation to the last bite, working with Taste of Ty's Kitchen was effortless. The globally inspired menu she crafted had guests asking for her contact all night long. We will be back for every event.",
    author: "Simone K.",
    occasion: "Birthday Gala · Baltimore",
    initials: "SK",
  },
];
