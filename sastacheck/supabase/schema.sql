-- SastaCheck database. Run once in Supabase: SQL Editor -> New query -> paste -> Run.

create table if not exists products (
  id text primary key,
  en text not null, ur text, brand text, cat text,
  aliases text[] default '{}',
  pack numeric not null default 1, unit text not null, pack_label text,
  official numeric, official_sample boolean default false,
  sort int default 99
);

create table if not exists stores (
  id text primary key default gen_random_uuid()::text,
  name text not null, type text default 'local', city text, delivery text,
  sort int default 50, created_by uuid references auth.users(id)
);

-- Every price report is kept. Nothing is overwritten: history is the asset.
create table if not exists obs (
  id text primary key default gen_random_uuid()::text,
  sid text not null references stores(id),
  city text not null,
  at date not null,
  items jsonb not null,            -- [{"pid":"p1","price":470}, ...]
  source text not null check (source in ('sample','community','receipt')),
  by uuid references auth.users(id) default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists obs_city_idx on obs (city, at);

create table if not exists baskets (
  user_id uuid primary key references auth.users(id) default auth.uid(),
  items jsonb not null default '{}', updated_at timestamptz default now()
);

create table if not exists admins (user_id uuid primary key references auth.users(id));

alter table products enable row level security;
alter table stores   enable row level security;
alter table obs      enable row level security;
alter table baskets  enable row level security;
alter table admins   enable row level security;

create or replace function is_admin() returns boolean language sql stable security definer set search_path = public
  as $$ select exists (select 1 from admins where user_id = auth.uid()) $$;

-- Anyone can read prices; signed-in people can add; only admins edit or delete.
create policy "read products" on products for select using (true);
create policy "admin products" on products for all using (is_admin()) with check (is_admin());
create policy "read stores" on stores for select using (true);
create policy "add stores" on stores for insert to authenticated with check (created_by = auth.uid());
create policy "admin stores" on stores for delete using (is_admin());
create policy "read obs" on obs for select using (true);
create policy "add obs" on obs for insert to authenticated with check (by = auth.uid() and source <> 'sample');
create policy "delete obs" on obs for delete using (is_admin() or by = auth.uid());
create policy "own basket" on baskets for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "see own admin row" on admins for select using (user_id = auth.uid());

-- Store owners asking to list their prices (from the website's "For stores" form).
create table if not exists leads (
  id bigint generated always as identity primary key,
  name text not null, email text not null, phone text, area text, message text,
  file_path text, created_at timestamptz not null default now()
);
alter table leads enable row level security;
create policy "anyone can send a lead" on leads for insert to anon, authenticated with check (true);
create policy "admins read leads" on leads for select using (is_admin());

-- Price lists stores upload with that form: upload only, admins read.
insert into storage.buckets (id, name, public, file_size_limit) values ('price-lists','price-lists',false,10485760)
  on conflict (id) do nothing;
create policy "upload price lists" on storage.objects for insert to anon, authenticated with check (bucket_id = 'price-lists');
create policy "admins read price lists" on storage.objects for select using (bucket_id = 'price-lists' and is_admin());
