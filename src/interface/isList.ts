import { IsTodo } from "./isTodo";

export interface IsList {
  _todos: IsTodo[];
  _title: string;
  _id: number;
  addTodo(text: string): void;
  removeTodo(id: number): void;
  toggleTodo(id: number): void;
  changeTitle(title: string): void;
  editTodo(id: number, text: string): void;
}
