"use client";

import { CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import { startTransition, useActionState, useId, type FormEvent, type ReactNode } from "react";

import { sendContactMessage } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import type { ContactState } from "@/lib/contact";

const initialState: ContactState = { status: "idle" };

const controlClass =
  "mt-2 block w-full rounded-[var(--radius-control)] border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-smoke/70 transition-colors focus:border-ink focus:outline-none aria-[invalid=true]:border-pinot";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-ink">
        {label}
        {required ? <span className="text-pinot"> *</span> : <span className="font-normal text-smoke"> (optional)</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined })}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-bold text-pinot">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  // Submit via a transition so React keeps the fields when validation fails.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[var(--radius-media)] border border-line bg-white p-8 sm:p-12">
        <CheckCircle2 className="size-10 text-pinot" aria-hidden />
        <h3 className="mt-6 text-3xl">Thank you{state.firstName ? `, ${state.firstName}` : ""}.</h3>
        <p className="mt-4 text-lg text-smoke">Your message is in. We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit} noValidate className="space-y-6">
      {state.status === "unconfigured" ? (
        <div role="alert" className="rounded-[var(--radius-media)] border border-pinot bg-white p-5">
          <p className="font-bold text-ink">The contact form isn&apos;t connected yet.</p>
          <p className="mt-1 text-smoke">Your message wasn&apos;t sent. Please reach us directly.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <a href={`mailto:${site.contact.email}`}>
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

      <Field label="Full name" required error={errors.fullName}>
        {(props) => <input {...props} name="fullName" autoComplete="name" className={controlClass} />}
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Email" required error={errors.email}>
          {(props) => <input {...props} type="email" name="email" autoComplete="email" className={controlClass} />}
        </Field>
        <Field label="Phone" error={errors.phone}>
          {(props) => <input {...props} type="tel" name="phone" autoComplete="tel" className={controlClass} />}
        </Field>
      </div>
      <Field label="Message" required error={errors.message}>
        {(props) => <textarea {...props} name="message" rows={5} className={controlClass} />}
      </Field>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-smoke">We&apos;ll only use your details to reply to you.</p>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? <Loader2 className="animate-spin" aria-hidden /> : null}
          {pending ? "Sending" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
