"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from 'next/navigation';

import { signOut } from "@/entities/auth/api";
import { Button } from "@/shared/ui/button";

export default function SignOut() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      router.push("/login");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={"outline"} onClick={handleSignOut} disabled={loading}>
      {loading ? <Loader2Icon className="animate-spin" /> : "Выйти"}
    </Button>
  );
}
