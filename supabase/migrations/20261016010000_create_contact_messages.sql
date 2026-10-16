-- General messages from the contact page form (/contact).
-- Same model as consultation_requests: anon may insert new, unread messages
-- and nothing else. Staff read them in the Supabase dashboard for now.

create type public.contact_message_status as enum ('new', 'replied', 'closed');

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status public.contact_message_status not null default 'new',

  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) <= 254 and email like '%@%'),
  phone text check (char_length(phone) <= 40),
  message text not null check (char_length(message) between 2 and 2000)
);

create index contact_messages_created_at_idx on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

create policy "Public can send contact messages"
  on public.contact_messages
  for insert
  to anon
  with check (status = 'new');

revoke all on public.contact_messages from anon, authenticated;
grant insert (full_name, email, phone, message) on public.contact_messages to anon;
