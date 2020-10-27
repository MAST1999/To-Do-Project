class Model {
    constructor() {
        this.lists = [{
            title: "Hello World",
            id: 0,
            toDos: [
                { id: 0, toDo: "this is my first attempt in making this type of class system work!", completed: false },
                { id: 1, toDo: "God Damn!", completed: false }
            ]
        },
        {
            title: "Second",
            id: 1,
            toDos: [
                { id: 0, toDo: "Really tiering Job", completed: false }
            ]
        }];
    }

    addToDo(toDoText, listId) {
        this.lists.forEach(function findTheList(list) {
            if (list.id === listId) {
                const toDo = {
                    id: list.toDos.length, toDo: toDoText, completed: false
                };
                list.toDos.push(toDo);
            }
        });
    }

    editToDo(idOfList, idOfToDo, newToDoText) {
        this.lists.forEach(function findTheList(list) {
            if (list.id === idOfList) {
                list.toDos.forEach(function findTheToDo(targetToDo) {
                    if (targetToDo.id === idOfToDo) {
                        targetToDo.toDo = newToDoText;
                    }
                });
            }
        });
    }

    deleteToDo(idOfList, idOfToDo) {
        this.lists.forEach(function findTheList(list) {
            if (list.id === idOfList) {
                list.toDos = list.toDos.filter(function removeTheToDo(targetToDo) {
                    return idOfToDo !== targetToDo.id;
                });
            }
        });
    }

    toggleToDo(idOfList, idOfToDo) {
        this.lists.forEach(function findTheList(list) {
            if (list.id === idOfList) {
                list.toDos.forEach(function toggle(targetToDo) {
                    if (targetToDo.id === idOfToDo) {
                        targetToDo.completed = !targetToDo.completed;
                    }
                });
            }
        });
    }
}
class View {
    constructor() {
        // header
        this.header = this.getSingleElement("#header");

        this.tradeMark = this.createNewElement("div");
        this.tradeMark.id = "tradeMark";
        this.tradeMarkParagraph = this.createNewElement("p");
        this.tradeMarkParagraph.innerHTML = "MAST&trade;";
        this.tradeMark.append(this.tradeMarkParagraph);

        this.searchBar = this.createNewElement("div");
        this.searchBar.id = "searchBar";
        this.div1 = this.createNewElement("div");
        this.div1.classList.add("inputContainer");
        this.searchBar.append(this.div1);
        this.iconSearch = this.createNewElement("i", "fa");
        this.iconSearch.classList.add("fa-search");
        this.iconSearch.setAttribute("aria-hidden", "true");
        this.searchInput = this.createNewElement("input");
        this.searchInput.id = "inputSearch";
        this.searchInput.placeholder = "Search";
        this.searchInput.name = "search";
        this.searchInput.type = "text";
        this.div1.append(this.iconSearch, this.searchInput);

        this.buttonsDivision = this.createNewElement("div", "buttons");

        this.divAddNowNoteList = this.createNewElement("div");
        this.divAddNowNoteList.id = "addNowNoteList";
        this.btnAddNewList = this.createNewElement("button");
        this.btnAddNewList.id = "btnAddNewList";
        this.btnAddNewList.textContent = "Add New Note List";
        this.divAddNowNoteList.append(this.btnAddNewList);

        this.divShowDone = this.createNewElement("div");
        this.divShowDone.id = "showDone";
        this.btnShowDone = this.createNewElement("button");
        this.btnShowDone.id = "btnShowDone";
        this.btnShowDone.textContent = "Completed";
        this.divShowDone.append(this.btnShowDone);

        this.divActive = this.createNewElement("div");
        this.divActive.id = "active";
        this.btnActive = this.createNewElement("button");
        this.btnActive.id = "btnActive";
        this.btnActive.textContent = "Active";
        this.divActive.append(this.btnActive);

        this.divAllTasks = this.createNewElement("div");
        this.divAllTasks.id = "allTasks";
        this.btnAllTasks = this.createNewElement("button");
        this.btnAllTasks.id = "btnAllTasks";
        this.btnAllTasks.textContent = "All Tasks";
        this.divAllTasks.append(this.btnAllTasks);

        this.buttonsDivision.append(this.divAddNowNoteList, this.divShowDone, this.divActive, this.divAllTasks);

        this.header.append(this.tradeMark, this.searchBar, this.buttonsDivision);
        // Main Panel
        this.app = this.getSingleElement("#mainPanel");

        this.form = this.createNewElement("form");

        this.title = this.createNewElement("h1", "mainTitle");
        this.title.textContent = "Reminders";

        this.input = this.createNewElement("input");
        this.input.type = "text";
        this.input.placeholder = "Enter New Task";
        this.input.name = "newTask";
        this.input.classList.add("newTaskInput");

        this.btnSubmit = this.createNewElement("button");
        this.btnSubmit.type = "button";
        this.btnSubmit.classList.add("btnSubmit");
        this.btnSubmit.textContent = "Add Task";

        this.newTaskContainer = this.createNewElement("div", "newTaskContainer");
        this.newTaskContainer.append(this.input, this.btnSubmit);

        this.toDoList = this.createNewElement("ul", "toDoList");

        this.form.append(this.newTaskContainer);
        this.form.classList.add("listForm");

        this.app.append(this.title, this.form, this.toDoList);
    }

    createNewElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);

        return element;
    }

    getSingleElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    getAllElements(selector) {
        const elements = document.querySelectorAll(selector);
        return elements;
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

}

const app = new Controller(new Model(), new View());
console.log(app.view.app);
