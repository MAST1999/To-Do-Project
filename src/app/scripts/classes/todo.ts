import { IsTodo } from "../../../interface/isTodo";

export class Todo implements IsTodo {
  public _done = false;
  constructor(public _text: string, readonly _id: number) {}

  updateTodo = (text: string): void => {
    this._text = text;
  };

  toggleDone = (): void => {
    this._done = !this._done;
  };

  get id(): number {
    return this.id;
  }
}
