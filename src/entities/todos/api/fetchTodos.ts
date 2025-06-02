import { supabase } from "@/app/supabase/browser";
import { Todo } from "../model/model";

export const fetchTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Ошибка Supabase: ${error.message}`);

  return data;
};
