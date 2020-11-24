class Model {
    constructor() {
        this.toDos = [
            { id: 0, text: "hh", completed: false }
        ];
        this.lists = new Map();
        this.lists.set("first", this.toDos);
    }

    findList(ListTitle) {
        for (let [Id, ToDos] of this.lists.entries()) {
            if (Id === ListTitle) {
                return ToDos;
            }
        }
    }

    replaceToDos(ListTitle, newToDos) {
        for (let Id of this.lists.keys()) {
            if (Id === ListTitle) {
                this.lists.set(ListTitle, newToDos);
            }
        }
    }

    addToDo(ListTitle, ToDoText) {
        let ToDos = this.findList(ListTitle);
        console.log(ToDos, ListTitle);
        const newToDo = {
            id: ToDos.length,
            text: ToDoText,
            completed: false
        };
        ToDos.push(newToDo);
    }

    addList(ListTitle) {
        for (let title of this.lists.keys()) {
            if (title === ListTitle) {
                alert("Title already in use!");
                return;
            }
        }
        const todo = prompt("Enter the first To Do : ");
        const TODO = { id: 0, text: todo, completed: false };
        let arrayToDo = [];
        arrayToDo.push(TODO);
        this.lists.set(ListTitle, arrayToDo);
    }

    deleteToDo(ListTitle, ToDoId) {
        let ToDos = this.findList(ListTitle);
        ToDos = ToDos.filter(todo => todo.id !== ToDoId);
        this.replaceToDos(ListTitle, ToDos);
    }

    deleteList(ListTitle) {
        this.lists.delete(ListTitle);
    }

    editToDo(ListTitle, ToDoId, previousText) {
        const ToDos = this.findList(ListTitle);
        const updatedText = prompt("Edit To Do: ", previousText)
        ToDos.forEach(todo => {
            if (todo.id === ToDoId) {
                todo.text = updatedText;
            }
        });
        this.replaceToDos(ListTitle, ToDos);
    }

    editListTitle(ListTitle, newTitle) {
        console.log(ListTitle, newTitle);
        const tempToDo = this.findList(ListTitle);
        this.lists.delete(ListTitle);
        this.lists.set(newTitle, tempToDo);
    }

    toggleToDo(ListTitle, ToDoId) {
        const ToDos = this.findList(ListTitle);
        ToDos.forEach(todo => {
            if (todo.id === ToDoId) {
                todo.completed = !todo.completed;
            }
        });
        this.replaceToDos(ListTitle, ToDos);
    }

    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }
}

class View {
    constructor() {
        this.wrapperAll = this.getSingleElement("#wrapperAll");

        // header ---------------------
        this.header = this.createNewElement("div");
        this.header.id = "header";
        // Add new title part of the header
        this.addTitleContainer = this.createNewElement("div");
        this.addTitleContainer.id = "addTitleContainer"
        this.btnAddList = this.createNewElement("button", "marginLeft");
        this.btnAddList.id = "btnAddList";
        this.btnAddList.type = "button";
        this.btnAddList.textContent = "Add New List";
        this.inputListTitle = this.createNewElement("input")
        this.inputListTitle.type = "text"
        this.inputListTitle.id = "inputListTitle"
        this.addTitleContainer.append(this.inputListTitle, this.btnAddList)
        // append to header
        this.header.append(this.addTitleContainer);

        // Main Body --------------------
        this.mainBody = this.createNewElement("div");
        this.mainBody.id = "mainBody";

        // template for the To Do List -----------------------
        // containing the whole template
        this.templateContainer = this.createNewElement("div", "templateContainer");
        // top part of the template
        this.headContainer = this.createNewElement("div", "headContainer");

        this.title = this.createNewElement("div", "listTitle");

        this.deleteList = this.createNewElement("button", "removeList");
        this.deleteList.textContent = "Remove List"
        // input part of the template
        this.containerNewToDo = this.createNewElement("div", "newToDo");
        this.newInput = this.createNewElement("input", "newInput");
        this.newInput.type = "text";

        this.btnAddToDo = this.createNewElement("button", "btnAddToDo");
        this.btnAddToDo.classList.add("marginLeft")
        this.btnAddToDo.textContent = "Add";
        this.containerNewToDo.append(this.newInput, this.btnAddToDo)
        // to do list
        this.listContainer = this.createNewElement("div", "listContainer");
        // assemble the list
        this.headContainer.append(this.title, this.deleteList);
        this.templateContainer.append(this.headContainer, this.containerNewToDo, this.listContainer);
        // append to the main body
        this.mainBody.append(this.templateContainer);
        //append everything to wrapper all
        this.wrapperAll.append(this.header, this.mainBody);
    }

    createNewElement(tag, className) {
        console.log(className);
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

    displayToDos(Lists) {
        while (this.mainBody.firstChild) {
            this.mainBody.removeChild(this.mainBody.firstChild);
        }
        if (Lists.size !== 0) {
            for (let [title, ToDos] of Lists) {
                let tempTemplate = this.templateContainer.cloneNode(true);
                let headContainer = tempTemplate.children[0];
                headContainer.children[0].textContent = `${title}`;
                tempTemplate.id = `${title}`;
                ToDos.forEach(todo => {
                    const doContainer = this.createNewElement("div", "doContainer");
                    doContainer.id = todo.id;
                    const task = this.createNewElement("div", "do");
                    task.textContent = todo.text;
                    const btnDelete = this.createNewElement("button", "removeDo");
                    btnDelete.textContent = "Remove";
                    const btnEdit = this.createNewElement("button", "editDo");
                    btnEdit.classList.add("noMarginLeft");
                    btnEdit.textContent = "Edit";
                    const inputCheckBox = this.createNewElement("input", "done");
                    inputCheckBox.type = "checkbox";
                    if (todo.completed) {
                        inputCheckBox.checked = true
                        task.classList.add("completed")
                    }
                    doContainer.append(btnDelete, btnEdit, inputCheckBox, task);
                    tempTemplate.children[2].append(doContainer);
                });
                this.mainBody.append(tempTemplate);
            }
        } else {
            const message = this.createNewElement("div", "message");
            message.textContent = "Got something to do? Press add new list to start!";
            this.mainBody.append(message);
        }
    }

    // setting up event listeners
    bindAddToDo(handler) {
        this.mainBody.addEventListener("click", event => {
            event.preventDefault();

            const clickedButton = event.target;
            console.log("here");
            if (clickedButton.className === "btnAddToDo marginLeft") {
                const addContainer = clickedButton.parentNode;
                const template = addContainer.parentNode;
                if (clickedButton.previousSibling.value) {
                    handler(template.id, clickedButton.previousSibling.value);
                }
            }

        }, true);
    }

    bindDeleteToDo(handler) {
        this.mainBody.addEventListener("click", event => {
            event.preventDefault();

            const clickedButton = event.target;
            if (clickedButton.className === "removeDo") {
                const doContainer = clickedButton.parentNode;
                const ToDoId = parseFloat(doContainer.id);
                const listContainer = doContainer.parentNode;
                const template = listContainer.parentNode;
                const ListId = template.id;

                handler(ListId, ToDoId);
            }
        }, true);
    }

    bindToggleToDo(handler) {
        this.mainBody.addEventListener("click", event => {
            event.preventDefault();

            const checkbox = event.target

            if (checkbox.className === "done") {
                const ToDo = checkbox.parentNode
                const ToDoId = parseFloat(ToDo.id)
                const listContainer = ToDo.parentNode
                const ListId = listContainer.parentNode.id

                handler(ListId, ToDoId)
            }
        })
    }

    bindAddList(handler) {
        const btnAddList = this.getSingleElement("#btnAddList")

        btnAddList.addEventListener("click", event => {
            if (this.inputListTitle.value) {
                handler(this.inputListTitle.value)
            }
        })
    }

    bindEditToDo(handler) {
        this.mainBody.addEventListener("click", event => {
            event.preventDefault();

            const btnEdit = event.target

            if (btnEdit.className === "editDo noMarginLeft") {
                const ToDo = btnEdit.parentNode
                const todo = ToDo.lastChild
                const ToDoId = parseFloat(ToDo.id)
                const listContainer = ToDo.parentNode
                const ListId = listContainer.parentNode.id

                handler(ListId, ToDoId, todo.textContent)
            }
        })
    }

    bindEditListTitle(handler) {
        this.mainBody.addEventListener("click", event => {
            event.preventDefault()

            if (event.target.className === "listTitle") {
                const newTitle = prompt("Enter new title : ")
                const tempTemplate = event.target.parentNode
                handler(tempTemplate.parentNode.id, newTitle)
            }
        })
    }

    bindDeleteList(handler) {
        this.mainBody.addEventListener("click", event => {
            event.preventDefault()

            if (event.target.className === "removeList") {
                const parent = event.target.parentNode
                const listId = parent.parentNode.id

                handler(listId)
            }
        })
    }
}

class Controller {
    constructor(Model, View) {
        this.model = Model;
        this.view = View;

        // binding this to these functions
        this.onTodoListChanged = this.onTodoListChanged.bind(this);
        this.handleAddToDo = this.handleAddToDo.bind(this);
        this.handleEditTodo = this.handleEditTodo.bind(this);
        this.handleDeleteToDo = this.handleDeleteToDo.bind(this);
        this.handleToggleTodo = this.handleToggleTodo.bind(this);
        this.handleAddList = this.handleAddList.bind(this);
        this.handleEditListTitle = this.handleEditListTitle.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);

        this.model.bindTodoListChanged(this.onTodoListChanged);
        this.onTodoListChanged();

        // bind these functions to the corresponding functions in view
        this.view.bindAddToDo(this.handleAddToDo);
        this.view.bindDeleteToDo(this.handleDeleteToDo);
        this.view.bindToggleToDo(this.handleToggleTodo);
        this.view.bindAddList(this.handleAddList)
        this.view.bindEditToDo(this.handleEditTodo)
        this.view.bindEditListTitle(this.handleEditListTitle)
        this.view.bindDeleteList(this.handleDeleteList)
    }

    onTodoListChanged() {
        this.view.displayToDos(this.model.lists);
    }

    handleToggleTodo(ListId, ToDoId) {
        this.model.toggleToDo(ListId, ToDoId);
        this.onTodoListChanged();
    }

    handleAddToDo(ListId, todoText) {
        this.model.addToDo(ListId, todoText);
        this.onTodoListChanged();
    }

    handleDeleteToDo(ListId, ToDoId) {
        this.model.deleteToDo(ListId, ToDoId);
        this.onTodoListChanged();
    }

    handleAddList(ListTitle) {
        this.model.addList(ListTitle);
        this.onTodoListChanged();
    }

    handleEditTodo(ListId, ToDoId, todoText) {
        this.model.editToDo(ListId, ToDoId, todoText);
        this.onTodoListChanged();
    }

    handleEditListTitle(ListTitle, ListId) {
        this.model.editListTitle(ListTitle, ListId);
        this.onTodoListChanged();
    }

    handleDeleteList(ListId) {
        this.model.deleteList(ListId);
        this.onTodoListChanged();
    }
}

const application = new Controller(new Model(), new View());