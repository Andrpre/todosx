import { redirect } from "next/navigation";
import { createClient } from "@/app/supabase/server";

import { TodoList } from "@/features/todos";
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
    <div className="min-h-screen p-5 font-[family-name:var(--font-geist-sans)">
      <Header />
      <main className="mx-auto mt-4 flex max-w-2xl justify-center md:mt-20">
        <TodoList />
      </main>
    </div>
  );
}
