import { supabase } from "@/app/supabase/browser";
import type { User, Session } from "@supabase/supabase-js";

export const signIn = async (
  email: string,
  password: string
): Promise<{ user: User | null; session: Session | null }> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`Ошибка входа: ${error.message}`);
  return { user: data.user, session: data.session };
};
