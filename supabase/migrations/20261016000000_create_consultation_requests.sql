-- Consultation requests from the public booking form (/book).
-- Anon may insert pending requests only; see policy below.

create type public.consultation_status as enum ('pending', 'approved', 'quoted', 'deposit_paid', 'closed');

create table public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status public.consultation_status not null default 'pending',

  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) <= 254 and email like '%@%'),
  phone text check (char_length(phone) <= 40),

  service text not null check (
    service in ('catering', 'meal-prep', 'meal-plans', 'cooking-classes', 'add-ons')
  ),
  event_date date,
  guest_count integer check (guest_count > 0 and guest_count <= 100000),
  service_style text check (service_style in ('drop-off', 'buffet', 'full-service', 'not-sure')),
  consult_window text not null check (
    consult_window in ('weekday-morning', 'weekday-afternoon', 'weekday-evening', 'weekend')
  ),
  dietary_tags text[] not null default '{}',
  add_ons text[] not null default '{}',
  message text check (char_length(message) <= 2000)
);

create index consultation_requests_created_at_idx on public.consultation_requests (created_at desc);
create index consultation_requests_status_idx on public.consultation_requests (status);

alter table public.consultation_requests enable row level security;

-- The public form may only create new, pending requests. No reads, updates,
-- or deletes for anon; staff access comes later through authenticated roles.
create policy "Public can submit consultation requests"
  on public.consultation_requests
  for insert
  to anon
  with check (status = 'pending');

revoke all on public.consultation_requests from anon, authenticated;
grant insert (
  full_name, email, phone, service, event_date, guest_count,
  service_style, consult_window, dietary_tags, add_ons, message
) on public.consultation_requests to anon;
