import { supabase } from "@/app/supabase/browser";
import { Todo } from "../model/model";

export const toggleTodoCompletion = async (
  id: number,
  is_completed: boolean,
): Promise<Todo> => {
  const { data, error } = await supabase
    .from("todos")
    .update({ is_completed })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`Ошибка обновления задачи: ${error.message}`);
  return data;
};
