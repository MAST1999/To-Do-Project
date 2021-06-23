import { IsList } from "../../../interface/isList";
import { Model } from "./model.js";
import { View } from "./view.js";

export class Controller {
  public _model: Model;
  public _view: View;

  constructor(model: Model, view: View) {
    this._model = model;
    this._view = view;

    this._model.bindRender(this.handleRender);
    this._model.bindPages(this.handlePages);
    this._view.pageRouter("signin", this._model._render);
    this._view.bindChanges(this.handleReset);
    this._view.bindAddList(this.handleAddList);
    this._view.bindAddTodo(this.handleAddTodo);
    this._view.bindRemoveTodo(this.handleRemoveTodo);
    this._view.bindRemoveList(this.handleRemoveList);
    this._view.bindEdits(this.handleEdits);
    this._view.bindDone(this.handleTodoToggle);
    this._view.bindStatus(this.handleStatus);
    this._view.bindSignupPage(this.handleCreateAccount);
    this._view.bindSigninPage(this.handleSignin);
    this._view.bindDownload(this.handleDownload);
    this._view.bindUpload(this.handleUpload);
    this._view.bindGuest(this.handleReset);
  }

  handleRender = (
    model: IsList[],
    showStatus: string,
    username: string,
    isGuest: boolean
  ): void => {
    this._view.render(model, showStatus, username, isGuest);
    this._view.bindEdits(this.handleEdits);
  };

  handlePages = (state: string, render: () => void) => {
    this._view.pageRouter(state, render);
  };

  handleAddList = (title: string): void => {
    this._model.addList(title);
  };

  handleAddTodo = (listId: number, text: string): void => {
    this._model.addTodo(listId, text);
  };

  handleRemoveTodo = (listId: number, todoId: number): void => {
    this._model.removeTodo(listId, todoId);
  };

  handleRemoveList = (listId: number): void => {
    this._model.removeList(listId);
  };

  handleEdits = (listId: number, text: string, todoId?: number): void => {
    if (todoId) {
      this._model.editTodo(listId, todoId, text);
    } else {
      this._model.changeListTitle(listId, text);
    }
  };

  handleTodoToggle = (listId: number, todoId: number): void => {
    this._model.toggleTodo(listId, todoId);
  };

  handleStatus = (status: string): void => {
    this._model.setStatus(status);
    this._model._render();
  };

  handleCreateAccount = (username: string, password: string): void => {
    this._model.createAccount(username, password);
  };

  handleSignin = (username: string, password: string): void => {
    this._model.signinToAccount(username, password);
  };

  handleUpload = (): void => {
    this._model.upload();
  };

  handleDownload = (): void => {
    this._model.download();
  };

  handleReset = (): void => {
    this._model.reset();
    this._model._render();
  };
}
