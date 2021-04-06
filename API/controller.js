class Controller {
  constructor(Model, View) {
    this.model = Model;
    this.view = View;

    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
    this.handleToggleTodo = this.handleToggleTodo.bind(this);
    this.handelAddList = this.handelAddList.bind(this);
    this.handleRemoveList = this.handleRemoveList.bind(this);
    this.handleEditTitle = this.handleEditTitle.bind(this);
    this.handleShowAll = this.handleShowAll.bind(this);
    this.handleShowDone = this.handleShowDone.bind(this);
    this.handleShowActive = this.handleShowActive.bind(this);
    this.onTodoListChange();

    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindRemoveTodo(this.handleRemoveTodo);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);
    this.view.bindAddList(this.handelAddList);
    this.view.bindRemoveList(this.handleRemoveList);
    this.view.bindEditTitle(this.handleEditTitle);
    this.view.bindShowAll(this.handleShowAll);
    this.view.bindShowDone(this.handleShowDone);
    this.view.bindShowActive(this.handleShowActive);
  }

  onTodoListChange() {
    this.view.renderLists(this.model.listModel, this.model.showStatus);
  }

  handleToggleTodo(listId, id) {
    this.model.toggleTodo(listId, id);
    this.onTodoListChange();
  }

  handleAddTodo(listId, text) {
    this.model.addTodo(listId, text);
    this.onTodoListChange();
  }

  handleRemoveTodo(listId, id) {
    this.model.removeTodo(listId, id);
    this.onTodoListChange();
  }

  handleEditTodo(listId, id, text) {
    this.model.editTodo(listId, id, text);
    this.onTodoListChange();
  }

  handelAddList(title) {
    this.model.addList(title);
    this.onTodoListChange();
  }

  handleRemoveList(listId) {
    this.model.removeList(listId);
    this.onTodoListChange();
  }

  handleEditTitle(listId, title) {
    this.model.editTitle(listId, title);
    this.onTodoListChange();
  }

  handleShowAll() {
    this.model.showAll();
    this.onTodoListChange();
  }

  handleShowDone() {
    this.model.showDone();
    this.onTodoListChange();
  }

  handleShowActive() {
    this.model.showActive();
    this.onTodoListChange();
  }
}

export default Controller;
