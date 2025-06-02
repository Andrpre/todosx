import { redirect } from "next/navigation";
import { createClient } from "@/app/supabase/server";

import TodoList from "@/features/todos/ui/TodoList";
import Header from "@/widgets/header/ui/Header";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-end min-h-screen p-5 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex w-full justify-center">
        <TodoList />
      </main>
    </div>
  );
}
