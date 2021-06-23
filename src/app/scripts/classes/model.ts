import { IsList } from "../../../interface/isList";
import { IsRender } from "../../../interface/isRender";
import { List } from "./list.js";

export class Model {
  public _model: IsList[] = [];
  public _username = "Guest";
  public _password = "";
  public _showStatus = "all";
  public _isGuest = true;
  public handleRender!: IsRender;
  public handlePages!: (state: string, render: () => void) => void;

  bindRender = (handler: IsRender): void => {
    this.handleRender = handler;
  };

  bindPages = (handler: (state: string, render: () => void) => void): void => {
    this.handlePages = handler;
  };

  _render = (): void => {
    this.handleRender(
      this._model,
      this._showStatus,
      this._username,
      this._isGuest
    );
  };

  _router = (state: string): void => {
    this.handlePages(state, this._render);
  };

  addList = (title: string): void => {
    const id = Math.floor(Math.random() * 1000) + this._model.length;
    this._model.push(new List(title, id));
    this._render();
    localStorage.setItem("model", JSON.stringify(this._model));
  };

  changeListTitle = (id: number, title: string): void => {
    const list = this.findList(id);
    if (list._id === id) {
      list._title = title;
    }
    localStorage.setItem("model", JSON.stringify(this._model));
  };

  removeList = (id: number): void => {
    this._model = this._model.filter((list) => list._id !== id);
    this._render();
    localStorage.setItem("model", JSON.stringify(this._model));
  };

  addTodo = (id: number, text: string): void => {
    const list = this.findList(id);
    if (list._id === id) {
      list.addTodo(text);
    }
    this._render();
    localStorage.setItem("model", JSON.stringify(this._model));
  };

  removeTodo = (listId: number, todoId: number): void => {
    const list = this.findList(listId);

    if (list._id === listId) {
      list.removeTodo(todoId);
    }
    this._render();
    localStorage.setItem("model", JSON.stringify(this._model));
  };

  toggleTodo = (listId: number, todoId: number): void => {
    const list = this.findList(listId);
    list.toggleTodo(todoId);
    this._render();
    localStorage.setItem("model", JSON.stringify(this._model));
  };

  editTodo = (listId: number, todoId: number, text: string): void => {
    if (text === "") this.removeTodo(listId, todoId);
    const list = this.findList(listId);
    list.editTodo(todoId, text);
    localStorage.setItem("model", JSON.stringify(this._model));
  };

  findList = (id: number): IsList => {
    for (const list of this._model) {
      if (list._id === id) return list;
    }

    throw new Error("Something went wrong in findList");
  };

  setStatus = (status: string) => {
    this._showStatus = status;
  };

  download = async () => {
    const request = new URL("http://localhost:3000/user/download");
    request.searchParams.set("username", this._username);
    request.searchParams.set("password", this._password);

    const res = await fetch(request.toString());

    const data: IsList[] = await res.json();
    this._model = [];
    data.forEach((list) => {
      this.addList(list._title);
      list._todos.forEach((todo) => {
        this._model[this._model.length - 1].addTodo(todo._text);
        if (todo._done) {
          this._model[this._model.length - 1]._todos[
            this._model[this._model.length - 1]._todos.length - 1
          ].toggleDone();
        }
      });
    });
    this._render();
  };

  upload = async () => {
    const request = new URL("http://localhost:3000/user/upload");
    request.searchParams.set("username", this._username);
    request.searchParams.set("password", this._password);

    const res = await fetch(request.toString(), {
      method: "POST",
      body: JSON.stringify(this._model),
    });

    if (res.status !== 201) {
      alert(`something went wrong: ${res.status}`);
    }
  };

  createAccount = async (username: string, password: string): Promise<void> => {
    const request = new URL("http://localhost:3000/user/create");
    request.searchParams.set("username", username);
    request.searchParams.set("password", password);

    const res = await fetch(request.toString(), {
      method: "POST",
    });
    if (res.status !== 201) {
      alert("Username already exists!");
      return;
    } else {
      this._username = username;
      this._password = password;
      this._model = [];
      this._isGuest = false;
      this._router("list");
    }
  };

  signinToAccount = async (username: string, password: string) => {
    const request = new URL("http://localhost:3000/user/login");
    request.searchParams.set("username", username);
    request.searchParams.set("password", password);

    const res = await fetch(request.toString());

    if (res.status !== 200) {
      alert(`something isn't right: ${res.status}`);
      return;
    } else {
      const data: IsList[] = await res.json();
      this._model = [];
      data.forEach((list) => {
        this.addList(list._title);
        list._todos.forEach((todo) => {
          this._model[this._model.length - 1].addTodo(todo._text);
          if (todo._done) {
            this._model[this._model.length - 1]._todos[
              this._model[this._model.length - 1]._todos.length - 1
            ].toggleDone();
          }
        });
      });
      this._username = username;
      this._password = password;
      this._isGuest = false;
      this._router("list");
    }
  };

  reset = (): void => {
    this._isGuest = true;
    this._model = [];
    this._username = "Guest";
    this._password = "";
  };
}
