import { newElement } from "./newElement.js";

export const allListContainer = newElement(
  "section",
  "all-list-container"
) as HTMLDivElement;

export const makeListContainer = (
  listId: number,
  titleText: string
): HTMLDivElement => {
  const listContainer = newElement("div", "list-container") as HTMLDivElement;

  // this is the top side of the list which
  // has the title and related buttons, input for new todo
  const topSide = newElement("div", "top-side-lc") as HTMLDivElement;

  const titleContainer = newElement("div", "title-container") as HTMLDivElement;
  const title = newElement("h2", "title") as HTMLHeadingElement;
  title.id = `listTitle-${listId}`;
  title.textContent = titleText;
  title.contentEditable = "true";
  const btnRemoveList = newElement("button") as HTMLButtonElement;
  btnRemoveList.textContent = "Delete";
  btnRemoveList.id = `btnRemoveList-${listId}`;
  titleContainer.append(title, btnRemoveList);

  const inputSectionLC = newElement("div", "input-container") as HTMLDivElement;
  const inpTodo = newElement("input", "todo-input") as HTMLInputElement;
  inpTodo.type = "text";
  inpTodo.id = `listInput-${listId}`;
  inpTodo.placeholder = "Enter new to do";
  const btnAddTodo = newElement("button") as HTMLButtonElement;
  btnAddTodo.textContent = "Add to do";
  btnAddTodo.id = `btnAddTodo-${listId}`;
  inputSectionLC.append(inpTodo, btnAddTodo);

  topSide.append(titleContainer, inputSectionLC);

  const todosContainer = newElement("div", "todos-container");

  listContainer.append(topSide, todosContainer);

  return listContainer;
};

export const makeTodos = (
  listId: number,
  todoId: number,
  todoText: string,
  done: boolean
): HTMLDivElement => {
  const todoContainer = newElement("div", "todo-container") as HTMLDivElement;

  const todo = newElement("p", "todo") as HTMLParagraphElement;
  todo.textContent = todoText;
  todo.contentEditable = "true";
  todo.id = `todo-${listId}-${todoId}`;
  done ? (todo.className = "done") : (todo.className = "not-done");

  const removeTodo = newElement("button") as HTMLButtonElement;
  removeTodo.id = `removeTodo-${listId}-${todoId}`;
  removeTodo.textContent = "Remove";

  const checkBoxDone = newElement("input") as HTMLInputElement;
  checkBoxDone.id = `done-${listId}-${todoId}`;
  checkBoxDone.type = "checkbox";
  checkBoxDone.checked = done;

  todoContainer.append(checkBoxDone, removeTodo, todo);

  return todoContainer;
};
