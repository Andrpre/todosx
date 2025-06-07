import { supabase } from "@/app/supabase/browser";

export const deleteTodo = async (id: number) => {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) throw new Error(`Ошибка обновления задачи: ${error.message}`);
};
