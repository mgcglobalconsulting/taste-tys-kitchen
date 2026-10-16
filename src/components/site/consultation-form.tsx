"use client";

import { CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import { startTransition, useActionState, useId, type FormEvent, type ReactNode } from "react";

import { requestConsultation } from "@/app/book/actions";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import {
  addOnOptions,
  consultWindowOptions,
  dietaryTagOptions,
  serviceOptions,
  serviceStyleOptions,
  type ConsultationField,
  type ConsultationState,
} from "@/lib/consultation";
import { cn } from "@/lib/utils";

const initialState: ConsultationState = { status: "idle" };

const controlClass =
  "mt-2 block w-full rounded-[var(--radius-control)] border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-smoke/70 transition-colors focus:border-ink focus:outline-none aria-[invalid=true]:border-pinot";

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  /** Kept for readability at call sites; the control sets its own name. */
  name: ConsultationField;
  required?: boolean;
  error?: string;
  hint?: string;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
}) {
  const id = useId();
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ");
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-ink">
        {label}
        {required ? <span className="text-pinot"> *</span> : <span className="font-normal text-smoke"> (optional)</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy || undefined })}
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-smoke">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-bold text-pinot">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function CheckboxGroup({
  legend,
  name,
  options,
}: {
  legend: string;
  name: "dietaryTags" | "addOns";
  options: readonly { value: string; label: string }[];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-ink">
        {legend} <span className="font-normal text-smoke">(optional)</span>
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer select-none rounded-full border border-line bg-white px-4 py-2 text-sm transition-colors hover:border-ink has-[:checked]:border-pinot has-[:checked]:bg-pinot has-[:checked]:text-creme has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pinot"
          >
            <input type="checkbox" name={name} value={option.value} className="sr-only" />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ConsultationForm({ defaultService }: { defaultService?: string }) {
  const [state, formAction, pending] = useActionState(requestConsultation, initialState);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  // Submit via a transition rather than <form action> so React doesn't reset
  // the fields when the server returns validation errors.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[var(--radius-media)] border border-line bg-white p-8 sm:p-12">
        <CheckCircle2 className="size-10 text-pinot" aria-hidden />
        <h2 className="mt-6 text-4xl">
          Thank you{state.firstName ? `, ${state.firstName}` : ""}.
        </h2>
        <p className="mt-4 text-lg text-smoke">
          Your consultation request is in. We&apos;ll reach out to confirm a time that works for you.
          Need us sooner? Call{" "}
          <a href={site.contact.phoneHref} className="font-bold text-pinot underline-offset-4 hover:underline">
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit} noValidate className="space-y-8">
      {state.status === "unconfigured" ? (
        <div role="alert" className="rounded-[var(--radius-media)] border border-pinot bg-white p-5">
          <p className="font-bold text-ink">Online booking isn&apos;t connected yet.</p>
          <p className="mt-1 text-smoke">
            Your details weren&apos;t sent. Please reach us directly and we&apos;ll set up your consultation.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <a href={`mailto:${site.contact.email}?subject=${encodeURIComponent("VIP consultation request")}`}>
                <Mail aria-hidden /> Email us
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={site.contact.phoneHref}>
                <Phone aria-hidden /> {site.contact.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      ) : null}

      {state.status === "error" ? (
        <p role="alert" className="rounded-[var(--radius-media)] border border-pinot bg-white p-4 font-bold text-pinot">
          {state.message}
        </p>
      ) : null}

      <div className="hidden" aria-hidden>
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="space-y-6">
        <legend className="eyebrow mb-2">About you</legend>
        <Field label="Full name" name="fullName" required error={errors.fullName}>
          {(props) => <input {...props} name="fullName" autoComplete="name" className={controlClass} />}
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Email" name="email" required error={errors.email}>
            {(props) => <input {...props} type="email" name="email" autoComplete="email" className={controlClass} />}
          </Field>
          <Field label="Phone" name="phone" error={errors.phone}>
            {(props) => <input {...props} type="tel" name="phone" autoComplete="tel" className={controlClass} />}
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-6 border-t border-line pt-8">
        <legend className="eyebrow mb-2">Your event or service</legend>
        <Field label="I'm interested in" name="service" required error={errors.service}>
          {(props) => (
            <select {...props} name="service" defaultValue={defaultService ?? ""} className={controlClass}>
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Event or start date" name="eventDate" error={errors.eventDate}>
            {(props) => <input {...props} type="date" name="eventDate" className={controlClass} />}
          </Field>
          <Field label="Estimated guests" name="guestCount" error={errors.guestCount}>
            {(props) => (
              <input {...props} type="number" inputMode="numeric" min={1} name="guestCount" className={controlClass} />
            )}
          </Field>
        </div>
        <Field label="Service style" name="serviceStyle" error={errors.serviceStyle}>
          {(props) => (
            <select {...props} name="serviceStyle" defaultValue="" className={controlClass}>
              <option value="">Choose one</option>
              {serviceStyleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </Field>
        <CheckboxGroup legend="Dietary needs" name="dietaryTags" options={dietaryTagOptions} />
        <CheckboxGroup legend="Add-ons you're considering" name="addOns" options={addOnOptions} />
      </fieldset>

      <fieldset className="space-y-6 border-t border-line pt-8">
        <legend className="eyebrow mb-2">Your consultation</legend>
        <fieldset>
          <legend className="text-sm font-bold text-ink">
            Best time for your consultation <span className="text-pinot">*</span>
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {consultWindowOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-[var(--radius-control)] border border-line bg-white px-4 py-3 transition-colors hover:border-ink has-[:checked]:border-pinot has-[:checked]:text-pinot",
                  errors.consultWindow && "border-pinot",
                )}
              >
                <input type="radio" name="consultWindow" value={option.value} className="size-4 accent-[var(--color-pinot)]" />
                {option.label}
              </label>
            ))}
          </div>
          {errors.consultWindow ? (
            <p className="mt-1.5 text-sm font-bold text-pinot">{errors.consultWindow}</p>
          ) : null}
        </fieldset>
        <Field
          label="Tell us about your vision"
          name="message"
          error={errors.message}
          hint="Theme, favorite dishes, allergies, venue, anything that helps us prepare."
        >
          {(props) => <textarea {...props} name="message" rows={5} className={controlClass} />}
        </Field>
      </fieldset>

      <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-smoke">We&apos;ll only use your details to plan your consultation.</p>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? <Loader2 className="animate-spin" aria-hidden /> : null}
          {pending ? "Sending" : "Request my consultation"}
        </Button>
      </div>
    </form>
  );
}
