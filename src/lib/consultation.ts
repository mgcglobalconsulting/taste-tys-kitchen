import { z } from "zod";

import { services } from "@/content/services";

export const serviceOptions = services.map((service) => ({ value: service.slug, label: service.name }));

export const serviceStyleOptions = [
  { value: "drop-off", label: "Drop-off" },
  { value: "buffet", label: "Buffet" },
  { value: "full-service", label: "Full-service" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const consultWindowOptions = [
  { value: "weekday-morning", label: "Weekday morning" },
  { value: "weekday-afternoon", label: "Weekday afternoon" },
  { value: "weekday-evening", label: "Weekday evening" },
  { value: "weekend", label: "Weekend" },
] as const;

export const dietaryTagOptions = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "other", label: "Other (tell us below)" },
] as const;

export const addOnOptions = [
  { value: "bartending", label: "Bartending" },
  { value: "bakery", label: "Bakery creations" },
  { value: "event-planning", label: "Event planning" },
  { value: "full-setup", label: "Full setup" },
  { value: "beverage-station", label: "Beverage station" },
  { value: "dessert-table", label: "Dessert table" },
  { value: "staffing", label: "Staffing" },
  { value: "live-cooking", label: "Live cooking experience" },
] as const;

const values = <T extends readonly { value: string }[]>(options: T) =>
  options.map((option) => option.value) as [T[number]["value"], ...T[number]["value"][]];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value === "" ? null : value));

export const consultationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((value) => value === "" || /^[0-9+().\-\s]{7,}$/.test(value), "Please enter a valid phone number.")
    .transform((value) => (value === "" ? null : value)),
  service: z.enum(values(serviceOptions), { message: "Choose the service you're interested in." }),
  eventDate: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), "Please choose a valid date.")
    .transform((value) => (value === "" ? null : value)),
  guestCount: z
    .string()
    .trim()
    .refine((value) => value === "" || (/^\d+$/.test(value) && Number(value) > 0 && Number(value) <= 100000), "Enter a number of guests.")
    .transform((value) => (value === "" ? null : Number(value))),
  serviceStyle: z.enum(values(serviceStyleOptions)).nullable(),
  consultWindow: z.enum(values(consultWindowOptions), { message: "Pick a time that works for your consultation." }),
  dietaryTags: z.array(z.enum(values(dietaryTagOptions))).max(dietaryTagOptions.length),
  addOns: z.array(z.enum(values(addOnOptions))).max(addOnOptions.length),
  message: optionalText(2000),
});

export type Consultation = z.infer<typeof consultationSchema>;

export type ConsultationField = keyof Consultation;

export type ConsultationState =
  | { status: "idle" }
  | { status: "success"; firstName: string }
  | { status: "unconfigured" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<ConsultationField, string>> };
