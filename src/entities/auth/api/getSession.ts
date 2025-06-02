import { supabase } from "@/app/supabase/browser";
import type { Session } from "@supabase/supabase-js";

export const getSession = async (): Promise<Session | null> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(`Ошибка получения сессии: ${error.message}`);
  return data.session;
};
