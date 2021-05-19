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
    const res = await fetch("http://localhost:3000/download", {
      method: "GET",
    });
    const data = await res.json();
    this.listModel = data;
    this._render(this.listModel, this.showStatus);
    localStorage.setItem("listModel", JSON.stringify(this.listModel));
  }
}

export default Model;
