class Model {
  constructor() {
    if (JSON.parse(localStorage.getItem("listModel"))) {
      this.listModel = JSON.parse(localStorage.getItem("listModel"));
    } else {
      this.listModel = [
        {
          listId: 0,
          title: "hello",
          toDos: [{ id: 0, text: "wash my hands", done: false, parentId: 0 }],
        },
      ];
    }

    this.user = "reza";

    this.showStatus = "all";
  }

  showAll() {
    this.showStatus = "all";
    this._render(this.listModel, this.showStatus);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }
  showDone() {
    this.showStatus = "done";
    this._render(this.listModel, this.showStatus);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }
  showActive() {
    this.showStatus = "active";
    this._render(this.listModel, this.showStatus);
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
    this._render(this.listModel, this.showStatus);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  editTitle(listId, title) {
    const list = this.findList(listId);
    list.title = title;
    this._render(this.listModel, this.showStatus);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  removeList(listId) {
    this.listModel = this.listModel.filter((mList) => mList.listId !== listId);
    this._render(this.listModel, this.showStatus);
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
    this._render(this.listModel, this.showStatus);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  removeTodo(listId, id) {
    const list = this.findList(listId);
    list.toDos = list.toDos.filter((todo) => todo.id !== id);
    this._render(this.listModel, this.showStatus);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  editTodo(listId, id, text) {
    const list = this.findList(listId);
    const todo = this.findTodo(list, id);

    todo.text = text;
    this._render(this.listModel, this.showStatus);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  toggleTodo(listId, id) {
    const list = this.findList(listId);
    const todo = this.findTodo(list, id);

    todo.done = !todo.done;
    this._render(this.listModel, this.showStatus);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  bindTodoListChanged(callback) {
    this.handelOnTodoListChange = callback;
  }

  _render(listModel, showStatus) {
    this.handelOnTodoListChange(listModel, showStatus);
  }

  async upload() {
    const res = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: JSON.stringify(this.listModel),
    });
    const result = await res.json();
    console.log(result);
  }

  async download() {
    let url = new URL("http://localhost:3000/download");
    let params = { user: this.user };
    url.search = new URLSearchParams(params).toString();
    const res = await fetch(url);
    if (res.status === 404) {
      alert(`User: ${this.user}, doesn't exist!`);
      return;
    }
    const data = await res.json();
    if (data) this.listModel = data;
    this._render(this.listModel, this.showStatus);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }

  async createAccount(username, password) {
    const res = await fetch("http://localhost:3000/users/post", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if (res.status === 500) {
      alert(`Something went wrong, status code: ${res.status}`);
      return;
    }

    const message = await res.json();

    alert(message.message);
  }

  async signin(username, password) {
    const url = new URL("http://localhost:3000/users/get");
    const params = { username, password };
    url.search = new URLSearchParams(params).toString();
    const res = await fetch(url);
    if (res.status === 404) {
      alert(`User with this or password doesn't exist.`);
      return;
    }
    const data = await res.json();
    console.log(data);
    if (data) this.listModel = data;
    this._render(this.listModel, this.showStatus);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }
}

export default Model;
