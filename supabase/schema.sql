create table if not exists public.app_state (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;

create or replace function public.obra_certa_request_key()
returns text
language sql
stable
as $$
  select coalesce(
    nullif(current_setting('request.headers', true)::json ->> 'x-obra-certa-key', ''),
    ''
  );
$$;

drop policy if exists "Secure read app_state" on public.app_state;
create policy "Secure read app_state"
on public.app_state
for select
to anon
using (
  public.obra_certa_request_key() = coalesce(payload ->> 'accessKey', '')
);

drop policy if exists "Secure insert app_state" on public.app_state;
create policy "Secure insert app_state"
on public.app_state
for insert
to anon
with check (
  public.obra_certa_request_key() <> ''
  and public.obra_certa_request_key() = coalesce(payload ->> 'accessKey', '')
);

drop policy if exists "Secure update app_state" on public.app_state;
create policy "Secure update app_state"
on public.app_state
for update
to anon
using (
  coalesce(payload ->> 'accessKey', '') = ''
  or public.obra_certa_request_key() = coalesce(payload ->> 'accessKey', '')
)
with check (
  public.obra_certa_request_key() <> ''
  and public.obra_certa_request_key() = coalesce(payload ->> 'accessKey', '')
);
