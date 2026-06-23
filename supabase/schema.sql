-- Supabase schema for Sedap admin/member integration.
-- Run this file in the Supabase SQL Editor before enabling the React integration.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'member',
  tier text not null default 'bronze',
  total_points integer not null default 0,
  updated_at timestamp with time zone default now(),
  constraint profiles_role_check check (role in ('admin', 'member', 'guest')),
  constraint profiles_tier_check check (tier in ('bronze', 'silver', 'gold', 'platinum')),
  constraint profiles_total_points_check check (total_points >= 0)
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric not null check (price >= 0),
  stock integer not null check (stock >= 0),
  created_at timestamp with time zone default now()
);

insert into public.products (name, price, stock)
select item.name, item.price, item.stock
from (
  values
    ('Nasi Goreng Spesial', 28000, 40),
    ('Mie Goreng Seafood', 32000, 35),
    ('Ayam Geprek', 25000, 50),
    ('Ayam Bakar Madu', 35000, 30),
    ('Sate Ayam', 30000, 45),
    ('Soto Ayam', 24000, 40),
    ('Rawon Daging', 38000, 25),
    ('Rendang Sapi', 45000, 22),
    ('Bakso Urat', 27000, 45),
    ('Gado-Gado', 23000, 35),
    ('Capcay Seafood', 34000, 28),
    ('Kwetiau Goreng', 31000, 32),
    ('Nasi Liwet Komplit', 36000, 24),
    ('Bebek Goreng', 42000, 20),
    ('Sop Iga', 48000, 18),
    ('Pempek Kapal Selam', 26000, 35),
    ('Martabak Telur', 33000, 25),
    ('Udang Saus Padang', 52000, 18),
    ('Gurami Bakar', 65000, 15),
    ('Cumi Goreng Tepung', 43000, 20),
    ('Es Teh Manis', 8000, 100),
    ('Lemon Tea', 12000, 80),
    ('Jus Alpukat', 18000, 60),
    ('Jus Jeruk', 15000, 60),
    ('Kopi Susu Iced', 18000, 55),
    ('Cendol', 16000, 45),
    ('Pisang Goreng', 14000, 50),
    ('Klepon', 12000, 40)
) as item(name, price, stock)
where not exists (
  select 1
  from public.products
  where lower(products.name) = lower(item.name)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles(id) on delete set null,
  status text not null default 'pending',
  total_original numeric not null check (total_original >= 0),
  total_discount numeric not null check (total_discount >= 0),
  total_final numeric not null check (total_final >= 0),
  points_earned integer not null check (points_earned >= 0),
  created_at timestamp with time zone default now(),
  constraint orders_status_check check (status in ('pending', 'success', 'cancelled'))
);

alter table public.orders
add column if not exists status text not null default 'pending';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'orders_status_check'
  ) then
    alter table public.orders
    add constraint orders_status_check check (status in ('pending', 'success', 'cancelled'));
  end if;
end;
$$;

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  quantity integer not null check (quantity > 0),
  price_at_purchase numeric not null check (price_at_purchase >= 0)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, tier, total_points)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email, 'Member'),
    'member',
    'bronze',
    0
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_user_role() = 'admin', false);
$$;

create or replace function public.order_belongs_to_current_user(order_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.orders
    where id = order_uuid
      and customer_id = auth.uid()
  );
$$;

create or replace function public.tier_from_points(points integer)
returns text
language sql
immutable
as $$
  select case
    when points >= 1000 then 'platinum'
    when points >= 500 then 'gold'
    when points >= 100 then 'silver'
    else 'bronze'
  end;
$$;

create or replace function public.discount_rate_from_tier(member_tier text)
returns numeric
language sql
immutable
as $$
  select case member_tier
    when 'platinum' then 0.20
    when 'gold' then 0.15
    when 'silver' then 0.10
    else 0.05
  end;
$$;

create or replace function public.place_order(
  p_customer_id uuid,
  p_product_id uuid,
  p_quantity integer
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_member public.profiles%rowtype;
  v_product public.products%rowtype;
  v_total_original numeric;
  v_total_discount numeric;
  v_total_final numeric;
  v_points_earned integer;
  v_next_points integer;
  v_order_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if p_quantity <= 0 then
    raise exception 'Quantity must be greater than 0';
  end if;

  v_role := public.current_user_role();

  if coalesce(v_role, 'guest') <> 'admin' and p_customer_id <> auth.uid() then
    raise exception 'Members can only create orders for themselves';
  end if;

  select * into v_member
  from public.profiles
  where id = p_customer_id
  for update;

  if not found then
    raise exception 'Member not found';
  end if;

  select * into v_product
  from public.products
  where id = p_product_id
  for update;

  if not found then
    raise exception 'Product not found';
  end if;

  if v_product.stock < p_quantity then
    raise exception 'Insufficient stock';
  end if;

  v_total_original := v_product.price * p_quantity;
  v_total_discount := v_total_original * public.discount_rate_from_tier(v_member.tier);
  v_total_final := v_total_original - v_total_discount;
  v_points_earned := floor(v_total_final / 10000);
  v_next_points := v_member.total_points + v_points_earned;

  perform set_config('app.allow_profile_points_update', 'on', true);

  insert into public.orders (
    customer_id,
    status,
    total_original,
    total_discount,
    total_final,
    points_earned
  )
  values (
    p_customer_id,
    'pending',
    v_total_original,
    v_total_discount,
    v_total_final,
    v_points_earned
  )
  returning id into v_order_id;

  insert into public.order_items (
    order_id,
    product_id,
    quantity,
    price_at_purchase
  )
  values (
    v_order_id,
    p_product_id,
    p_quantity,
    v_product.price
  );

  update public.products
  set stock = stock - p_quantity
  where id = p_product_id;

  update public.profiles
  set
    total_points = v_next_points,
    tier = public.tier_from_points(v_next_points)
  where id = p_customer_id;

  return v_order_id;
end;
$$;

grant execute on function public.place_order(uuid, uuid, integer) to authenticated;

create or replace function public.prevent_member_profile_privilege_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if current_setting('app.allow_profile_points_update', true) = 'on' then
    return new;
  end if;

  if auth.uid() is null then
    return new;
  end if;

  if public.is_admin() then
    return new;
  end if;

  if old.id = auth.uid()
    and new.id = old.id
    and new.role = old.role
    and new.tier = old.tier
    and new.total_points = old.total_points
  then
    return new;
  end if;

  raise exception 'Only admins can update role, tier, or total_points';
end;
$$;

drop trigger if exists prevent_member_profile_privilege_update on public.profiles;
create trigger prevent_member_profile_privilege_update
before update on public.profiles
for each row execute function public.prevent_member_profile_privilege_update();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_insert_admin" on public.profiles;
create policy "profiles_insert_admin"
on public.profiles
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "profiles_update_own_full_name" on public.profiles;
create policy "profiles_update_own_full_name"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin"
on public.profiles
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "profiles_delete_admin" on public.profiles;
create policy "profiles_delete_admin"
on public.profiles
for delete
to authenticated
using (public.is_admin());

drop policy if exists "products_select_all" on public.products;
create policy "products_select_all"
on public.products
for select
to anon, authenticated
using (true);

drop policy if exists "products_all_admin" on public.products;
create policy "products_all_admin"
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "orders_select_own_or_admin" on public.orders;
create policy "orders_select_own_or_admin"
on public.orders
for select
to authenticated
using (customer_id = auth.uid() or public.is_admin());

drop policy if exists "orders_insert_admin" on public.orders;
create policy "orders_insert_admin"
on public.orders
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "orders_update_admin" on public.orders;
create policy "orders_update_admin"
on public.orders
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "orders_delete_admin" on public.orders;
create policy "orders_delete_admin"
on public.orders
for delete
to authenticated
using (public.is_admin());

drop policy if exists "order_items_select_own_or_admin" on public.order_items;
create policy "order_items_select_own_or_admin"
on public.order_items
for select
to authenticated
using (public.is_admin() or public.order_belongs_to_current_user(order_id));

drop policy if exists "order_items_insert_admin" on public.order_items;
create policy "order_items_insert_admin"
on public.order_items
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "order_items_update_admin" on public.order_items;
create policy "order_items_update_admin"
on public.order_items
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "order_items_delete_admin" on public.order_items;
create policy "order_items_delete_admin"
on public.order_items
for delete
to authenticated
using (public.is_admin());
