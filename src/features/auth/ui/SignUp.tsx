"use client";

import { useState } from "react";
import { signUp } from "@/entities/auth/api";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Loader2Icon } from "lucide-react";

export function SignUp({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await signUp(email, password);

      setEmail("");
      setPassword("");

      toast.success("Вы успешно зарегистрированы", {
        description: "Подтверждение регистрации отправлено вам на почту",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex w-xs flex-col gap-4", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Создайте аккаунт</CardTitle>
          <CardDescription>
            И получите доступ к управлению списком дел
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Почта</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Зарегистрироваться"
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Есть аккаунт?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Войти
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
