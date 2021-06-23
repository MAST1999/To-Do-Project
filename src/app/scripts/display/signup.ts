import { newElement } from "./newElement.js";

export const signupPage = newElement("div", "signupPage") as HTMLDivElement;

const h1 = newElement("h1") as HTMLHeadingElement;
h1.textContent = "Welcome to the To Do app";

const inputContainer = newElement("div") as HTMLDivElement;

export const usernameInput = newElement(
  "input",
  "userInput"
) as HTMLInputElement;
usernameInput.placeholder = "Username";
usernameInput.type = "text";
usernameInput.id = "username-input";

export const passwordInput = newElement(
  "input",
  "passwordInput"
) as HTMLInputElement;
passwordInput.placeholder = "Password";
passwordInput.type = "password";
passwordInput.id = "password-input";

export const repeatPasswordInput = newElement(
  "input",
  "passwordInput"
) as HTMLInputElement;
repeatPasswordInput.placeholder = "Repeat the Password";
repeatPasswordInput.type = "password";
repeatPasswordInput.id = "repeat-password-input";

export const signupSubmit = newElement("button", "submit") as HTMLButtonElement;
signupSubmit.textContent = "Create New Account";
signupSubmit.id = "signup-submit";

inputContainer.append(
  usernameInput,
  passwordInput,
  repeatPasswordInput,
  signupSubmit
);

export const linkToSignin = newElement("p", "go-to") as HTMLParagraphElement;
linkToSignin.textContent = "Already have an account? Sign in here";
linkToSignin.style.color = "blue";
linkToSignin.style.cursor = "pointer";

signupPage.append(h1, inputContainer, linkToSignin);
