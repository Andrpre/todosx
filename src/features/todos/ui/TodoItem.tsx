"use client";

import { Checkbox } from "@/shared/ui/checkbox";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { X } from "lucide-react";
import { TodoWithMeta } from "../model/ui";

type TodoItemProps = {
  todo: TodoWithMeta;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
};

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md bg-gray-100 p-3 pr-1",
        {
          "bg-red-50": todo.deletable,
        },
      )}
    >
      <div className="flex items-center gap-2">
        <Checkbox
          onCheckedChange={() => onToggle?.(todo.id)}
          className="size-5 cursor-pointer rounded-xl bg-white disabled:cursor-pointer"
          checked={todo.is_completed}
          disabled={todo.deletable}
        />
        <span
          className={cn({
            "line-through": todo.is_completed,
            "text-gray-500": todo.deletable,
          })}
        >
          {todo.task}
        </span>
      </div>
      <Button
        onClick={() => onDelete?.(todo.id)}
        variant={"link"}
        className="hover:text-red-500"
        disabled={todo.deletable}
      >
        <X />
      </Button>
    </div>
  );
};

export default TodoItem;
