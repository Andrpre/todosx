import { redirect } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/app/supabase/server";

import { TodoList } from "@/features/todos";
import Header from "@/widgets/header/ui/Header";

export const metadata: Metadata = {
  title: "Todosx",
  description: "A simple todo list",
};

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans) min-h-screen p-5">
      <Header />
      <main className="mx-auto mt-4 flex max-w-2xl justify-center md:mt-20">
        <TodoList />
      </main>
    </div>
  );
}
