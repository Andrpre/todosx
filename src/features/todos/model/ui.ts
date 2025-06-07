import { Todo } from "@/entities/todos";

export type TodoWithMeta = Todo & {
  deletable?: boolean;
};
