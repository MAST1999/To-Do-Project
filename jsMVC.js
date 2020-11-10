class Model {
    constructor() {
        this.toDos = [
            { id: 0, text: "hmm", completed: false }
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
            }
        }
        this.lists.set(ListTitle, this.toDos);
    }

    deleteToDo(ListTitle, ToDoId) {
        let ToDos = this.findList(ListTitle);
        ToDos = ToDos.filter(ToDo => ToDo.id !== ToDoId);
        this.replaceToDos(ListTitle, ToDos);
    }

    deleteList(ListTitle) {
        this.lists.delete(ListTitle);
    }
}

class View {
    constructor() { }
}

class Controller {
    constructor(Model, View) {
        this.model = Model;
        this.view = View;
    }
}

const application = new Controller(new Model(), new View());
console.log(application.model.lists);