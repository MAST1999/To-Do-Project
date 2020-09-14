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
const search = () => {
    const inputValue = document.getElementById("inputSearch").value;
    const allTitles = document.getElementsByClassName("title");
    console.log(allTitles);
    const allTasks = document.getElementsByClassName("note");
    const pattern = new RegExp('(\\w*' + inputValue + '\\w*)', 'gi');
    if (inputValue == "" || inputValue == undefined || inputValue == undefined) {
        for (let i = 0; i < allTitles.length; i++) {
                allTitles[i].classList.remove("search");
        }
        for (let i = 0; i < allTasks.length; i++) {
                allTasks[i].classList.remove("search");
        }
        return;
    }
    for (let i = 0; i < allTitles.length; i++) {
        if (allTitles[i].textContent.match(pattern)) {
            allTitles[i].classList.add("search");
        }
        else {
            allTitles[i].classList.remove("search");
        }
    }
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].textContent.match(pattern)) {
            allTasks[i].classList.add("search");
        }
        else {
            allTasks[i].classList.remove("search");
        }
    }
};
const addCategory = () => {
    const categoryName = document.getElementById("inputCategory").value;
    if (categoryName == "" || categoryName == undefined || categoryName == null) return;
    const div = document.createElement("div");
    div.classList.add("category");
    const a = document.createElement("a");
    a.setAttribute("href", `./${categoryName}`);
    a.textContent = categoryName;
    div.appendChild(a);
    document.getElementById("categories").appendChild(div);
};
const removeCategory = () => {
    const categoryName = document.getElementById("inputCategory").value;
    if (categoryName == "" || categoryName == undefined || categoryName == null) return;
    const allCategories = document.getElementsByClassName("category");
    const categoriesContainer = document.getElementById("categories");
    for (let i = 0; i < allCategories.length; i++) {
        if (allCategories[i].children[0].textContent == categoryName) categoriesContainer.removeChild(allCategories[i]);
    }
};