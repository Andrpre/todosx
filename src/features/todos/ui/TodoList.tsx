"use client";

import { useState, useEffect, useTransition } from "react";
import { ForwardIcon, Loader2Icon } from "lucide-react";

import {
  fetchTodos,
  addTodo,
  toggleTodoCompletion,
  deleteTodo,
} from "@/entities/todos";
import { TodoWithMeta } from "../model/ui";

import TodoItem from "./TodoItem";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import Loader from "@/shared/ui/loader";
import { toast } from "sonner";

import { TODO_DELETE_DELAY_MS } from "../consts/timeouts";

export default function TodoList() {
  const [todos, setTodos] = useState<TodoWithMeta[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isPendingAdd, startTransitionAdd] = useTransition();
  const [, startTransitionAction] = useTransition();

  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTodos();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    startTransitionAdd(async () => {
      try {
        const newTodo = await addTodo(newTask);

        setTodos([newTodo, ...todos]);
        setNewTask("");
      } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
      }
    });
  };

  const handleToggle = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    const newCompleted = !todo.is_completed;
    // Оптимистичное обновление
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, is_completed: newCompleted } : todo,
      ),
    );

    startTransitionAction(async () => {
      try {
        await toggleTodoCompletion(id, newCompleted);
      } catch (err) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, is_completed: !newCompleted } : todo,
          ),
        );

        toast.error(err instanceof Error ? err.message : "Неизвестная ошибка");
      }
    });
  };

  const handleDelete = (id: number) => {
    const deletedTodo = todos.find((todo) => todo.id === id);

    if (!deletedTodo) return;

    // Помечаем задачу как ожидающую удаление
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, deletable: true } : todo,
      ),
    );

    const toastId = toast("Задача будет удалена", {
      action: {
        label: "Отменить",
        onClick: () => {
          clearTimeout(timeoutId);
          toast.dismiss(toastId);

          // Отменяем удаление, возвращая задачу в исходное состояние
          setTodos((prev) =>
            prev.map((todo) =>
              todo.id === id ? { ...todo, deletable: false } : todo,
            ),
          );
        },
      },
    });

    const timeoutId = setTimeout(async () => {
      toast.dismiss(toastId);

      setTodos((prev) => prev.filter((todo) => todo.id !== id));

      startTransitionAction(async () => {
        try {
          await deleteTodo(id);
          toast.success("Задача удалена");
        } catch (err) {
          setTodos((prev) => [...prev, deletedTodo]);

          toast.error(
            err instanceof Error ? err.message : "Неизвестная ошибка",
          );
        }
      });
    }, TODO_DELETE_DELAY_MS);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleAddTodo} className="flex gap-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новая задача"
        />
        <Button type="submit" disabled={isPendingAdd || !newTask.trim()}>
          {isPendingAdd ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <ForwardIcon />
          )}
        </Button>
      </form>
      <ul className="mt-4 flex flex-col gap-1">
        {!loading ? (
          todos.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            </li>
          ))
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  );
}
