"use client";

import { useState, useEffect } from "react";
import { fetchTodos, addTodo } from "@/entities/todos/api";
import { Todo } from "@/entities/todos/model/model";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import Loader from "@/shared/ui/loader";
import { Checkbox } from "@/shared/ui/checkbox";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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
    try {
      const newTodo = await addTodo(newTask);

      setTodos([newTodo, ...todos]);
      setNewTask("");
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  return (
    <div>
      <h1>ToDo</h1>
      <form onSubmit={handleAddTodo} className="flex w-xl gap-2 mt-4">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новая задача"
        />
        <Button type="submit">Добавить</Button>
      </form>
      <ul className="flex flex-col gap-1 mt-4">
        {!loading ? (
          todos.map((todo) => (
            <li className="flex gap-2 p-3 bg-gray-100 rounded-md" key={todo.id}>
              <Checkbox className="bg-white rounded-xl size-5" />
              {todo.task}
            </li>
          ))
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  );
}
