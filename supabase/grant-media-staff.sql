-- Run in the SQL Editor of the Salem Supabase project.
-- This grants media management access to the account selected by the owner.
-- It is an account setup operation, not a schema migration.
begin;

do $$
begin
  if not exists (
    select 1 from auth.users
    where id = '4c346c90-3270-4f5e-9a0b-65ffb86aa7ba'::uuid
  ) then
    raise exception 'This user was not found. Check that you are in the Salem project and that the User UID is correct.';
  end if;
end $$;

insert into public.media_admins (user_id)
values ('4c346c90-3270-4f5e-9a0b-65ffb86aa7ba'::uuid)
on conflict (user_id) do nothing;

commit;

select user_id, 'Media staff access enabled' as result
from public.media_admins
where user_id = '4c346c90-3270-4f5e-9a0b-65ffb86aa7ba'::uuid;
