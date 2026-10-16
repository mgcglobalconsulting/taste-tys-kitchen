import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for public inserts. Uses the publishable (anon)
 * key: the `consultation_requests` and `contact_messages` RLS policies allow
 * anonymous INSERT and nothing else, so no service-role secret is needed.
 *
 * Returns null when Supabase is not configured, so the site still builds and
 * runs before the project is connected.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
