import { createClient } from "@/app/supabase/server";

import { SignOut } from "@/features/auth";

const Header = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <header className="flex w-full items-center justify-between gap-4">
      <span>{user?.email ?? error?.message}</span>
      <SignOut />
    </header>
  );
};

export default Header;
