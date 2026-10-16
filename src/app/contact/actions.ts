"use server";

import { contactSchema, type ContactField, type ContactState } from "@/lib/contact";
import { getSupabase } from "@/lib/supabase";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (text(formData, "company_website") !== "") {
    return { status: "success", firstName: "" };
  }

  const parsed = contactSchema.safeParse({
    fullName: text(formData, "fullName"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    message: text(formData, "message"),
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as ContactField] = issue.message;
      }
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { status: "unconfigured" };
  }

  const data = parsed.data;
  const { error } = await supabase.from("contact_messages").insert({
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    message: data.message,
  });

  if (error) {
    console.error("contact insert failed", error.code);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again, or call or email us.",
    };
  }

  return { status: "success", firstName: data.fullName.split(/\s+/)[0] ?? "" };
}
