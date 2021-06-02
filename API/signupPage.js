//* function for creating elements with classes
const newElement = (element, classes) => {
  const el = document.createElement(element);
  if (classes) el.classList.add(classes);
  return el;
};

//* the main container which we will return
const signUpContainer = newElement("div", "signup-container");

const mainTitle = newElement("div", "title");
mainTitle.textContent = "Welcome\nCreate your new account here!";

//* the form which will send the data to the server
const form = newElement("form", "signup-form");

//* username input
const inputUserContainer = newElement("div", "input-container");
const userLabel = newElement("label", "user-label");
userLabel.textContent = "Username: ";
const userInput = newElement("input", "userInput");
userInput.id = "user-input";
userInput.name = "username";
userInput.type = "text";
inputUserContainer.append(userLabel, userInput);

//* password input
const inputPassContainer = newElement("div", "input-container");
const passLabel = newElement("label", "pass-label");
passLabel.textContent = "Password: ";
const passInput = newElement("input", "passInput");
passInput.id = "pass-input";
passInput.name = "password";
passInput.type = "text";
inputPassContainer.append(passLabel, passInput);

//* append to the form
form.append(inputUserContainer, inputPassContainer);

signUpContainer.append(mainTitle, form);

export default signUpContainer;
