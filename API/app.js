import Controller from "./controller.js";
import Model from "./model.js";
import View from "./view.js";

const app = new Controller(new Model(), new View());
app.model.toggleTodo(0, 0);
console.log(app.model.listModel);
