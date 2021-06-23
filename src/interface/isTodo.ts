export interface IsTodo {
  _text: string;
  _done: boolean;
  _id: number;
  updateTodo(text: string): void;
  toggleDone(): void;
}
