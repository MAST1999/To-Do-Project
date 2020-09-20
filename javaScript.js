if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * The splice() method changes the content of a string by removing a range of
     * characters and/or adding new characters.
     *
     * @this {String}
     * @param {number} start Index at which to start changing the string.
     * @param {number} delCount An integer indicating the number of old chars to remove.
     * @param {string} newSubStr The String that is spliced in.
     * @return {string} A new string with the spliced substring.
     */
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

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
    const selectedParagraph = event.target;
    event.preventDefault();
    searchRemove();
    selectedParagraph.setAttribute("contenteditable", "true");
    selectedParagraph.focus();
};
const handleEnter = (event) => {
    const pressedKey = event.keyCode;
    const selectedParagraph = event.target;
    if (pressedKey === 13) {
        if (selectedParagraph.textContent === "") {
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

const searchEdit = (searchValue, paraNode, pattern) => {
    const repetition = paraNode.textContent.match(pattern);
    let tempPara = paraNode.textContent;
    let objectOfRepetitionAndIndexes = {

    };
    for (let i = 0; i < repetition.length; i++) {
        const Index = tempPara.search(repetition[i]);
        objectOfRepetitionAndIndexes["word" + i]= {
            word: repetition[i],
            indexOfWord: Index
        };
        let replacement = "";
        const L = repetition[i].length;
        for (let j = L; j > 0; j--) {
            replacement += "`";
        }
        tempPara = tempPara.replace(repetition[i], replacement);
    }
    searchTempRemove(objectOfRepetitionAndIndexes, paraNode);
};



const searchTempRemove = (objectOfRepetitionAndIndexes, paraNode) => {
    const words = Object.keys(objectOfRepetitionAndIndexes);
    let tempParaNodeParagraph = paraNode.innerHTML;
    words.forEach(currentWord => {
        const removeTarget = objectOfRepetitionAndIndexes[currentWord].word;
        const regex = new RegExp("\\w*(" + removeTarget + ")\\w*.?" ,'g');
        tempParaNodeParagraph = tempParaNodeParagraph.replace(regex, "");
    });

    searchAddBack(paraNode, tempParaNodeParagraph, objectOfRepetitionAndIndexes, words);
};

const searchAddBack = (paraNode, tempParaNodeParagraph, objectOfRepetitionAndIndexes, words) => {
    tempParaNodeParagraph = "";
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const beforeWord = words[i - 1];
        const currentWord = objectOfRepetitionAndIndexes[word].word;
        const startingIndex = objectOfRepetitionAndIndexes[word].indexOfWord;
        if (words.length === 1) {
            tempParaNodeParagraph += paraNode.innerHTML.slice(0, startingIndex) + `<span class="search">${currentWord}</span>` + paraNode.innerHTML.slice(startingIndex + currentWord.length);
            break;
        }
        else if (word === "word0") {
            tempParaNodeParagraph += paraNode.innerHTML.slice(0, startingIndex) + `<span class="search">${currentWord}</span> `;
        } else {
            const preIndex = objectOfRepetitionAndIndexes[beforeWord].indexOfWord;
            const preWordLength = objectOfRepetitionAndIndexes[beforeWord].word.length - 1;
            tempParaNodeParagraph += paraNode.innerHTML.slice( preIndex + preWordLength + 2, startingIndex) + `<span class="search">${currentWord}</span> `;
        }
    }
    if (paraNode.innerHTML.length !== tempParaNodeParagraph.length - words.length * 28 ) {
        const lastWord = words[words.length - 1];
        const index = objectOfRepetitionAndIndexes[lastWord].indexOfWord;
        
        const length1 = objectOfRepetitionAndIndexes[lastWord].word.length;
        tempParaNodeParagraph += paraNode.innerHTML.slice(index + length1);
    }
    paraNode.innerHTML = tempParaNodeParagraph;
};

const searchRemove = () => {
    const SearchClass = document.querySelectorAll(".search");
    SearchClass.forEach(spans => {
        const inside = spans.textContent;
        const parent = spans.parentNode;
        spans.insertAdjacentText("beforebegin", inside);
        parent.removeChild(spans);
    });
};

const alternativeSearch = (event) => {
    if (event.keyCode === 13) {
        const inputSearchValue = document.getElementById("inputSearch").value;
        let allTheSearchTargets = document.querySelectorAll(".title, .note");
        const pattern = new RegExp('(\\w*' + inputSearchValue + '\\w*)', 'gi');
        searchRemove(allTheSearchTargets);
        for (let i = 0; i < allTheSearchTargets.length; i++) {
            if (allTheSearchTargets[i].textContent.match(pattern)) {
                searchEdit(inputSearchValue, allTheSearchTargets[i], pattern);
            }
        }
    }
};
const addCategory = () => {
    const categoryName = document.getElementById("inputCategory").value;
    if (categoryName === "" || categoryName === undefined) return;
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
    if (categoryName === "" || categoryName === undefined) return;
    const allCategories = document.getElementsByClassName("category");
    const categoriesContainer = document.getElementById("categories");
    for (let i = 0; i < allCategories.length; i++) {
        if (allCategories[i].children[0].textContent === categoryName) categoriesContainer.removeChild(allCategories[i]);
    }
};