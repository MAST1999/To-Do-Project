
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
    document.body.onclick = function (event) {
        var selected = event.target;
        if (selected.nodeName === "I" && (selected.getAttribute("class") === "fa fa-pencil-square-o noteEdit rawEdit" || selected.getAttribute("class") === "fa fa-pencil-square-o noteEdit")) {
        
            let attrSelected = Number(selected.getAttribute("attribute"));
            console.log(attrSelected);
            const notePara = document.getElementsByClassName("note");
            let newText = prompt("Please Edit", notePara[(attrSelected + 1)].innerHTML);
            notePara[attrSelected + 1].innerHTML = newText;
        }
    };
};


const addTask = () => {
    document.body.onclick = function (event) {

        const selectedAdd = event.target;
        if (selectedAdd.nodeName === "I" && (selectedAdd.getAttribute("class") === "fa fa-plus addNote")) {
            event.preventDefault();
            const addParentPara = selectedAdd.parentNode;
            let addParent = addParentPara.parentNode;
            let counter = 0;
            if (addParent.children.length > 1) {
                for (let i = 1; i < addParent.children.length; i++) {
                    if (addParent.children[i].nodeName == "P") counter++;
                    console.log(counter);
                }
                // appending the new paragraph with the checkbox and edit icon and brakes around them
                addParent.appendChild(document.getElementsByClassName("break")[0].cloneNode(true));
                addParent.appendChild(document.getElementsByClassName("rawParagraph")[0].cloneNode(true));
                addParent.appendChild(document.getElementsByClassName("rawEdit")[0].cloneNode(true));
                addParent.appendChild(document.getElementsByClassName("rawInput")[0].cloneNode(true));
                addParent.appendChild(document.getElementsByClassName("break")[0].cloneNode(true));
                // adding the attribute to the added elements
                addParent = addParentPara.parentNode;
                console.log(addParent.children[(addParent.children.length - 2)]);
                addParent.children[(addParent.children.length - 4)].setAttribute("attribute", counter.toString());
                addParent.children[(addParent.children.length - 3)].setAttribute("attribute", counter.toString());
            }
        
        }
    };
};

const makeNewNote = () => {

};