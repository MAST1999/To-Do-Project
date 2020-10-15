const attachingEventHandlers = _ => {
    document.getElementById("btnAddNewList").addEventListener("click", addNewList);
    document.getElementById("btnShowDone").addEventListener("click", showDone);
    document.getElementById("btnActive").addEventListener("click", showActive);
    document.getElementById("btnAllTasks").addEventListener("click", showAllTasks);
    document.getElementById("btnNewCategory").addEventListener("click", addNewCategory);
    document.getElementById("btnRemoveCategory").addEventListener("click", removeCategory);
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
        paragraph.addEventListener("click", removeList);
    });
};