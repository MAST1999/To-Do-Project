//* function for creating elements with classes
const newElement = (element, classes) => {
  const el = document.createElement(element);
  if (classes) el.classList.add(classes);
  return el;
};

//* the main container which we will return
const signUpContainer = newElement("div", "signup-container");

const mainTitle = newElement("div", "title-signup");
mainTitle.innerHTML = "Welcome! <br /> Create your new account here!";

//* the form which will send the data to the server
const form = newElement("form", "signup-form");

//* username input
const inputUserContainer = newElement("div", "input-container");
const userInput = newElement("input", "userInput");
userInput.placeholder = "Username";
userInput.id = "user-input";
userInput.name = "username";
userInput.type = "text";
inputUserContainer.append(userInput);

//* password input
const inputPassContainer = newElement("div", "input-container");
const passInput = newElement("input", "passInput");
passInput.placeholder = "Password";
passInput.id = "pass-input";
passInput.name = "password";
passInput.type = "text";
inputPassContainer.append(passInput);

//* confirm the first password
const inputPassConfirmContainer = newElement("div", "input-container");
const PassConfirm = newElement("input", "pass-confirm");
PassConfirm.placeholder = "Repeat the password";
PassConfirm.id = "pass-confirm";
PassConfirm.name = "pass-confirm";
PassConfirm.type = "password";
inputPassConfirmContainer.append(PassConfirm);

//* submit button
const btnSubmit = newElement("button", "btn-submit");
btnSubmit.textContent = "Create New Account";
btnSubmit.id = "submit";

//* append to the form
form.append(
  inputUserContainer,
  inputPassContainer,
  inputPassConfirmContainer,
  btnSubmit
);

signUpContainer.append(mainTitle, form);

export default signUpContainer;
