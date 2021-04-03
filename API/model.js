class Model {
  constructor() {
    this.listModel = [
      {
        listId: 0,
        title: "hello",
        toDos: [{ id: 0, text: "wash my hands", done: false }],
      },
    ];
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
  }

  editTitle(listId, title) {
    const list = this.findList(listId);
    list.title = title;
  }

  removeList(listId) {
    this.listModel = this.listModel.filter((mList) => mList.listId !== listId);
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
    });
  }

  removeTodo(listId, id) {
    const list = this.findList(listId);
    list.toDos = list.toDos.filter((todo) => todo.id !== id);
  }

  editTodo(listId, id, text) {
    const list = this.findList(listId);
    const todo = this.findTodo(list, id);

    todo.text = text;
  }

  toggleTodo(listId, id) {
    const list = this.findList(listId);
    const todo = this.findTodo(list, id);

    todo.done = !todo.done;
  }
}

export default Model;
