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
    for (i = 0; i < childrenOfNoteContainer.length; i++) {
        if (childrenOfNoteContainer[i].getAttribute("class") === "tasksDiv") {
            tasksContainer = childrenOfNoteContainer[i];
            break;
        }
    }
    // now append the text inside the input (if there is anything in it!)
};