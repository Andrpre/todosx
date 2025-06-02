import { supabase } from "@/app/supabase/browser";
import { Todo, TodoInsert } from "../model/model";

export const addTodo = async (task: string): Promise<Todo> => {
  if (!task.trim()) throw new Error("Задача не может быть пустой");

  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData.session) throw new Error("Пользователь не авторизован");

  const userId = sessionData.session.user.id;

  const { data, error } = await supabase
    .from("todos")
    .insert([{ task, user_id: userId } as TodoInsert])
    .select()
    .single();
  if (error) throw new Error(`Ошибка Supabase: ${error.message}`);
  return data;
};
