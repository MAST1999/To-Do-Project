class Controller {
  constructor(Model, View) {
    this.model = Model;
    this.view = View;

    this.model.bindTodoListChanged(this.handelOnTodoListChange);
    this.model.bindRouting(this.handelRouting);

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
    this.view.bindUpload(this.handleUpload);
    this.view.bindDownload(this.handleDownload);
    this.view.bindRoutingView(this.handleCreateAccount, this.handleSignIn);

    this.handelOnTodoListChange(this.model.listModel, this.model.showStatus);
  }

  handelOnTodoListChange = (listModel, showStatus) => {
    this.view.renderLists(listModel, showStatus);
  };

  handelRouting = (dispatch) => {
    this.view.routing(dispatch);
  };

  handleToggleTodo = (listId, id) => {
    this.model.toggleTodo(listId, id);
  };

  handleAddTodo = (listId, text) => {
    this.model.addTodo(listId, text);
  };

  handleRemoveTodo = (listId, id) => {
    this.model.removeTodo(listId, id);
  };

  handleEditTodo = (listId, id, text) => {
    this.model.editTodo(listId, id, text);
  };

  handelAddList = (title) => {
    this.model.addList(title);
  };

  handleRemoveList = (listId) => {
    this.model.removeList(listId);
  };

  handleEditTitle = (listId, title) => {
    this.model.editTitle(listId, title);
  };

  handleShowAll = () => {
    this.model.showAll();
  };

  handleShowDone = () => {
    this.model.showDone();
  };

  handleShowActive = () => {
    this.model.showActive();
  };

  handleUpload = () => {
    this.model.upload();
  };

  handleDownload = () => {
    this.model.download();
  };

  handleCreateAccount = (username, password, repeatPass) => {
    this.model.createAccount(username, password, repeatPass);
  };

  handleSignIn = (username, password) => {
    this.model.signin(username, password);
  };
}

export default Controller;
