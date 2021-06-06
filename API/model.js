class Model {
  constructor() {
    if (JSON.parse(localStorage.getItem("listModel"))) {
      this.listModel = JSON.parse(localStorage.getItem("listModel"));
    } else {
      this.listModel = [];
    }

    this.user = "guest";
    this.pass = "";

    this.showStatus = "all";
  }

  showAll() {
    this.showStatus = "all";
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }
  showDone() {
    this.showStatus = "done";
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }
  showActive() {
    this.showStatus = "active";
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  findList(listId) {
    for (const list of this.listModel) {
      if (list.listId === listId) {
        return list;
      }
    }
  }

  addList(title) {
    this.listModel.push({ listId: this.listModel.length, title, toDos: [] });
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  editTitle(listId, title) {
    const list = this.findList(listId);
    list.title = title;
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  removeList(listId) {
    this.listModel = this.listModel.filter((mList) => mList.listId !== listId);
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  findTodo(list, id) {
    for (const todo of list.toDos) {
      if (todo.id === id) return todo;
    }
  }

  addTodo(listId, text) {
    const list = this.findList(listId);

    list.toDos.push({
      id: list.toDos.length,
      text,
      done: false,
      parentId: list.listId,
    });
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  removeTodo(listId, id) {
    const list = this.findList(listId);
    list.toDos = list.toDos.filter((todo) => todo.id !== id);
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  editTodo(listId, id, text) {
    const list = this.findList(listId);
    const todo = this.findTodo(list, id);

    todo.text = text;
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  toggleTodo(listId, id) {
    const list = this.findList(listId);
    const todo = this.findTodo(list, id);

    todo.done = !todo.done;
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  bindTodoListChanged(handler) {
    this.handelOnTodoListChange = handler;
  }

  _render(listModel, showStatus, user) {
    this.handelOnTodoListChange(listModel, showStatus, user);
  }

  bindRouting(handler) {
    this.handelRouting = handler;
  }

  _routing(dispatch) {
    this.handelRouting(dispatch);
  }

  async upload() {
    const url = new URL("http://localhost:3000/upload");
    const params = { username: this.user, password: this.pass };
    url.search = new URLSearchParams(params).toString();
    // eslint-disable-next-line no-unused-vars
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(this.listModel),
    });
  }

  async download() {
    const url = new URL("http://localhost:3000/users/get");
    const params = { username: this.user, password: this.pass };
    url.search = new URLSearchParams(params).toString();
    const res = await fetch(url);
    if (res.status === 404) {
      alert(`User: ${this.user}, doesn't exist!`);
      return;
    }
    const data = await res.json();
    if (data) this.listModel = data;
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  async createAccount(username, password, repeatPass) {
    if (username === "guest") {
      alert("guest is already a user");
      return;
    }
    if (password === repeatPass) {
      const res = await fetch("http://localhost:3000/users/post", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      if (res.status === 500) {
        alert(`Something went wrong, status code: ${res.status}`);
        return;
      } else if (res.status === 400) {
        alert("User Already Exists");
        return;
      }

      const message = await res.json();

      this.user = username;
      this.pass = password;
      this.listModel = [];
      this.upload();
      this._routing("LISTS");
      this._render(this.listModel, this.showStatus, this.user);
      localStorage.setItem("listModel", JSON.stringify(this.listModel));

      alert(message.message);
    } else {
      alert("The passwords don't match");
    }
  }

  async signin(username, password) {
    const url = new URL("http://localhost:3000/users/get");
    const params = { username, password };
    url.search = new URLSearchParams(params).toString();
    const res = await fetch(url);
    if (res.status === 404) {
      alert(`User with username or password doesn't exist.`);
      return;
    }
    const data = await res.json();
    if (data) this.listModel = data;
    this.user = username;
    this.pass = password;
    this.download();
    this._routing("LISTS");
    this._render(this.listModel, this.showStatus, this.user);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  signOut() {
    this.user = "guest";
    this.pass = "";
    this.listModel = [];
    localStorage.setItem("listModel", "[]");
    this._render(this.listModel, "all", this.user);
  }
}

export default Model;
