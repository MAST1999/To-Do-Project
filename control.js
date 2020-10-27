import { listArray } from "./model";
import { list } from "./model";
import { categories } from "./model";
const displayConstructor = _ => {
    const currentLists = document.querySelectorAll(".noteContainer");
    if (currentLists.length - 1 === listArray.length) return; //currentLists has a -1 because it has the default list
    console.log("hello");
};
displayConstructor();
const addNewList = _ => {
    document.getElementById("noteContainerMain").append(document.querySelector(".noteContainer"));
    
};
// ================================================================================
const attachingEventHandlers = _ => {
    document.getElementById("btnAddNewList").addEventListener("click", addNewList);
    document.getElementById("btnShowDone").addEventListener("click", showDone);
    document.getElementById("btnActive").addEventListener("click", showActive);
    document.getElementById("btnAllTasks").addEventListener("click", showAllTasks);
    document.getElementById("btnNewCategory").addEventListener("click", addNewCategory);
    document.getElementById("btnRemoveCategory").addEventListener("click", removeCategory);
    document.getElementById("inputSearch").addEventListener("keyup", search);
    const allTitlesAndNotes = document.querySelectorAll(".title .note");
    allTitlesAndNotes.forEach(function setEventForTitlesAndNotes(title) {
        title.addEventListener("click", edit);
        title.addEventListener("keypress", handleEnter);
    });
    const allTitleRemoves = document.querySelectorAll("titleTrash");
    allTitleRemoves.forEach(function setRemoveForIcons(icon) {
        icon.addEventListener("click", removeList);
    });
    const allParagraphRemoves = document.querySelectorAll("paragraphTrash");
    allParagraphRemoves.forEach(function setRemoveForIcons(paragraph) {
        paragraph.addEventListener("click", removeParagraph);
    });
    const allDoneInputs = document.querySelectorAll("done");
    allDoneInputs.forEach(function setRemoveForIcons(input) {
        input.addEventListener("click", done);
    });
    const btnAddTask = document.querySelectorAll("btnAddTask");
    btnAddTask.forEach(function setRemoveForIcons(task) {
        task.addEventListener("click", addNewTask);
    });
};
let tutorial = list;
tutorial.title = "Tutorial";
tutorial.tasks.push("You can Edit by clicking or pressing on the target Text");
tutorial.tasks.push("Add new tasks after entering them in the section down here and pressing the Add New Task");
listArray.push(tutorial);