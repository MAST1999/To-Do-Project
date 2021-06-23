import { Controller } from "./classes/controller.js";
import { Model } from "./classes/model.js";
import { View } from "./classes/view.js";

const app = new Controller(new Model(), new View());
