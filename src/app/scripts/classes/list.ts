import { IsList } from "../../../interface/isList";
import { IsTodo } from "../../../interface/isTodo";
import { Todo } from "./todo.js";

export class List implements IsList {
  public _todos: IsTodo[] = [];
  constructor(public _title: string, readonly _id: number) {}

  addTodo = (text: string): void => {
    const id = Math.floor(Math.random() * 1000) + this._todos.length;
    this._todos.push(new Todo(text, id));
  };

  removeTodo = (id: number): void => {
    this._todos = this._todos.filter((todo) => todo._id !== id);
  };

  toggleTodo = (id: number): void => {
    for (const todo of this._todos) {
      if (todo._id === id) {
        todo._done = !todo._done;
        break;
      }
    }
  };

  editTodo = (id: number, text: string): void => {
    for (const todo of this._todos) {
      if (todo._id === id) {
        todo._text = text;
        break;
      }
    }
  };

  changeTitle = (title: string): void => {
    this._title = title;
  };
}
