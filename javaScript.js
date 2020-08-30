
const setLineThrough = () => {
    const checkBoxes = document.getElementsByClassName("cbDone");
    const notePara = document.getElementsByClassName("note");
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            notePara[i].style.textDecorationLine = "line-through";
        } else {
            notePara[i].style.textDecorationLine = "none";
        }
    }
};

const edit = () => {
    const editClicked = document.getElementsByClassName("noteEdit");
    const notePara = document.getElementsByClassName("note");
    document.body.onclick = function (evt) {
        var evt = window.event || evt; //window.event for IE
        if (!evt.target) {
            evt.target = evt.srcElement; //extend target property for IE
        }

        var selected = evt.target;
        let attrSelected = selected.getAttribute("attribute");
        const notePara = document.getElementsByClassName("note");
        let newText = prompt("Please Edit", notePara[attrSelected].innerHTML);
        notePara[attrSelected].innerHTML = newText;
    };
};

const addTask = () => {
    const noteContainer = document.getElementsByClassName("noteContainer");
    document.body.onclick = function (evt) {
        var evt = window.event || evt; //window.event for IE
        if (!evt.target) {
            evt.target = evt.srcElement; //extend target property for IE
        }

        const notesCurrently = 
        var selected = evt.target;
        const attrSelected = Number(selected.getAttribute("attribute"));
        const divSelected = noteContainer[attrSelected];
        alert(noteContainer.getAttribute);
    }; 
};

const makeNewNote = () => {

};