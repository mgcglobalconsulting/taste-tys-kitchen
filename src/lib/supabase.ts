import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for public inserts. Uses the anon key: the
 * `consultation_requests` RLS policy allows anonymous INSERT and nothing else,
 * so no service-role secret is needed for the booking form.
 *
 * Returns null when Supabase is not configured, so the site still builds and
 * runs before the project is connected.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
