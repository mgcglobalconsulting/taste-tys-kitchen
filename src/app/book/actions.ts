"use server";

import { consultationSchema, type ConsultationField, type ConsultationState } from "@/lib/consultation";
import { getSupabase } from "@/lib/supabase";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function requestConsultation(
  _previous: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  // Honeypot: real visitors never see or fill this field.
  if (text(formData, "company_website") !== "") {
    return { status: "success", firstName: "" };
  }

  const parsed = consultationSchema.safeParse({
    fullName: text(formData, "fullName"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    service: text(formData, "service"),
    eventDate: text(formData, "eventDate"),
    guestCount: text(formData, "guestCount"),
    serviceStyle: text(formData, "serviceStyle") || null,
    consultWindow: text(formData, "consultWindow"),
    dietaryTags: formData.getAll("dietaryTags").filter((v): v is string => typeof v === "string"),
    addOns: formData.getAll("addOns").filter((v): v is string => typeof v === "string"),
    message: text(formData, "message"),
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<ConsultationField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as ConsultationField] = issue.message;
      }
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { status: "unconfigured" };
  }

  const data = parsed.data;
  const { error } = await supabase.from("consultation_requests").insert({
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    service: data.service,
    event_date: data.eventDate,
    guest_count: data.guestCount,
    service_style: data.serviceStyle,
    consult_window: data.consultWindow,
    dietary_tags: data.dietaryTags,
    add_ons: data.addOns,
    message: data.message,
  });

  if (error) {
    console.error("consultation insert failed", error.code);
    return {
      status: "error",
      message: "Something went wrong sending your request. Please try again, or call or email us.",
    };
  }

  return { status: "success", firstName: data.fullName.split(/\s+/)[0] ?? "" };
}
