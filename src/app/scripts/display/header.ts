import { newElement } from "./newElement.js";

export const header = document.createElement("header") as HTMLHeadElement;

// where we show the username
export const usernameDisplay = newElement("h1") as HTMLHeadElement;

// input for new lists
const inputListContainer = newElement("div") as HTMLDivElement;

const inpList = newElement("input") as HTMLInputElement;
inpList.id = "list-input";
inpList.placeholder = "Enter the Title of the List";
inpList.type = "text";

const btnAddList = newElement("button");
btnAddList.textContent = "Add List";
btnAddList.id = "btn-add-list";

inputListContainer.append(inpList, btnAddList);

// custom buttons such as show all or sign out and sign in
const customButtonsContainer = newElement("div") as HTMLDivElement;

export const btnShowAll = newElement("button", "status") as HTMLButtonElement;
btnShowAll.textContent = "All";
btnShowAll.id = "show-all";

export const btnShowDone = newElement("button", "status") as HTMLButtonElement;
btnShowDone.textContent = "Done";
btnShowDone.id = "show-done";

export const btnShowActive = newElement(
  "button",
  "status"
) as HTMLButtonElement;
btnShowActive.textContent = "Active";
btnShowActive.id = "show-active";

export const btnSignIn = newElement("button") as HTMLButtonElement;
btnSignIn.textContent = "Sign in";
btnSignIn.id = "sign-in";

export const btnSignOut = newElement("button") as HTMLButtonElement;
btnSignOut.textContent = "Sign out";
btnSignOut.id = "sign-out";

export const btnDownload = newElement("button") as HTMLButtonElement;
btnDownload.textContent = "Download";
btnDownload.id = "download";

export const btnUpload = newElement("button") as HTMLButtonElement;
btnUpload.textContent = "Upload";
btnUpload.id = "upload";

customButtonsContainer.append(
  btnShowAll,
  btnShowActive,
  btnShowDone,
  btnDownload,
  btnUpload,
  btnSignIn,
  btnSignOut
);

header.append(usernameDisplay, inputListContainer, customButtonsContainer);
