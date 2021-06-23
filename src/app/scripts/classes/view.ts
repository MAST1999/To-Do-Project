import { IsRender } from "../../../interface/isRender";
import {
  btnDownload,
  btnShowActive,
  btnShowAll,
  btnShowDone,
  btnSignIn,
  btnSignOut,
  btnUpload,
  header,
  usernameDisplay,
} from "../display/header.js";
import {
  allListContainer,
  makeListContainer,
  makeTodos,
} from "../display/main.js";
import { newElement } from "../display/newElement.js";
import {
  linkToSignup,
  signinPage,
  signinPassword,
  signinSubmit,
  signinUsername,
} from "../display/signin.js";
import {
  linkToSignin,
  passwordInput,
  repeatPasswordInput,
  signupPage,
  signupSubmit,
  usernameInput,
} from "../display/signup.js";

export class View {
  private _wrapper = document.querySelector("#wrapper") as HTMLDivElement;
  private _header = header;
  private _allListContainer = allListContainer;
  private _usernameDisplay = usernameDisplay;
  private _statusAll = btnShowAll;
  private _statusActive = btnShowActive;
  private _statusDone = btnShowDone;
  private _btnSignin = btnSignIn;
  private _btnSignOut = btnSignOut;
  private _signupPage = signupPage;
  private _usernameInput = usernameInput;
  private _passwordInput = passwordInput;
  private _passwordRepeatInput = repeatPasswordInput;
  private _signupSubmit = signupSubmit;
  private _signinPage = signinPage;
  private _signinUsername = signinUsername;
  private _signinPassword = signinPassword;
  private _signinSubmit = signinSubmit;
  private _linkToSignup = linkToSignup;
  private _linkToSignin = linkToSignin;
  private _btnDownload = btnDownload;
  private _btnUpload = btnUpload;
  private _state = "signin";
  private _makeListContainer;
  private _makeTodos;
  private _guestLogin;

  constructor() {
    this._makeListContainer = makeListContainer;
    this._makeTodos = makeTodos;
    this._guestLogin = newElement("p", "guest-login") as HTMLParagraphElement;
    this._guestLogin.textContent =
      "Want to try it out? click here to enter as a Guest!";
    this._guestLogin.style.color = "red";
    this._guestLogin.style.cursor = "pointer";
  }

  render: IsRender = (model, showStatus, username, isGuest: boolean): void => {
    if (isGuest) {
      this._usernameDisplay.textContent = "Guest";
      this._btnDownload.style.display = "none";
      this._btnUpload.style.display = "none";
    } else {
      this._usernameDisplay.textContent = username;
      this._btnDownload.style.display = "inline";
      this._btnUpload.style.display = "inline";
    }
    this._wrapper.append(this._header, this._allListContainer);

    // if there are no lists show a message otherwise empty the all list container
    if (model.length === 0) {
      this._allListContainer.textContent =
        "There are no List, add one using the header input!";
      return;
    } else {
      this._allListContainer.innerHTML = "";
    }

    // render the lists and their to dos
    model.forEach((list) => {
      const listTodo = this._makeListContainer(list._id, list._title);
      allListContainer.appendChild(listTodo);
      // filter the todos based on what mode is currently on
      const filteredTodos = list._todos.filter((todo) => {
        switch (showStatus) {
          case "all": {
            return true;
          }
          case "done": {
            return todo._done;
          }
          case "active": {
            return !todo._done;
          }
        }
      });
      // display the todos
      filteredTodos.forEach((todo) => {
        const todoContainer = this._makeTodos(
          list._id,
          todo._id,
          todo._text,
          todo._done
        );
        listTodo.children[1].appendChild(todoContainer);
      });
    });
  };

  bindAddList = (addList: (title: string) => void) => {
    this._wrapper.addEventListener("click", function addNewList(event) {
      const target = event.target as HTMLElement;
      if (target.id === "btn-add-list") {
        const title = document.querySelector("#list-input") as HTMLInputElement;
        if (title.value === "") return;
        addList(title.value);
        title.value = "";
      }
    });
  };

  bindAddTodo = (addTodo: (id: number, text: string) => void) => {
    this._wrapper.addEventListener("click", function addNewTodo(event) {
      const target = event.target as HTMLElement;

      const [type, listId] = target.id.split("-");
      if (type === "btnAddTodo") {
        const text = document.querySelector(
          `#listInput-${+listId}`
        ) as HTMLInputElement;
        if (text.value === "") return;
        addTodo(+listId, text.value);
      }
    });
  };

  bindRemoveTodo = (
    removeTodo: (listId: number, todoId: number) => void
  ): void => {
    this._wrapper.addEventListener("click", function removeOldTodo(event) {
      const target = event.target as HTMLButtonElement;

      const [type, listId, todoId] = target.id.split("-");
      if (type === "removeTodo") {
        removeTodo(+listId, +todoId);
      }
    });
  };

  bindRemoveList = (removeList: (listId: number) => void): void => {
    this._wrapper.addEventListener("click", function removeOldList(event) {
      const target = event.target as HTMLButtonElement;

      const [type, listId] = target.id.split("-");
      if (type === "btnRemoveList") {
        removeList(+listId);
      }
    });
  };

  bindEdits = (
    edits: (listId: number, text: string, todoId?: number) => void
  ): void => {
    const paragraphs = document.querySelectorAll("p");
    const h2s = document.querySelectorAll("h2");

    const editable = Array.from(paragraphs).concat(Array.from(h2s));

    editable.forEach((element) => {
      element.addEventListener("input", function inputDetector(event) {
        const target = event.target as HTMLElement;

        const splitId = target.id.split("-");

        if (splitId.length < 3) {
          const [type, listId] = splitId;

          edits(+listId, element.textContent!);
        } else {
          const [type, listId, todoId] = splitId;

          edits(+listId, element.textContent!, +todoId);
        }
      });
    });
  };

  bindDone = (toggleTodo: (listId: number, todoId: number) => void): void => {
    this._wrapper.addEventListener("click", function toggle(event) {
      const target = event.target as HTMLInputElement;

      const [type, listId, todoId] = target.id.split("-");
      if (type === "done") {
        toggleTodo(+listId, +todoId);
      }
    });
  };

  bindStatus = (changeStatus: (status: string) => void): void => {
    this._statusActive.addEventListener("click", function setStatusActive() {
      changeStatus("active");
    });

    this._statusAll.addEventListener("click", function setStatusAll() {
      changeStatus("all");
    });

    this._statusDone.addEventListener("click", function setStatusDone() {
      changeStatus("done");
    });
  };

  bindSignupPage = (
    createUser: (username: string, password: string) => void
  ): void => {
    this._signupSubmit.addEventListener("click", () => {
      const password = this._passwordInput.value;
      const username = this._usernameInput.value;
      const repeatPassword = this._passwordRepeatInput.value;

      if (password !== "" && password === repeatPassword) {
        createUser(username, password);
      }
    });
  };

  bindSigninPage = (
    signin: (username: string, password: string) => void
  ): void => {
    this._signinSubmit.addEventListener("click", () => {
      const password = this._signinPassword.value;
      const username = this._signinUsername.value;

      signin(username, password);
    });
  };

  pageRouter = (state: string, render?: () => void) => {
    switch (state) {
      case "signup": {
        this._wrapper.innerHTML = "";
        this._signupPage.appendChild(this._guestLogin);
        this._wrapper.appendChild(this._signupPage);
        break;
      }
      case "list": {
        this._wrapper.innerHTML = "";
        this._wrapper.append(this._header, this._allListContainer);
        if (render) render();
        break;
      }
      case "signin": {
        this._wrapper.innerHTML = "";
        this._signinPage.appendChild(this._guestLogin);
        this._wrapper.append(this._signinPage);
      }
    }
  };

  bindChanges = (reset: () => void) => {
    this._btnSignin.addEventListener("click", () => {
      this._state = "signin";
      reset();
      this.pageRouter(this._state);
    });

    this._btnSignOut.addEventListener("click", () => {
      this._state = "signup";
      reset();
      this.pageRouter(this._state);
    });

    this._linkToSignup.addEventListener("click", () => {
      this._state = "signup";
      this.pageRouter(this._state);
    });

    this._linkToSignin.addEventListener("click", () => {
      this._state = "signin";
      this.pageRouter(this._state);
    });
  };

  bindDownload = (download: () => void): void => {
    this._btnDownload.addEventListener("click", () => {
      download();
    });
  };

  bindUpload = (upload: () => void): void => {
    this._btnUpload.addEventListener("click", () => {
      upload();
    });
  };

  bindGuest = (reset: () => void): void => {
    this._guestLogin.addEventListener("click", () => {
      reset();
      this.pageRouter("list");
    });
  };
}
