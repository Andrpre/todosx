import { supabase } from "@/app/supabase/browser";

export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(`Ошибка выхода: ${error.message}`);
};
