-- Unpublished posts were readable by anyone with the public anon key, because no
-- table had Row Level Security enabled. Client-side .eq("published", true) filters
-- (see app/page.tsx, app/pages/blog/page.tsx, app/pages/blog/[slug]/page.tsx) are
-- UX only — they don't stop someone from calling the Supabase REST/JS API directly
-- with the anon key and reading every row, including drafts. RLS on the table is
-- the actual enforcement boundary.
--
-- Note: enabling RLS with only a SELECT policy also blocks the anon/authenticated
-- roles from INSERT/UPDATE/DELETE on these tables (Supabase grants broad CRUD to
-- those roles by default when a table is created, and relies on RLS to restrict
-- it). Writing posts should continue to happen via the Supabase dashboard or a
-- service_role key, which always bypasses RLS.

alter table public."Posts" enable row level security;

drop policy if exists "Public can read published posts" on public."Posts";
create policy "Public can read published posts"
  on public."Posts"
  for select
  to anon, authenticated
  using (published = true);

-- BlogDetail (used by the single-post page) may be a view derived from Posts, or
-- a standalone table with its own published column — this repo has no tracked
-- schema to tell us which. Handle both cases so this migration is safe either way:
do $$
declare
  relkind_ "char";
begin
  select c.relkind into relkind_
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relname = 'BlogDetail';

  if relkind_ is null then
    raise notice 'public."BlogDetail" not found — nothing to do.';

  elsif relkind_ = 'v' then
    -- It's a plain view. By default a view runs with the privileges of its
    -- owner, which commonly bypasses RLS on the underlying table entirely.
    -- security_invoker makes it run as the querying role instead, so the
    -- policy above on Posts actually applies when BlogDetail is queried.
    execute 'alter view public."BlogDetail" set (security_invoker = true)';
    raise notice 'public."BlogDetail" is a view — set security_invoker = true so the Posts RLS policy applies to it.';

  elsif relkind_ in ('r', 'p') then
    -- It's a real table. Only add a policy if it actually carries its own
    -- published column — otherwise there's nothing to filter on and this
    -- table needs a manual fix (add the column, or rebuild as a view).
    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'BlogDetail' and column_name = 'published'
    ) then
      execute 'alter table public."BlogDetail" enable row level security';
      execute 'drop policy if exists "Public can read published posts" on public."BlogDetail"';
      execute 'create policy "Public can read published posts" on public."BlogDetail" for select to anon, authenticated using (published = true)';
    else
      raise warning 'public."BlogDetail" is a table with no published column — drafts are still exposed through it. Add a published column (kept in sync with Posts) and rerun this migration, or replace it with a view over Posts.';
    end if;
  end if;
end $$;
