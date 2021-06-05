import signUpContainer from "./signupPage.js";
import signInContainer from "./signinPage.js";

class View {
  constructor() {
    this.wrapperAll = this.getSingleElement("#wrapperAll");

    this.signUpPage = signUpContainer;

    this.signInPage = signInContainer;
    // header ---------------------
    this.header = this.createNewElement("div");
    this.header.id = "header";
    // Add new title part of the header
    this.addTitleContainer = this.createNewElement("div");
    this.addTitleContainer.id = "addTitleContainer";
    this.btnAddList = this.createNewElement("button", "marginLeft");
    this.btnAddList.id = "btnAddList";
    this.btnAddList.type = "button";
    this.btnAddList.textContent = "Add New List";
    this.inputListTitle = this.createNewElement("input");
    this.inputListTitle.type = "text";
    this.inputListTitle.id = "inputListTitle";
    this.addTitleContainer.append(this.inputListTitle, this.btnAddList);
    // Custom Buttons
    this.btnShowAll = this.createNewElement("button");
    this.btnShowAll.id = "showAll";
    this.btnShowAll.textContent = "Show All";
    this.btnShowDone = this.createNewElement("button");
    this.btnShowDone.id = "showDone";
    this.btnShowDone.textContent = "Show Done";
    this.btnShowActive = this.createNewElement("button");
    this.btnShowActive.id = "showActive";
    this.btnShowActive.textContent = "Show Active";
    // upload and download buttons
    this.btnUpload = this.createNewElement("button");
    this.btnUpload.id = "upload";
    this.btnUpload.textContent = "Upload";

    this.btnDownload = this.createNewElement("button");
    this.btnDownload.id = "download";
    this.btnDownload.textContent = "Download";

    // sign out button
    this.btnSignOut = this.createNewElement("button");
    this.btnSignOut.id = "sign-out";
    this.btnSignOut.textContent = "Sign Out";

    this.customBtnContainer = this.createNewElement("div");
    this.customBtnContainer.id = "customBtnContainer";
    this.customBtnContainer.append(
      this.btnShowAll,
      this.btnShowActive,
      this.btnShowDone,
      this.btnUpload,
      this.btnDownload,
      this.btnSignOut
    );

    // append to header
    this.header.append(this.addTitleContainer, this.customBtnContainer);

    this.mainBody = this.createNewElement("div");
    this.mainBody.id = "mainBody";

    this.wrapperAll.append(this.header, this.mainBody);
  }

  createNewElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  getSingleElement(selector) {
    return document.querySelector(selector);
  }

  getAllElements(selector) {
    return document.querySelectorAll(selector);
  }

  _resetInput() {
    this.newInput.value = "";
  }

  renderLists(listModel, showStatus) {
    this.wrapperAll.classList.remove("middle");
    this.wrapperAll.innerHTML = "";
    this.wrapperAll.append(this.header, this.mainBody);
    if (listModel.length === 0) {
      this.message = this.createNewElement("p");
      this.message.textContent = "Please add a new List";

      let lastChildOfMainBody = this.mainBody.lastElementChild;
      while (lastChildOfMainBody) {
        this.mainBody.removeChild(lastChildOfMainBody);
        lastChildOfMainBody = this.mainBody.lastElementChild;
      }

      this.mainBody.appendChild(this.message);
      return;
    }

    let lastChildOfMainBody = this.mainBody.lastElementChild;
    while (lastChildOfMainBody) {
      this.mainBody.removeChild(lastChildOfMainBody);
      lastChildOfMainBody = this.mainBody.lastElementChild;
    }
    listModel.forEach((list) => {
      const listContainer = this.createNewElement("div", "listContainer");
      listContainer.id = list.listId;

      const titleContainer = this.createNewElement("div", "titleContainer");
      const title = this.createNewElement("div", "title");
      title.id = `title-${list.listId}`;
      this.newTodoContainer = this.createNewElement("div", "newTodoContainer");

      const inputNewTodo = this.createNewElement("input", "inputTodo");
      inputNewTodo.type = "text";
      const btnAddTodo = this.createNewElement("button", "addTodo");
      btnAddTodo.type = "button";
      btnAddTodo.textContent = "Add New Todo";
      const newTodoContainer = this.createNewElement("div", "newTodoContainer");
      newTodoContainer.append(inputNewTodo, btnAddTodo);
      title.textContent = list.title;
      inputNewTodo.id = `inputTodo-${list.listId}`;
      btnAddTodo.id = `addTodo-${list.listId}`;

      // create the delete button
      const deleteList = this.createNewElement("button", "deleteList");
      deleteList.id = `deleteList-${list.listId}`;
      deleteList.textContent = "Delete";

      // create the edit button
      const editTitle = this.createNewElement("button", "editTitle");
      editTitle.id = `editList-${list.listId}`;
      editTitle.textContent = "Edit";
      titleContainer.append(title, editTitle, deleteList);
      listContainer.appendChild(titleContainer);
      listContainer.appendChild(newTodoContainer);
      listContainer.appendChild(this.newTodoContainer);
      const todoContainer = this.createNewElement("div", "todoContainer");
      const toDos = list.toDos;

      toDos.forEach((todo) => {
        const { id, text, done, parentId } = todo;

        // each todo with it's corresponding checkbox, edit and delete will be in todoElementPart
        const todoElementPart = this.createNewElement("div", "todoPart");
        const todoElement = this.createNewElement("p", "todo");
        todoElement.id = `${list.listId}-${id}`;
        todoElement.textContent = text;

        // depending on if it's done or not add a different class
        done
          ? todoElement.classList.add("done")
          : todoElement.classList.add("notDone");
        todoElement.setAttribute("parentId", parentId);

        // create the checkbox
        const checkbox = this.createNewElement("input", "doneCheckbox");
        checkbox.type = "checkbox";
        checkbox.id = `checkbox-${list.listId}-${id}`;
        done ? (checkbox.checked = true) : (checkbox.checked = false);

        // create the delete button
        const deleteTodo = this.createNewElement("button", "deleteTodo");
        deleteTodo.id = `deleteTodo-${list.listId}-${id}`;
        deleteTodo.textContent = "Delete";

        // create the edit button
        const editTodo = this.createNewElement("button", "editTodo");
        editTodo.id = `editTodo-${list.listId}-${id}`;
        editTodo.textContent = "Edit";
        switch (showStatus) {
          case "all":
            todoElementPart.append(todoElement, checkbox, editTodo, deleteTodo);
            todoContainer.appendChild(todoElementPart);
            break;
          case "done":
            if (!todo.done) break;
            todoElementPart.append(todoElement, checkbox, editTodo, deleteTodo);
            todoContainer.appendChild(todoElementPart);
            break;
          case "active":
            if (todo.done) break;
            todoElementPart.append(todoElement, checkbox, editTodo, deleteTodo);
            todoContainer.appendChild(todoElementPart);
            break;
        }
      });

      listContainer.appendChild(todoContainer);

      this.mainBody.appendChild(listContainer);
    });
  }

  bindAddTodo(addTodo) {
    this.mainBody.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target;
      if (target.classList.contains("addTodo")) {
        const inputId = target.id.replace("addTodo-", "inputTodo-");
        const listId = parseInt(target.id.replace("addTodo-", ""));
        const text = document.getElementById(inputId).value;
        if (text) addTodo(listId, text);
      }
    });
  }

  bindRemoveTodo(removeTodo) {
    this.mainBody.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;
      if (target.classList.contains("deleteTodo")) {
        const listIdAndId = target.id.replace("deleteTodo-", "");
        const indexOfDash = listIdAndId.indexOf("-");

        const listId = parseInt(listIdAndId.slice(0, indexOfDash));
        const id = parseInt(
          listIdAndId.slice(indexOfDash + 1, listIdAndId.length)
        );

        removeTodo(listId, id);
      }
    });
  }

  bindEditTodo(editTodo) {
    this.mainBody.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;
      if (target.classList.contains("editTodo")) {
        const listIdAndId = target.id.replace("editTodo-", "");
        const indexOfDash = listIdAndId.indexOf("-");

        const oldText = document.getElementById(listIdAndId).textContent;

        const listId = parseInt(listIdAndId.slice(0, indexOfDash));
        const id = parseInt(
          listIdAndId.slice(indexOfDash + 1, listIdAndId.length)
        );

        const text = prompt("Edit and submit", oldText);

        editTodo(listId, id, text);
      }
    });
  }

  bindToggleTodo(toggleTodo) {
    this.mainBody.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;
      if (target.classList.contains("doneCheckbox")) {
        const listIdAndId = target.id.replace("checkbox-", "");
        const indexOfDash = listIdAndId.indexOf("-");

        const listId = parseInt(listIdAndId.slice(0, indexOfDash));
        const id = parseInt(
          listIdAndId.slice(indexOfDash + 1, listIdAndId.length)
        );

        toggleTodo(listId, id);
      }
    });
  }

  bindAddList(addList) {
    this.btnAddList.addEventListener("click", (event) => {
      event.preventDefault();

      if (this.inputListTitle.value) {
        addList(this.inputListTitle.value);
      }
    });
  }

  bindRemoveList(removeList) {
    this.mainBody.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;
      if (target.classList.contains("deleteList")) {
        const listId = parseInt(target.id.replace("deleteList-", ""));

        removeList(listId);
      }
    });
  }

  bindEditTitle(editTitle) {
    this.mainBody.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;
      if (target.classList.contains("editTitle")) {
        const listId = parseInt(target.id.replace("editList-", ""));
        const titleId = `title-${listId}`;

        const title = prompt(
          "Edit The Title",
          document.getElementById(titleId).textContent
        );
        editTitle(listId, title);
      }
    });
  }

  bindShowAll(showAll) {
    this.btnShowAll.addEventListener("click", (event) => {
      event.preventDefault();
      showAll();
    });
  }

  bindShowDone(showDone) {
    this.btnShowDone.addEventListener("click", (event) => {
      event.preventDefault();
      showDone();
    });
  }

  bindShowActive(showActive) {
    this.btnShowActive.addEventListener("click", (event) => {
      event.preventDefault();
      showActive();
    });
  }

  bindUpload(upload) {
    this.btnUpload.addEventListener("click", (event) => {
      event.preventDefault();
      upload();
    });
  }

  bindDownload(download) {
    this.btnDownload.addEventListener("click", (event) => {
      event.preventDefault();
      download();
    });
  }

  routing(dispatch) {
    switch (dispatch) {
      case "SIGNIN":
        this.wrapperAll.innerHTML = "";
        this.wrapperAll.appendChild(this.signInPage);
        break;
      case "SIGNUP":
        this.wrapperAll.innerHTML = "";
        this.wrapperAll.appendChild(this.signUpPage);
        break;
      case "LISTS":
        this.wrapperAll.innerHTML = "";
        this.wrapperAll.append(this.header, this.mainBody);
    }
  }

  //* this is all the event for the routing process
  bindRoutingView(createAccount, signin) {
    //* this is for submit button in sign in page
    this.wrapperAll.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;
      if (target.id === "submit-signin") {
        const username = document.querySelector("#user-input").value.trim();
        const password = document.querySelector("#pass-input").value.trim();

        signin(username, password);
      }
    });

    //* this is for submit button in sign up page
    this.wrapperAll.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;
      if (target.id === "submit") {
        const username = document.querySelector("#user-input").value.trim();
        const password = document.querySelector("#pass-input").value.trim();
        const repeatPass = document.querySelector("#pass-confirm").value.trim();

        createAccount(username, password, repeatPass);
      }
    });

    //* this is for the link in sign in page
    this.wrapperAll.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;
      if (target.id === "go-to-signup") {
        this.routing("SIGNUP");
      }
    });

    //* this is for the link to in sign up page
    this.wrapperAll.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;
      if (target.id === "link-signin") {
        this.routing("SIGNIN");
      }
    });

    //* this is for the sign out button in lists
    this.wrapperAll.addEventListener("click", (event) => {
      event.preventDefault();

      const target = event.target;
      if (target.id === "sign-out") {
        this.routing("SIGNIN");
      }
    });
  }
}

export default View;
