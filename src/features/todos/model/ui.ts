import { Todo } from "@/entities/todos/model/model";

export type TodoWithMeta = Todo & {
  deletable?: boolean;
};
