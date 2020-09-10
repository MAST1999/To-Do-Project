const done = (event) => {
    const selectedCheckbox = event.target;
    const trashElement = selectedCheckbox.previousElementSibling;
    const paragraph = trashElement.previousElementSibling;
    if (selectedCheckbox.checked) {
        paragraph.style.textDecoration = "line-through yellow 2px";
    } else {
        paragraph.style.textDecoration = "none";
    }
};
const remove = (event) => {
    const selectedTrashIcon = event.target;
    const parentNoteAndTool = selectedTrashIcon.parentNode;
    const parentParagraphNotes = parentNoteAndTool.parentNode;
    parentParagraphNotes.removeChild(parentNoteAndTool);
};
const addNewTask = (event) => {
    // getting the current things for the selected note
    const selectedBtnAddTask = event.target;
    event.preventDefault();
    const inputContainer = selectedBtnAddTask.previousElementSibling;
    const inputForNewTask = inputContainer.children[0];
    if (inputForNewTask.value === "") {
        alert("please write the task then press add");
        return;
    }
    const parentInputContainerMain = selectedBtnAddTask.parentNode;
    const paragraphNotes = parentInputContainerMain.previousElementSibling;
    // getting the default things for appending
    const noteAndTool = document.getElementById("noteAndTool");
    paragraphNotes.appendChild(noteAndTool.cloneNode(true));
    const addedNoteAndTool = paragraphNotes.lastChild;
    addedNoteAndTool.removeAttribute("id");
    addedNoteAndTool.children[0].textContent = inputForNewTask.value;
    inputForNewTask.value = "";
};
const edit = (event) => {
    selectedParagraph = event.target;
    event.preventDefault();
    selectedParagraph.setAttribute("contenteditable", "true");
    selectedParagraph.focus();
};
const handleEnter = (event) => {
    const pressedKey = event.keyCode;
    const selectedParagraph = event.target;
    if (pressedKey == 13) {
        if (selectedParagraph.textContent == "") {
            const parentNoteAndTool = selectedParagraph.parentNode;
            const parentParagraphNotes = parentNoteAndTool.parentNode;
            parentParagraphNotes.removeChild(parentNoteAndTool);
        }
        selectedParagraph.setAttribute("contenteditable", "false");
    }
};
const removeList = (event) => {
    const titleContainer = event.target.parentNode;
    const noteContainer = titleContainer.parentNode;
    const noteContainerMain = document.getElementById("noteContainerMain");
    noteContainerMain.removeChild(noteContainer);
};
const addNewList = () => {
    const noteContainerMain = document.getElementById("noteContainerMain");
    const noteContainerDefault = noteContainerMain.children[0];
    noteContainerMain.append(noteContainerDefault.cloneNode(true));
    noteContainerMain.lastChild.style.display = "block";
    const title = window.prompt("Enter the title : ");
    const pTitle = document.getElementsByClassName("title");
    pTitle[pTitle.length - 1].textContent = title;
    const note = document.getElementsByClassName("note");
    note[note.length - 1].setAttribute("contenteditable", "true");
    note[note.length - 1].focus();
};