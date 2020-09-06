const getTheClickedElement = (event) => {
    // getting the clicked Element and returning it
    const selected = event.target;
    return selected;
};
const addNewNote = () => {
    // getting the section node which contains all the notes and adding a new one to bottom of the lists
    const sectionOfNotes = document.getElementById("noteContainers");
    const gettingTheRawNote = document.getElementsByClassName("make")[0];
    sectionOfNotes.appendChild(gettingTheRawNote.cloneNode(true));
};
const removeTheList = (event) => {
    let selected = getTheClickedElement(event);
    // making a container to put the noteContainer's targeted node inside
    let noteContainer = "";
    // looking for the parent targeted node
    for (let i = 0; i < 5; i++) {
        if (selected.parentNode.getAttribute("class") === "noteContainer make") {
            noteContainer = selected.parentNode;
            console.log(noteContainer);
            break;
        } else {
            selected = selected.parentNode;
        }
    }
    // removing the targeted node after getting the main section containing all the lists
    const mainSection = document.getElementById("noteContainers");
    mainSection.removeChild(noteContainer);
};
const addTask = (event) => {
    let selected = getTheClickedElement(event);
    let selectedStandIn = selected;
    let noteContainer = "";
    for (let i = 0; i < 3; i++) {
        if (selectedStandIn.parentNode.getAttribute("class") === "noteContainer make") {
            noteContainer = selectedStandIn.parentNode;
            break;
        } else {
            selectedStandIn = selectedStandIn.parentNode;
        }
    }
    const childrenOfNoteContainer = noteContainer.children;
    let tasksContainer = "";
    // getting the tasksDiv in order to append a new task to it's child later on
    for (i = 0; i < childrenOfNoteContainer.length; i++) {
        if (childrenOfNoteContainer[i].getAttribute("class") === "tasksDiv") {
            tasksContainer = childrenOfNoteContainer[i];
            console.log(tasksContainer);
            break;
        }
    }
    // getting the note paragraph for appending
    let paragraphContainer = tasksContainer.children[0];

    selectedStandIn = selected;
    let addCombo = selected;
    // getting the addCombo class in order to access input value
    for (i = 0; i < 2; i++) {
        if (selectedStandIn.getAttribute("class") === "addCombo") {
            addCombo = selectedStandIn;
            break;
        } else {
            selectedStandIn = selectedStandIn.parentNode;
        }
    }
    let inputNewText = addCombo.children[1].value;
    console.log(inputNewText);
    // checking for an empty input
    if (inputNewText === "") {
        alert("please write something before pressing add again!");
        return;
    }
    // getting the defaultNote defaultEdit and defaultTrash for appending
    const defaultNote = document.getElementById("defaultNote");
    const defaultEdit = document.getElementById("defaultEdit");
    const defaultTrash = document.getElementById("defaultTrash");
    // now appending the input value to the paragraphContainer
    paragraphContainer.appendChild(defaultNote.cloneNode(true));
    paragraphContainer.lastChild.removeAttribute("id");
    paragraphContainer.lastChild.textContent = inputNewText;
    paragraphContainer.lastChild.innerHTML += "&nbsp;&nbsp;&nbsp;";

    paragraphContainer.lastChild.appendChild(defaultEdit.cloneNode(true));
    paragraphContainer.children[0].removeAttribute("id");
    paragraphContainer.lastChild.innerHTML += "&nbsp;";

    paragraphContainer.lastChild.appendChild(defaultTrash.cloneNode(true));
    paragraphContainer.children[1].removeAttribute("id");
    
    console.log(paragraphContainer.lastChild);
};