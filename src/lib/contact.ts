import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((value) => value === "" || /^[0-9+().\-\s]{7,}$/.test(value), "Please enter a valid phone number.")
    .transform((value) => (value === "" ? null : value)),
  message: z.string().trim().min(2, "Please write a short message.").max(2000, "Please keep it under 2,000 characters."),
});

export type ContactMessage = z.infer<typeof contactSchema>;

export type ContactField = keyof ContactMessage;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; firstName: string }
  | { status: "unconfigured" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<ContactField, string>> };
